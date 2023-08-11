package me.q13x;

import org.teavm.jso.browser.Window;
import org.teavm.jso.core.JSString;
import org.teavm.jso.dom.html.HTMLDocument;

import me.q13x.workerconcurrency.Worker;

public class Client {
    public static void main(String[] args) {
        var document = HTMLDocument.current();
        var div = document.createElement("div");
        div.appendChild(document.createTextNode("me working"));
        document.getBody().appendChild(div);

        // TESTING
        Worker secondWorker = Worker.fromScript("self.onmessage = (message) => { self.postMessage(`${message.data} (echo from main thread)`); };");
        secondWorker.onMessage(msg -> {
            Window.alert(msg.getData());
        });
        secondWorker.postMessage(JSString.valueOf("Hello, world!"));
    }
}
