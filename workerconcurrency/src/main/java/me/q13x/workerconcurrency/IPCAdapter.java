package me.q13x.workerconcurrency;

public interface IPCAdapter {
    public byte nextByte();
    public int getReadBufferSize();
    public IPCAdapter flushReadBuffer();

    public IPCAdapter destroy();
    public IPCAdapter write(byte[] data);
}