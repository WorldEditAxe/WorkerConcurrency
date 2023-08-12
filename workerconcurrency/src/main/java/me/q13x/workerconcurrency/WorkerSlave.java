package me.q13x.workerconcurrency;

import me.q13x.workerconcurrency.commons.WorkerIPCState;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public class WorkerSlave {
    IPCAdapter adapter;
    WorkerIPCState state = WorkerIPCState.LOADING;

    public WorkerSlave(IPCAdapter adapter) {
        this.adapter = adapter;
    }

    public WorkerSlave(IPCAdapter adapter, WorkerIPCState state) {
        this.adapter = adapter;
        this.state = state;
    }

    public void init() {
        if (state == WorkerIPCState.LOADING) {
            // TODO: implement
        } else {
            throw new IllegalStateException("WorkerSlave must be in state LOADING to call WorkerSlave#init!");
        }
    }

    public WorkerIPCState getState() {
        return this.state;
    }
}
