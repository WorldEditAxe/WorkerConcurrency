package me.q13x.workerconcurrency.errors;

public class WrongPromiseStateException extends Exception {
    public WrongPromiseStateException(String msg) {
        super(msg);
    }
}
