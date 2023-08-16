package me.q13x.workerconcurrency.commons.async;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class EventBus<T> {
    static final int DEFAULT_LISTENER_WARN_LIMIT = 10;
    ArrayList<Consumer<T>> listeners;
    int listenerWarnLimit;

    public EventBus() {
        this.listenerWarnLimit = DEFAULT_LISTENER_WARN_LIMIT;
        this.listeners = new ArrayList<>();
    }

    public EventBus(int listenerWarnLimit) {
        this.listenerWarnLimit = listenerWarnLimit;
        this.listeners = new ArrayList<>();
    }

    public EventBus(List<Consumer<T>> callbacks, int listenerWarnLimit) {
        this.listeners = new ArrayList<>(callbacks);
        this.listenerWarnLimit = listenerWarnLimit;
    }

    public boolean addListener(Consumer<T> listener) {
        this.listeners.add(listener);
        return listeners.size() <= listenerWarnLimit;
    }

    public boolean hasListener(Consumer<T> listener) {
        return listeners.contains(listener);
    }

    public boolean removeListener(Consumer<T> listener) {
        return listeners.remove(listener);
    }

    public List<Consumer<T>> getListeners() {
        return listeners;
    }

    public EventBus<T> setListenerWarnLimit(int newLimit) {
        this.listenerWarnLimit = newLimit;
        return this;
    }

    public int getListenerWarnLimit() {
        return listenerWarnLimit;
    }

    public EventBus<T> dispatch(T value) {
        this.listeners.forEach(listener -> {
            try {
                listener.accept(value);
            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            }
        });
        return this;
    }
}
