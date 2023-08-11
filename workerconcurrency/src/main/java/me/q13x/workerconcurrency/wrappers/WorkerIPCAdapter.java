package me.q13x.workerconcurrency.wrappers;

import java.util.ArrayList;

import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.MessageEvent;
import org.teavm.jso.typedarrays.ArrayBuffer;

import me.q13x.workerconcurrency.platform.browser.js.ArrayBufferUtil;
import me.q13x.workerconcurrency.platform.browser.js.Worker;

public class WorkerIPCAdapter implements IPCAdapter {
    public Worker worker;
    private ArrayList<Byte> readBuffer;
    
    private EventListener<MessageEvent> messageListener;

    public WorkerIPCAdapter(Worker worker) {
        this.worker = worker;
        this.readBuffer = new ArrayList<>();
        this.messageListener = msg -> {
            ArrayBuffer buffer = msg.getDataAsArray();
            for (int i = 0; i < buffer.getByteLength(); i++) {
                this.readBuffer.add(ArrayBufferUtil.getByte(buffer, i));
            }
        };
        worker.addEventListener("message", this.messageListener, false);
    }

    @Override
    public IPCAdapter destroy() {
        this.worker.removeEventListener("message", this.messageListener, false);
        return this;
    }

    @Override
    public byte nextByte() {
        if (this.readBuffer.size() == 0) {
            while (this.readBuffer.size() == 0) {}
        }
        byte nextByte = this.readBuffer.get(0);
        this.readBuffer.remove(nextByte);
        return nextByte;
    }

    @Override
    public int getReadBufferSize() {
        return this.readBuffer.size();
    }

    @Override
    public IPCAdapter flushReadBuffer() {
        this.readBuffer.clear();
        return this;
    }

    @Override
    public IPCAdapter write(byte[] data) {
        ArrayBuffer buffer = ArrayBufferUtil.createArrayBuffer(data.length);
        for (int i = 0; i < data.length; i++) {
            ArrayBufferUtil.setByte(buffer, i, data[i]);
        }
        this.worker.postMessage(buffer, new ArrayBuffer[] { buffer });
        return this;
    }
}
