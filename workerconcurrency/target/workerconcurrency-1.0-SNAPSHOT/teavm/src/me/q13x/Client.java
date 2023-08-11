package me.q13x;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.core.JSNumber;
import org.teavm.jso.core.JSString;
import org.teavm.jso.dom.html.HTMLDocument;

import me.q13x.workerconcurrency.Worker;

public class Client {
    @JSBody(params = { "object" }, script = "return Number(object);")
    public static native double toDouble(JSObject object);

    public static void main(String[] args) {
        var document = HTMLDocument.current();
        var div = document.createElement("div");
        div.appendChild(document.createTextNode("me working"));
        document.getBody().appendChild(div);

        // TESTING
        Worker secondWorker = Worker.fromScript("self.onmessage = (message) => { self.postMessage(message.data + 1); };");
        long endTime = System.currentTimeMillis() + 1000;
        AtomicLong i = new AtomicLong(0L);
        AtomicBoolean running = new AtomicBoolean(true);

        secondWorker.onMessage(msg -> {
            if (running.get()) {
                if (System.currentTimeMillis() >= endTime) {
                    running.set(false);
                    Window.alert("finished benchmark: " + i.get() + " round trip(s) between worker per second");
                } else {
                    i.set((long) Client.toDouble(msg.getData()));
                    secondWorker.postMessage(JSNumber.valueOf(i.get()));
                }
            }
        });
        secondWorker.postMessage(JSNumber.valueOf(i.get()));
    }
}
