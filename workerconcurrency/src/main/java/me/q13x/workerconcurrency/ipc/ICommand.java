package me.q13x.workerconcurrency.ipc;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public interface ICommand {
    CommandEnum getCommandEnum();
    ICommand read(byte[] buffer, int offset);
    byte[] toBuffer();
}
