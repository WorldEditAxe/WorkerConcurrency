package me.q13x.workerconcurrency.wrappers;

import me.q13x.workerconcurrency.platform.browser.js.JSBufferUtil;
import me.q13x.workerconcurrency.platform.browser.js.workerglobals.DedicatedWorkerGlobalScope;
import me.q13x.workerconcurrency.platform.browser.js.workerglobals.DedicatedWorkerMessageInterface;
import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSArray;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.MessageEvent;
import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.typedarrays.Int8Array;

import java.util.function.Consumer;

public class MainThreadIPCAdapter extends IPCAdapter {
    DedicatedWorkerGlobalScope scope;
    Consumer<MessageEvent> listener;

    public MainThreadIPCAdapter(DedicatedWorkerGlobalScope scope) {
        super();
        this.scope = scope;
        this.listener = data -> {
            Int8Array buffer = JSBufferUtil.fromArrayBuffer(data.getDataAsArray());
            byte[] bytes = JSBufferUtil.toByteArray(buffer);
            push(bytes);
        };
        DedicatedWorkerMessageInterface.getInstance().getMessageBus().addListener(listener);
    }

    @Override
    public void destroy() {
        super.destroy();
        DedicatedWorkerMessageInterface.getInstance().getMessageBus().removeListener(listener);
    }

    @Override
    public IPCAdapter write(byte[] data) {
        assertIsActive();
        Int8Array buffer = JSBufferUtil.fromByteArray(data);
        this.scope.postMessage(buffer, JSArray.of(new ArrayBuffer[] { buffer.getBuffer() }));
        return this;
    }

    public DedicatedWorkerGlobalScope getScope() {
        return scope;
    }
}
