package me.q13x.workerconcurrency.wrappers;

import java.util.ArrayList;

import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.IPCProtocol;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.MessageEvent;
import org.teavm.jso.typedarrays.ArrayBuffer;

import me.q13x.workerconcurrency.platform.browser.js.ArrayBufferUtil;
import me.q13x.workerconcurrency.platform.browser.js.Worker;

public class WorkerIPCAdapter implements IPCAdapter {
    Worker worker;
    ArrayList<byte[]> packetReadBuffer;
    ArrayList<Runnable> dataReceivedCallbacks;
    EventListener<MessageEvent> messageListener;
    boolean isActive;


    public WorkerIPCAdapter(Worker worker) {
        this.worker = worker;
        this.packetReadBuffer = new ArrayList<>();
        this.dataReceivedCallbacks = new ArrayList<>();
        this.messageListener = msg -> {
            ArrayBuffer buffer = msg.getDataAsArray();
            byte[] bytes = new byte[buffer.getByteLength()];

            for (int i = 0; i < buffer.getByteLength(); i++) {
                bytes[i] = ArrayBufferUtil.getByte(buffer, i);
            }

            packetReadBuffer.add(bytes);
            for (Runnable callback : dataReceivedCallbacks) {
                callback.run();
            }
        };
        worker.addEventListener("message", this.messageListener, false);
        this.isActive = true;
    }

    @Override
    public boolean getIsActive() {
        return isActive;
    }

    @Override
    public IPCAdapter addCommandDataReceivedCallback(Runnable callback) {
        this.dataReceivedCallbacks.add(callback);
        return this;
    }

    @Override
    public IPCAdapter removeCommandDataReceivedCallback(Runnable callback) {
        this.dataReceivedCallbacks.remove(callback);
        return this;
    }

    @Override
    public IPCAdapter destroy() {
        assertIsActive();
        this.worker.removeEventListener("message", this.messageListener, false);
        this.isActive = false;
        return this;
    }

    @Override
    public byte[] nextCommandDataBlock() {
        if (packetReadBuffer.size() > 0) {
            byte[] packet = packetReadBuffer.get(0);
            packetReadBuffer.remove(packet);
            return packet;
        } else return null;
    }

    @Override
    public int getCommandDataReadBufferSize() {
        return this.packetReadBuffer.size();
    }

    @Override
    public IPCAdapter flushCommandDataReadBuffer() {
        this.packetReadBuffer.clear();
        return this;
    }

    @Override
    public IPCAdapter write(byte[] data) {
        assertIsActive();
        ArrayBuffer buffer = ArrayBufferUtil.createArrayBuffer(data.length);
        for (int i = 0; i < data.length; i++) {
            ArrayBufferUtil.setByte(buffer, i, data[i]);
        }
        this.worker.postMessage(buffer, new ArrayBuffer[] { buffer });
        return this;
    }

    @Override
    public IPCAdapter writeCommand(ICommand command) {
        assertIsActive();
        write(IPCProtocol.concatByteArrays(new byte[][] {
                IPCProtocol.writeShort(command.getCommandEnum().getCommandId()),
                command.toBuffer()
        }));
        return this;
    }

    void assertIsActive() {
        if (!this.isActive) {
            throw new IllegalStateException("This method is not available when the IPC adapter is dead!");
        }
    }
}
