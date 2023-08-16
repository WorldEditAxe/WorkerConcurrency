package me.q13x.workerconcurrency.wrappers;

import org.teavm.jso.core.JSArray;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.MessageEvent;
import org.teavm.jso.typedarrays.ArrayBuffer;

import me.q13x.workerconcurrency.platform.browser.js.JSBufferUtil;
import me.q13x.workerconcurrency.platform.browser.js.Worker;
import org.teavm.jso.typedarrays.Int8Array;

public class WorkerIPCAdapter extends IPCAdapter {
    EventListener<MessageEvent> messageListener;
    Worker worker;

    public WorkerIPCAdapter(Worker worker) {
        super();
        this.worker = worker;
        this.messageListener = msg -> {
            Int8Array buffer = JSBufferUtil.fromArrayBuffer(msg.getDataAsArray());
            byte[] bytes = JSBufferUtil.toByteArray(buffer);
            push(bytes);
        };
        worker.addEventListener("message", this.messageListener, false);
    }

    public void destroy() {
        super.destroy();
        this.worker.removeEventListener("message", this.messageListener, false);
    }

    @Override
    public IPCAdapter write(byte[] data) {
        assertIsActive();
        Int8Array array = JSBufferUtil.fromByteArray(data);
        this.worker.postMessage(array, JSArray.of(new ArrayBuffer[] { array.getBuffer() }));
        return this;
    }

}
