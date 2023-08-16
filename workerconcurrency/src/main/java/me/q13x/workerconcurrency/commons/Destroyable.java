package me.q13x.workerconcurrency.commons;

public interface Destroyable {
    boolean getActive();
    void destroy();
}
