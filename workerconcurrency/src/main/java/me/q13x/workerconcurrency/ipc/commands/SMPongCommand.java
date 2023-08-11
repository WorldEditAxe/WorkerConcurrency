package me.q13x.workerconcurrency.ipc.commands;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.ipc.IPCProtocol;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public class SMPongCommand implements ICommand {
    int requestId = 0;

    public SMPongCommand(int requestId) {
        this.requestId = requestId;
    }
    public SMPongCommand() {}

    public int getRequestId() {
        return this.requestId;
    }

    public SMPongCommand setRequestId(int requestId) {
        this.requestId = requestId;
        return this;
    }

    @Override
    public CommandEnum getCommandEnum() {
        return CommandEnum.SM_PONG;
    }

    @Override
    public ICommand read(IPCAdapter adapter) {
        requestId = IPCProtocol.readVarInt(adapter);
        return this;
    }

    @Override
    public ICommand write(IPCAdapter adapter) {
        IPCProtocol.writeVarInt(adapter, getCommandEnum().getCommandId());
        IPCProtocol.writeVarInt(adapter, requestId);
        return this;
    }
    
}
