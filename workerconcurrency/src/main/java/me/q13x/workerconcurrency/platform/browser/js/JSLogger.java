package me.q13x.workerconcurrency.platform.browser.js;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;

public class JSLogger {
    @JSBody(params = { "message" }, script = "console.log(message);")
    public native static void info(String message);

    @JSBody(params = { "message" }, script = "console.error(message);")
    public native static void error(String message);

    @JSBody(params = { "message" }, script = "console.log(message);")
    public native static void infoNative(JSObject message);
}
