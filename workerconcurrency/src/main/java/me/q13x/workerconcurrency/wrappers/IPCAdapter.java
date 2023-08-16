package me.q13x.workerconcurrency.wrappers;

import me.q13x.workerconcurrency.commons.Destroyable;
import me.q13x.workerconcurrency.commons.async.EventBus;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.IPCProtocol;

import java.util.ArrayList;

public abstract class IPCAdapter implements Destroyable {
    protected ArrayList<byte[]> packetReadBuffer;
    protected EventBus<byte[]> eventBus;
    protected boolean isActive;
    protected boolean isPaused;

    public IPCAdapter() {
        this.packetReadBuffer = new ArrayList<>();
        this.eventBus = new EventBus<>();
        this.isActive = true;
        this.isPaused = false;
    }

    protected void push(byte[] dataBlock) {
        if (isPaused) {
            packetReadBuffer.add(dataBlock);
        }
        eventBus.dispatch(dataBlock);
    }

    public byte[] nextCommandDataBlock() {
        if (packetReadBuffer.size() > 0) {
            byte[] packet = packetReadBuffer.get(0);
            packetReadBuffer.remove(packet);
            return packet;
        } else return null;
    }

    public int getCommandDataReadBufferSize() {
        return this.packetReadBuffer.size();
    }

    public IPCAdapter flushCommandDataReadBuffer() {
        this.packetReadBuffer.clear();
        return this;
    }

    public void destroy() {
        assertIsActive();
        isActive = false;
    }

    public abstract IPCAdapter write(byte[] data);

    public IPCAdapter writeCommand(ICommand command) {
        assertIsActive();
        write(IPCProtocol.concatByteArrays(new byte[][] {
                IPCProtocol.writeShort(command.getCommandEnum().getCommandId()),
                command.toBuffer()
        }));
        return this;
    }

    public boolean getActive() {
        return isActive;
    }

    public EventBus<byte[]> getDataEventBus() {
        return eventBus;
    }

    public boolean isPaused() {
        return isPaused;
    }

    public void setPaused(boolean paused) {
        isPaused = paused;
    }

    void assertIsActive() {
        if (!this.isActive) {
            throw new IllegalStateException("This method is not available when the IPC adapter is dead!");
        }
    }
}