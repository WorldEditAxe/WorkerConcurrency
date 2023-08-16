package me.q13x.workerconcurrency.commons;

public enum WrappedWorkerState implements NetworkTransferableEnum {
    STARTING_UP(0),
    READY(1),
    STOPPED(2);

    int networkValue;

    WrappedWorkerState(int networkValue) {
        this.networkValue = networkValue;
    }

    public int getNetworkValue() {
        return networkValue;
    }
}
