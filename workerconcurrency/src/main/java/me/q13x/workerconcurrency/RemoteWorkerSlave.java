package me.q13x.workerconcurrency;

import me.q13x.workerconcurrency.commons.WrappedWorkerState;
import me.q13x.workerconcurrency.commons.async.EventBus;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.platform.browser.js.Worker;
import me.q13x.workerconcurrency.wrappers.CommandReader;
import me.q13x.workerconcurrency.wrappers.WorkerIPCAdapter;

public class RemoteWorkerSlave {
    Worker worker;
    WorkerIPCAdapter adapter;
    WrappedWorkerState state;
    EventBus<ICommand> commandEventBus;

    public RemoteWorkerSlave(Worker worker, WorkerIPCAdapter adapter) {
        this.worker = worker;
        this.adapter = adapter;
        this.commandEventBus = new EventBus<>();

        this.adapter.getDataEventBus().addListener(data -> {
            try {
                commandEventBus.dispatch(CommandReader.parse(data, false));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    public Worker getWorker() {
        return worker;
    }

    public WorkerIPCAdapter getAdapter() {
        return adapter;
    }

    public WrappedWorkerState getState() {
        return state;
    }

    public void setState(WrappedWorkerState state) {
        this.state = state;
    }

    public EventBus<ICommand> getCommandBus() {
        return commandEventBus;
    }
}
