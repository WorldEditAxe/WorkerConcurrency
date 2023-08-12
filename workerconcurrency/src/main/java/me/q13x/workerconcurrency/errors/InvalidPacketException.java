package me.q13x.workerconcurrency.errors;

public class InvalidPacketException extends RuntimeException {
    public InvalidPacketException(String msg) {
        super(msg);
    }
}
