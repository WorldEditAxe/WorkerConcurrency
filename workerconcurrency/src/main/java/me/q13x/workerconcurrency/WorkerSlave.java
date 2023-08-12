package me.q13x.workerconcurrency;

import me.q13x.workerconcurrency.commons.WorkerIPCState;
import me.q13x.workerconcurrency.errors.InvalidPacketException;
import me.q13x.workerconcurrency.ipc.CommandContext;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.IPCProtocol;
import me.q13x.workerconcurrency.ipc.commands.init.SMReadyCommand;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public class WorkerSlave {
    IPCAdapter adapter;
    RemoteWorkerManager remote;
    WorkerIPCState state = WorkerIPCState.LOADING;

    public WorkerSlave(IPCAdapter adapter) {
        this.adapter = adapter;
    }

    public WorkerSlave(IPCAdapter adapter, RemoteWorkerManager remote, WorkerIPCState state) {
        this.adapter = adapter;
        this.remote = remote;
        this.state = state;
    }

    public void processCommands() {
        processCommands(0);
    }

    public void processCommands(int limit) {
        assertActive();
        int packetCount = 0;
        while (adapter.getCommandDataReadBufferSize() > 0) {
            if (limit > 0) {
                packetCount++;
                if (packetCount >= limit) {
                    break;
                }
            }
            byte[] commandData = adapter.nextCommandDataBlock();
            processCommand(commandData);
        }
    }

    void processCommand(byte[] commandDataRaw) {
        IPCProtocol.ReadResult<Short> packetId = IPCProtocol.readShort(commandDataRaw);
        for (CommandEnum cmdEnum : CommandEnum.values()) {
            if (cmdEnum.getCommandId() == packetId.getValue() && cmdEnum.isBoundToSlave()) {
                try {
                    cmdEnum.getCommandCallback().accept(
                            cmdEnum.getCommandClassInstance().read(commandDataRaw, packetId.getReadBytes()),
                            new CommandContext(
                                    CommandContext.EnvironmentType.SLAVE,
                                    adapter,
                                    remote,
                                    this
                            )
                    );
                } catch (InstantiationException | IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
                break;
            }
        }
        throw new InvalidPacketException(String.format("Received invalid command ID (missing command enum?): %d!", packetId.getValue()));
    }

    public void markAsReady() {
        if (state == WorkerIPCState.LOADING) {
            adapter.write(new SMReadyCommand().toBuffer());
            state = WorkerIPCState.READY;
        } else {
            throw new IllegalStateException("WorkerSlave must be in state LOADING to call WorkerSlave#init!");
        }
    }

    public void destroy() {
        this.state = WorkerIPCState.CLOSED;
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
