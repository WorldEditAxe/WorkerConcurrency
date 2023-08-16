package me.q13x.workerconcurrency;

import me.q13x.workerconcurrency.commons.Destroyable;
import me.q13x.workerconcurrency.commons.WrappedWorkerState;
import me.q13x.workerconcurrency.commons.async.JavaPromise;
import me.q13x.workerconcurrency.errors.PromiseFinishedException;
import me.q13x.workerconcurrency.ipc.CommandContext;
import me.q13x.workerconcurrency.ipc.commands.MSCleanupCommand;
import me.q13x.workerconcurrency.ipc.commands.init.MSIntentCommand;
import me.q13x.workerconcurrency.platform.browser.js.Worker;
import me.q13x.workerconcurrency.wrappers.CommandReader;
import me.q13x.workerconcurrency.wrappers.WorkerIPCAdapter;
import org.teavm.jso.browser.Window;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

public class WorkerManager implements Destroyable {
    String script;
    ArrayList<RemoteWorkerSlave> workers;
    boolean active;

    public WorkerManager(String scriptUrl) {
        this.script = scriptUrl;
        this.workers = new ArrayList<>();
        this.active = true;
    }

    public WorkerManager(String scriptUrl, List<RemoteWorkerSlave> workers) {
        this.script = scriptUrl;
        this.workers = new ArrayList<>(workers);
        this.active = true;
    }

    public String getScript() {
        return script;
    }

    public List<RemoteWorkerSlave> getWorkers() {
        return workers;
    }

    public boolean getActive() {
        return active;
    }

    public JavaPromise<RemoteWorkerSlave, Exception> spawnWorker(MSIntentCommand intent) {
        JavaPromise<RemoteWorkerSlave, Exception> promise = new JavaPromise<RemoteWorkerSlave, Exception>();
        Worker worker = Worker.create(script);
        WorkerIPCAdapter adapter = new WorkerIPCAdapter(worker);
        try {
            CommandReader.awaitCommand(adapter, CommandEnum.SM_READY, false)
                    .then(_ignoredReadyPacket -> {
                        adapter.writeCommand(intent);
                        RemoteWorkerSlave wrappedWorker = new RemoteWorkerSlave(worker, adapter);
                        wrappedWorker.setState(WrappedWorkerState.READY);
                        wrappedWorker.getCommandBus().addListener(command -> {
                           for (CommandEnum cmd : CommandEnum.values()) {
                               if (cmd == command.getCommandEnum() && !cmd.isBoundToSlave()) {
                                   cmd.getCommandCallback().accept(command, new CommandContext(CommandContext.EnvironmentType.MANAGER, adapter, wrappedWorker, this));
                               }
                           }
                        });

                        this.workers.add(wrappedWorker);
                        try {
                            promise.resolve(wrappedWorker);
                        } catch (PromiseFinishedException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .catchException(err -> {
                        err.printStackTrace();
                    });
        } catch (PromiseFinishedException e) {
            throw new RuntimeException(e);
        }
        return promise;
    }

    public void destroy() {
        assertActive();
        this.workers.forEach(worker -> {
            terminate(worker);
        });
        this.active = false;
    }

    public void forceTerminate(RemoteWorkerSlave worker) {
        assertActive();
        if (worker.getState() == WrappedWorkerState.STOPPED) {
            throw new IllegalStateException("Attempted to terminate a dead worker.");
        } else {
            worker.getWorker().terminate();
            worker.setState(WrappedWorkerState.STOPPED);
        }
    }

    public JavaPromise<Boolean, Exception> terminate(RemoteWorkerSlave worker) {
        assertActive();
        if (worker.getState() == WrappedWorkerState.STOPPED) {
            throw new IllegalStateException("Attempted to terminate a dead worker.");
        } else {
            JavaPromise<Boolean, Exception> promise = new JavaPromise<>();
            AtomicBoolean resolved = new AtomicBoolean(false);
            Long startTime = System.currentTimeMillis();
            int timerId = Window.setTimeout(() -> {
                if (!resolved.get()) {
                    forceTerminate(worker);
                    try {
                        promise.resolve(true);
                    } catch (PromiseFinishedException e) {
                        throw new RuntimeException(e);
                    }
                }
            }, 30000);
            worker.getAdapter().writeCommand(new MSCleanupCommand());
            try {
                CommandReader.awaitCommand(worker.getAdapter(), CommandEnum.SM_FINISHED, false)
                        .then(_ignored -> {
                            worker.setState(WrappedWorkerState.STOPPED);
                            resolved.set(true);
                            try {
                                promise.resolve(false);
                            } catch (PromiseFinishedException e) {
                                throw new RuntimeException(e);
                            }
                        });
            } catch (PromiseFinishedException e) {
                throw new RuntimeException(e);
            }
            return promise;
        }
    }

    void assertActive() {
        if (!this.active) {
            throw new IllegalStateException("This method is only available when this WorkerManager is active!");
        }
    }
}
