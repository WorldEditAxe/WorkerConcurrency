package me.q13x.workerconcurrency.ipc.commands;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.IPCProtocol;

public class MSPingCommand implements ICommand {
    int requestId = 0;

    public MSPingCommand(int requestId) {
        this.requestId = requestId;
    }
    public MSPingCommand() {}

    public int getRequestId() {
        return this.requestId;
    }

    public MSPingCommand setRequestId(int requestId) {
        this.requestId = requestId;
        return this;
    }

    @Override
    public ICommand read(byte[] buffer, int offset) {
        this.requestId = IPCProtocol.readVarInt(buffer, offset).getValue();
        return this;
    }

    @Override
    public byte[] toBuffer() {
        return IPCProtocol.writeVarInt(requestId);
    }

    @Override
    public CommandEnum getCommandEnum() {
        return CommandEnum.MS_PING;
    }
    
}
