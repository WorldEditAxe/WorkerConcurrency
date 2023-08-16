package me.q13x.workerconcurrency.platform.browser.js;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;
import org.teavm.jso.core.JSArray;
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
   public static native Worker create(String url);

   @JSProperty("onmessage")
   public abstract void onMessage(EventListener<MessageEvent> callback);

   public abstract void postMessage(JSObject var1);

   public abstract void postMessage(JSObject message, JSArray<JSObject> transfer);

   public abstract void terminate();

   @JSBody(params = { "script" }, script = "return new Worker(URL.createObjectURL(new Blob([script],{type:\"text/javascript\"})));")
   public static native Worker createFromScript(String script);

   @JSBody(params = { "script" }, script = "return URL.createObjectURL(new Blob([script],{type:\"text/javascript\"}));")
   public static native String getUrlFromScript(String script);

   // static String TEAVM_EXEC_STRING = "fetch('%s').then(f=>f.text().then(script=>{const mainMethod = new Function(script + '\\nreturn %s;').bind(globalThis)();mainMethod();}));";
   static String TEAVM_EXEC_STRING = "let script=null;try{script=new URL(\"%s\")}catch(err){script=new URL(\"%s\",location.origin)};importScripts(script);%s();";

   public static String getTeaVMScript(String scriptUrl) {
      return getTeaVMScript(scriptUrl, "main");
   }

   public static String getTeaVMScript(String scriptUrl, String methodName) {
      return getUrlFromScript(String.format(TEAVM_EXEC_STRING, scriptUrl, scriptUrl, methodName));
   }

   @JSBody(params = {}, script = "return typeof self.document === 'undefined'")
   public static native boolean isInWorker();
}
