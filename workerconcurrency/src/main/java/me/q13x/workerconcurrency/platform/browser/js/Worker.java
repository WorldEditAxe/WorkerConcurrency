package me.q13x.workerconcurrency.platform.browser.js;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.MessageEvent;
import org.teavm.jso.workers.AbstractWorker;

public abstract class Worker implements AbstractWorker {
   public Worker() {
   }

   @JSBody(
      params = {"url"},
      script = "return new Worker(url);"
   )
   public static native Worker create(String var0);

   @JSProperty("onmessage")
   public abstract void onMessage(EventListener<MessageEvent> var1);

   public abstract void postMessage(JSObject var1);

   public abstract void postMessage(JSObject message, JSObject[] transfer);

   public abstract void terminate();

   @JSBody(params = { "script" }, script = "return new Worker(URL.createObjectURL(new Blob([script], { type: \"text/javascript\" })));")
   public static native Worker fromScript(String script);
}
