package me.q13x.workerconcurrency.ipc.commands;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public interface ICommand {
    CommandEnum getCommandEnum();
    ICommand read(IPCAdapter adapter);
    ICommand write(IPCAdapter adapter);
}
