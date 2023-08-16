package me.q13x.workerconcurrency.platform.browser.js;

import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.typedarrays.Int8Array;

public class JSBufferUtil {
    public static Int8Array fromByteArray(byte[] byteArr) {
        Int8Array arr = Int8Array.create(byteArr.length);
        for (int i = 0; i < byteArr.length; i++) {
            arr.set(i, byteArr[i]);
        }
        return Int8Array.create(arr);
    }

    public static Int8Array fromArrayBuffer(ArrayBuffer buffer) {
        return Int8Array.create(buffer);
    }

    public static byte[] toByteArray(Int8Array arr) {
        byte[] bytes = new byte[arr.getByteLength()];
        for (int i = 0; i < arr.getByteLength(); i++) {
            bytes[i] = arr.get(i);
        }
        return bytes;
    }
}
