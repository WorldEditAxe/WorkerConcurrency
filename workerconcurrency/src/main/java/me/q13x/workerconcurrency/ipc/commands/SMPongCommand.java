package me.q13x.workerconcurrency.ipc.commands;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.IPCProtocol;

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
    public ICommand read(byte[] buffer) {
        requestId = IPCProtocol.readVarInt(buffer).getValue();
        return this;
    }

    @Override
    public byte[] toBuffer() {
        return IPCProtocol.writeVarInt(requestId);
    }
    
}
