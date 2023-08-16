package me.q13x.workerconcurrency.platform.browser.js.workerglobals;

import me.q13x.workerconcurrency.platform.browser.js.Worker;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;
import org.teavm.jso.core.JSArray;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.MessageEvent;

public interface DedicatedWorkerGlobalScope extends WorkerGlobalScope {
    static DedicatedWorkerGlobalScope get() {
        if (Worker.isInWorker()) {
            return getSelf();
        } else {
            throw new IllegalStateException("DedicatedWorkerGlobalScope#get called outside of a worker environment!");
        }
    }

    @JSBody(params = {}, script = "return self;")
    private static DedicatedWorkerGlobalScope getSelf() {
        return null;
    }



    @JSBody(params = { "callback" }, script = "self.onmessage = callback;")
    void onMessage(EventListener<MessageEvent> callback);

    @JSBody(params = { "callback" }, script = "self.onmessageerror = callback;")
    void onMessageError(EventListener<MessageEvent> callback);


    @JSProperty
    String getName();
    void close();

    void postMessage(JSObject message);
    void postMessage(JSObject message, JSArray<JSObject> transferList);
}
