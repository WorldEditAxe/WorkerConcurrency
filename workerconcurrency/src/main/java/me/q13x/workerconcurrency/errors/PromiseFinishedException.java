package me.q13x.workerconcurrency.errors;

public class PromiseFinishedException extends Exception {
    public PromiseFinishedException(String msg) {
        super(msg);
    }
}
