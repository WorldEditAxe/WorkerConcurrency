package me.q13x.workerconcurrency.ipc.commands;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.ipc.IPCProtocol;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public class MSPingCommand implements ICommand {
    int requestId = 0;

    public MSPingCommand() {}
    public MSPingCommand(int requestId) {
        this.requestId = requestId;
    }

    public int getRequestId() {
        return this.requestId;
    }

    public MSPingCommand setRequestId(int requestId) {
        this.requestId = requestId;
        return this;
    }

    @Override
    public ICommand read(IPCAdapter adapter) {
        this.requestId = IPCProtocol.readVarInt(adapter);
        return this;
    }

    @Override
    public ICommand write(IPCAdapter adapter) {
        IPCProtocol.writeVarInt(adapter, requestId);
        return this;
    }

    @Override
    public CommandEnum getCommandEnum() {
        return CommandEnum.SM_PONG;
    }
    
}
