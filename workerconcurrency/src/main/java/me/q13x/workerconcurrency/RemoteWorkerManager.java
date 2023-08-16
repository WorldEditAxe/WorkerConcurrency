package me.q13x.workerconcurrency;

import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public class RemoteWorkerManager {
    IPCAdapter adapter;

    public RemoteWorkerManager(IPCAdapter adapter) {
        this.adapter = adapter;
    }

    public IPCAdapter getAdapter() {
        return adapter;
    }
}
