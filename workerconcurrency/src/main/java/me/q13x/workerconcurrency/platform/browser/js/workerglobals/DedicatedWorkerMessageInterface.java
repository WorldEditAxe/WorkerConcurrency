package me.q13x.workerconcurrency.platform.browser.js.workerglobals;

import me.q13x.workerconcurrency.commons.async.EventBus;
import org.teavm.jso.dom.events.MessageEvent;

/**
 * shitty helper class to fix shitty bug
 */
public class DedicatedWorkerMessageInterface {
    private final EventBus<MessageEvent> MESSAGE_BUS = new EventBus<>();
    private final EventBus<MessageEvent> MESSAGE_ERROR_BUS = new EventBus<>();
    private static DedicatedWorkerMessageInterface instance = null;

    public static DedicatedWorkerMessageInterface getInstance() {
        if (instance == null) {
            init();
        }
        return instance;
    }

    public static void init() {
        if (instance == null) {
            instance = new DedicatedWorkerMessageInterface(DedicatedWorkerGlobalScope.get());
        } else {
            throw new IllegalStateException("init() called twice!");
        }
    }

    public static boolean alreadyInited() {
        return instance != null;
    }

    private DedicatedWorkerMessageInterface(DedicatedWorkerGlobalScope scope) {
        scope.onMessage(MESSAGE_BUS::dispatch);
        scope.onMessageError(MESSAGE_ERROR_BUS::dispatch);
    }

    public EventBus<MessageEvent> getMessageBus() {
        return MESSAGE_BUS;
    }

    public EventBus<MessageEvent> getMessageErrorBus() {
        return MESSAGE_ERROR_BUS;
    }
}
