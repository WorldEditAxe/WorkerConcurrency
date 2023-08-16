package me.q13x.workerconcurrency;

import me.q13x.workerconcurrency.commons.Destroyable;
import me.q13x.workerconcurrency.commons.WorkerIPCState;
import me.q13x.workerconcurrency.commons.async.EventBus;
import me.q13x.workerconcurrency.commons.async.JavaPromise;
import me.q13x.workerconcurrency.errors.PromiseFinishedException;
import me.q13x.workerconcurrency.ipc.CommandContext;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.IPCProtocol;
import me.q13x.workerconcurrency.ipc.commands.init.MSIntentCommand;
import me.q13x.workerconcurrency.ipc.commands.init.SMReadyCommand;
import me.q13x.workerconcurrency.platform.browser.js.JSBufferUtil;
import me.q13x.workerconcurrency.platform.browser.js.JSLogger;
import me.q13x.workerconcurrency.platform.browser.js.workerglobals.DedicatedWorkerMessageInterface;
import me.q13x.workerconcurrency.wrappers.CommandReader;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.function.Consumer;

public class WorkerSlave implements Destroyable {
    String intent;
    IPCAdapter adapter;
    RemoteWorkerManager remote;
    Consumer<byte[]> dataCallback;
    EventBus<ICommand> commandEventBus;
    WorkerIPCState state = WorkerIPCState.LOADING;

    public WorkerSlave(IPCAdapter adapter, RemoteWorkerManager remote) {
        this.intent = null;
        this.dataCallback = null;
        this.adapter = adapter;
        this.remote = remote;
        this.commandEventBus = new EventBus<>();
    }

    public WorkerSlave(IPCAdapter adapter, RemoteWorkerManager remote, String intent) {
        this.intent = intent;
        this.commandEventBus = new EventBus<>();
        this.dataCallback = data -> {
            try {
                ICommand command = CommandReader.parse(data, true);
                this.commandEventBus.dispatch(command);
                command.getCommandEnum().getCommandCallback().accept(command, new CommandContext(CommandContext.EnvironmentType.SLAVE, adapter, remote, this));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };
        this.adapter = adapter;
        this.remote = remote;
        this.state = WorkerIPCState.READY;
        adapter.getDataEventBus().addListener(dataCallback);
    }

    public WorkerSlave bindEventListeners() {
        if (dataCallback == null) {
            if (!DedicatedWorkerMessageInterface.alreadyInited()) {
                DedicatedWorkerMessageInterface.init();
            }
            Consumer<byte[]> dataCallback = data -> {
                try {
                    ICommand command = CommandReader.parse(data, true);
                    this.commandEventBus.dispatch(command);
                    command.getCommandEnum().getCommandCallback().accept(command, new CommandContext(CommandContext.EnvironmentType.SLAVE, adapter, remote, this));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            };
            this.dataCallback = dataCallback;
            adapter.getDataEventBus().addListener(dataCallback);
            return this;
        } else {
            throw new IllegalStateException("You can only bind event listeners once!");
        }
    }

    public JavaPromise<WorkerSlave, Exception> markAsReady() {
        if (dataCallback == null) {
            throw new IllegalStateException("bindEventListeners() must be called before marking as ready!");
        } else {
            if (state == WorkerIPCState.LOADING) {
                adapter.writeCommand(new SMReadyCommand());
                state = WorkerIPCState.READY;
                JavaPromise<WorkerSlave, Exception> promise = new JavaPromise<>();

                try {
                    CommandReader.awaitCommand(adapter, CommandEnum.MS_INTENT, true)
                            .then(_command -> {
                                MSIntentCommand command = (MSIntentCommand) _command;
                                this.intent = command.getIntent();
                                try {
                                    promise.resolve(this);
                                } catch (PromiseFinishedException e) {
                                    throw new RuntimeException(e);
                                }
                            })
                            .catchException(err -> {
                                throw new RuntimeException(err);
                            });
                } catch (PromiseFinishedException e) {
                    throw new RuntimeException(e);
                }
                return promise;
            } else {
                throw new IllegalStateException("WorkerSlave must be in state LOADING to call WorkerSlave#init!");
            }
        }
    }

    @Override
    public boolean getActive() {
        return state == WorkerIPCState.CLOSED;
    }

    public void destroy() {
        this.state = WorkerIPCState.CLOSED;
        this.adapter.getDataEventBus().removeListener(dataCallback);
        this.adapter.destroy();
    }

    public EventBus<ICommand> getCommandBus() {
        return commandEventBus;
    }

    public String getIntent() {
        return intent;
    }

    public WorkerIPCState getState() {
        return this.state;
    }

    public IPCAdapter getIPCAdapter() {
        return this.adapter;
    }

    void assertActive() {
        if (state != WorkerIPCState.READY) {
            throw new IllegalStateException("WorkerSlave must be in state READY to call this method!");
        }
    }
}
