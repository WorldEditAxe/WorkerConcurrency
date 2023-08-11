package me.q13x.workerconcurrency.ipc;

import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public class CommandContext {
    EnvironmentType environmentType;
    IPCAdapter socket;

    public CommandContext(EnvironmentType envType, IPCAdapter ipcSocket) {
        this.environmentType = envType;
        this.socket = ipcSocket;
    }

    public EnvironmentType getEnvironmentType() {
        return this.environmentType;
    }

    public IPCAdapter getIPCAdapter() {
        return this.socket;
    }

    public enum EnvironmentType {
        MASTER(0),
        SLAVE(1);

        int networkId;

        EnvironmentType(int networkId) {
            this.networkId = networkId;
        }

        public int getNetworkForm() {
            return this.networkId;
        }
    }
}
