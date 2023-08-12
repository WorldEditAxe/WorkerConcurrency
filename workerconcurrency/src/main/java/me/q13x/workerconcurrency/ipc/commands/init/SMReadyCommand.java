package me.q13x.workerconcurrency.ipc.commands.init;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.ipc.ICommand;

public class SMReadyCommand implements ICommand {
    @Override
    public CommandEnum getCommandEnum() {
        return CommandEnum.SM_READY;
    }

    @Override
    public ICommand read(byte[] buffer, int offset) {
        return this;
    }

    @Override
    public byte[] toBuffer() {
        return new byte[0];
    }
}
