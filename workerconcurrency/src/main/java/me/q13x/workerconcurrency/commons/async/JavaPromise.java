package me.q13x.workerconcurrency.commons.async;

import me.q13x.workerconcurrency.errors.PromiseFinishedException;
import me.q13x.workerconcurrency.errors.WrongPromiseStateException;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class JavaPromise<R, E extends Exception> {
    R result;
    E error;
    ArrayList<Consumer<R>> resultCallbacks;
    ArrayList<Consumer<E>> exceptionCallbacks;

    public JavaPromise() {
        result = null;
        error = null;
        resultCallbacks = new ArrayList<>();
        exceptionCallbacks = new ArrayList<>();
    }

    public List<Consumer<R>> getResultCallbacks() {
        return resultCallbacks;
    }

    public List<Consumer<E>> getExceptionCallbacks() {
        return exceptionCallbacks;
    }

    public boolean isDone() {
        return result != null || error != null;
    }

    public boolean isRejected() {
        return error != null;
    }

    public boolean isResolved() {
        return result != null;
    }

    public R getResult() throws WrongPromiseStateException {
        if (!isDone()) {
            throw new WrongPromiseStateException("Attempted to get result when promise hasn't been resolved yet.");
        } else if (isRejected()) {
            throw new WrongPromiseStateException("Attempted to get result when promise has been rejected.");
        }
        return result;
    }

    public E getError() throws WrongPromiseStateException {
        if (!isDone()) {
            throw new WrongPromiseStateException("Attempted to get error when promise hasn't been resolved yet.");
        } else if (isResolved()) {
            throw new WrongPromiseStateException("Attempted to get error when promise has been resolved.");
        }
        return error;
    }

    public JavaPromise<R, E> then(Consumer<R> callback) throws PromiseFinishedException {
        if (!isDone()) {
            this.resultCallbacks.add(callback);
            return this;
        } else {
            throw new PromiseFinishedException("Promise has either been resolved or rejected!");
        }
    }

    public JavaPromise<R, E> catchException(Consumer<E> callback) throws PromiseFinishedException {
        if (!isDone()) {
            this.exceptionCallbacks.add(callback);
            return this;
        } else {
            throw new PromiseFinishedException("Promise has either been resolved or rejected!");
        }
    }

    public JavaPromise<R, E> resolve(R result) throws PromiseFinishedException {
        if (!isDone()) {
            this.result = result;
            this.resultCallbacks.forEach(callback -> callback.accept(result));
            return this;
        } else {
            throw new PromiseFinishedException("Promise has either been resolved or rejected!");
        }
    }

    public JavaPromise<R, E> reject(E exception) throws PromiseFinishedException {
        if (!isDone()) {
            this.error = exception;
            this.exceptionCallbacks.forEach(callback -> callback.accept(exception));
            return this;
        } else {
            throw new PromiseFinishedException("Promise has either been resolved or rejected!");
        }
    }
}
