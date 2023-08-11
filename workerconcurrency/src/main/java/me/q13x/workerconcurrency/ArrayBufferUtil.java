package me.q13x.workerconcurrency;

import org.teavm.jso.JSBody;
import org.teavm.jso.typedarrays.ArrayBuffer;

public class ArrayBufferUtil {
    @JSBody(params = { "size" }, script = "return new ArrayBuffer(size);")
    public static native ArrayBuffer createArrayBuffer(int size);

    @JSBody(params = { "buffer", "index", "value" }, script = "buffer[index] = value; return buffer;")
    public static native ArrayBuffer setByte(ArrayBuffer buffer, int index, byte value);

    @JSBody(params = { "buffer", "index" }, script = "return buffer[index]")
    public static native byte getByte(ArrayBuffer buffer, int index);
}
