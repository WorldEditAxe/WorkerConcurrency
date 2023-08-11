package me.q13x.workerconcurrency.ipc.commands;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.IPCAdapter;

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
        // do nothing
        byte[] packet = new byte[6];
        int i = 0;
        while (i < 6) {
            packet[i] = adapter.nextByte();
        }
        
        return this;
    }

    @Override
    public ICommand write(IPCAdapter adapter) {
        short commandId = getCommandEnum().getCommandId();
        adapter.write(new byte[] { 
            (byte) (commandId >> 8), (byte) commandId,
            (byte) (requestId >> 24), (byte) (requestId >> 16),
            (byte) (requestId >> 8), (byte) requestId
        });
        return this;
    }
    
}
