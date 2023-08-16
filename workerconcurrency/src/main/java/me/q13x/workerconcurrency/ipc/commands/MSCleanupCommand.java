package me.q13x.workerconcurrency.ipc.commands;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.ipc.ICommand;

public class MSCleanupCommand implements ICommand {
    @Override
    public CommandEnum getCommandEnum() {
        return CommandEnum.MS_CLEANUP;
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
