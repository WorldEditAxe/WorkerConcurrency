package me.q13x.workerconcurrency.wrappers;

import me.q13x.workerconcurrency.ipc.ICommand;

public interface IPCAdapter {
    byte[] nextCommandDataBlock();
    int getCommandDataReadBufferSize();
    IPCAdapter flushCommandDataReadBuffer();

    IPCAdapter destroy();
    IPCAdapter write(byte[] data);

    IPCAdapter writeCommand(ICommand command);

    boolean getIsActive();

    IPCAdapter addCommandDataReceivedCallback(Runnable callback);
    IPCAdapter removeCommandDataReceivedCallback(Runnable callback);

}