package me.q13x.workerconcurrency.ipc;

import me.q13x.workerconcurrency.RemoteWorkerManager;
import me.q13x.workerconcurrency.RemoteWorkerSlave;
import me.q13x.workerconcurrency.WorkerManager;
import me.q13x.workerconcurrency.WorkerSlave;
import me.q13x.workerconcurrency.errors.BadArgumentException;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public class CommandContext {
    EnvironmentType environmentType;
    IPCAdapter socket;

    RemoteWorkerSlave remoteSlave = null;
    RemoteWorkerManager remoteManager = null;

    WorkerSlave slave;
    WorkerManager manager;


    public CommandContext(EnvironmentType envType, IPCAdapter ipcSocket, Object remoteObject, Object currentObject) {
        this.environmentType = envType;
        this.socket = ipcSocket;

        if (!(remoteObject instanceof RemoteWorkerSlave) && !(remoteObject instanceof RemoteWorkerManager)) {
            throw new BadArgumentException("You must pass a RemoteWorkerSlave or a RemoteWorkerManager as the remote object.");
        } else if (!(currentObject instanceof WorkerSlave) && !(currentObject instanceof WorkerManager)) {
            throw new BadArgumentException("You must pass a WorkerSlave or a WorkerManager as the current object.");
        } else {
            if (remoteObject instanceof RemoteWorkerSlave) {
                this.remoteSlave = (RemoteWorkerSlave) remoteObject;
            } else {
                this.remoteManager = (RemoteWorkerManager) remoteObject;
            }
            if (currentObject instanceof WorkerSlave) {
                this.slave = (WorkerSlave) currentObject;
            } else {
                this.manager = (WorkerManager) currentObject;
            }
        }
    }

    public EnvironmentType getEnvironmentType() {
        return this.environmentType;
    }

    public IPCAdapter getIPCAdapter() {
        return this.socket;
    }

    public RemoteWorkerManager getRemoteManager() {
        if (this.environmentType == EnvironmentType.MANAGER) {
            throw new IllegalStateException("Requested remote master in a master context!?");
        } else {
            return remoteManager;
        }
    }

    public RemoteWorkerSlave getRemoteSlave() {
        if (this.environmentType == EnvironmentType.SLAVE) {
            throw new IllegalStateException("Requested remote slave in a slave context!?");
        } else {
            return remoteSlave;
        }
    }

    public WorkerManager getWorkerManager() {
        if (this.environmentType == EnvironmentType.SLAVE) {
            throw new IllegalStateException("Requested WorkerManager in a slave context!?");
        } else {
            return manager;
        }
    }

    public WorkerSlave getWorkerSlave() {
        if (this.environmentType == EnvironmentType.MANAGER) {
            throw new IllegalStateException("Requested WorkerSlave in a master context!?");
        } else {
            return slave;
        }
    }

    public enum EnvironmentType {
        MANAGER(0),
        SLAVE(1);

        int networkValue;

        EnvironmentType(int networkValue) {
            this.networkValue = networkValue;
        }

        public int getNetworkValue() {
            return this.networkValue;
        }
    }
}
