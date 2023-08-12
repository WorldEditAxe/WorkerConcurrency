package me.q13x.workerconcurrency.commons;

public enum WorkerIPCState {
    LOADING(0),
    READY(1),
    CLOSED(2);

    int networkValue;

    WorkerIPCState(int networkValue) {
        this.networkValue = networkValue;
    }

    public int getNetworkValue() {
        return networkValue;
    }
}