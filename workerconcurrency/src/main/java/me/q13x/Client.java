package me.q13x;

import me.q13x.workerconcurrency.RemoteWorkerManager;
import me.q13x.workerconcurrency.RemoteWorkerSlave;
import me.q13x.workerconcurrency.WorkerManager;
import me.q13x.workerconcurrency.WorkerSlave;
import me.q13x.workerconcurrency.errors.PromiseFinishedException;
import me.q13x.workerconcurrency.ipc.commands.MSPingCommand;
import me.q13x.workerconcurrency.ipc.commands.SMPongCommand;
import me.q13x.workerconcurrency.ipc.commands.init.MSIntentCommand;
import me.q13x.workerconcurrency.platform.browser.js.JSLogger;
import me.q13x.workerconcurrency.platform.browser.js.workerglobals.DedicatedWorkerGlobalScope;
import me.q13x.workerconcurrency.wrappers.MainThreadIPCAdapter;

import me.q13x.workerconcurrency.platform.browser.js.Worker;
import org.teavm.jso.browser.Window;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.BiConsumer;

/**
 * Example usage.
 * Benchmarks
 */
public class Client {
    public static void main(String[] args) throws Exception {
        if (!Worker.isInWorker()) {
            // main thread
            WorkerManager manager = new WorkerManager(Worker.getTeaVMScript("/teavm/classes.js"));
            manager.spawnWorker(new MSIntentCommand("testing"))
                    .then(worker -> {
                        doIPCBenchmark(worker, (count, deltaTime) -> {
                            Window.alert(String.format("did %d RTs in 10s (%d STs, %d RT/s, %d ST/s, %s avg. ms/RT)", count, count * 2, count / 10, (count * 2) / 10, deltaTime));
                            try {
                                manager.terminate(worker)
                                        .then(forceTerminated -> {
                                            Window.alert("Successfully terminated worker. Force killed: " + forceTerminated);
                                        })
                                        .catchException(err -> {
                                            Window.alert("Worker could not be terminated!");
                                            JSLogger.error("Worker could not be terminated!");
                                            err.printStackTrace();
                                        });
                            } catch (PromiseFinishedException e) {
                                throw new RuntimeException(e);
                            }
                        }, System.currentTimeMillis() + 10000);
                    });
        } else {
            // not in main thread
            MainThreadIPCAdapter adapter = new MainThreadIPCAdapter(DedicatedWorkerGlobalScope.get());
            new WorkerSlave(adapter, new RemoteWorkerManager(adapter)).bindEventListeners().markAsReady()
                    .then(slave -> {
                        slave.getCommandBus().addListener(command -> {
                            if (command instanceof MSPingCommand) {
                                slave.getIPCAdapter().writeCommand(new SMPongCommand(((MSPingCommand) command).getRequestId()));
                            }
                        });
                    });
        }
    }

    public static void doIPCBenchmark(RemoteWorkerSlave worker, BiConsumer<Integer, Float> callback, long endTime) {
        AtomicInteger seq = new AtomicInteger(0);
        AtomicInteger cumTime = new AtomicInteger(0);
        AtomicLong startTime = new AtomicLong(System.currentTimeMillis());

        worker.getCommandBus().addListener(command -> {
            if (command instanceof SMPongCommand) {
                long time = System.currentTimeMillis();
                if (time >= endTime) {
                    callback.accept(seq.get(), (float) (Math.round(((float) cumTime.get() / seq.get()) * 1000) / 1000.0));
                } else {
                    int count = seq.incrementAndGet();
                    cumTime.getAndAdd((int) (time - startTime.get()));
                    startTime.set(time);
                    worker.getAdapter().writeCommand(new MSPingCommand().setRequestId(count));
                }
            }
        });
        worker.getAdapter().writeCommand(new MSPingCommand().setRequestId(seq.get()));
    }
}
