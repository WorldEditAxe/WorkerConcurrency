package me.q13x.workerconcurrency.wrappers;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.commons.async.JavaPromise;
import me.q13x.workerconcurrency.errors.InvalidPacketException;
import me.q13x.workerconcurrency.errors.PromiseFinishedException;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.IPCProtocol;
import me.q13x.workerconcurrency.platform.browser.js.JSLogger;

import java.util.function.Consumer;

public class CommandReader {
    public static ICommand parse(byte[] data, boolean isSlave) {
        IPCProtocol.ReadResult<Short> id = IPCProtocol.readShort(data);
        for (CommandEnum cmdEnum : CommandEnum.values()) {
            if (cmdEnum.isBoundToSlave() == isSlave && cmdEnum.getCommandId() == id.getValue()) {
                try {
                    return cmdEnum.getCommandClassInstance().read(data, id.getReadBytes());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
        throw new InvalidPacketException(String.format("Invalid packet ID of packet received - %d.", id.getValue()));
    }

    public static ICommand parse(short commandId, byte[] data, boolean isSlave) {
        IPCProtocol.ReadResult<Short> id = IPCProtocol.readShort(data);
        if (id.getValue() == commandId) {
            for (CommandEnum cmdEnum : CommandEnum.values()) {
                if (cmdEnum.isBoundToSlave() == isSlave && cmdEnum.getCommandId() == id.getValue()) {
                    try {
                        return cmdEnum.getCommandClassInstance().read(data, id.getReadBytes());
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            }
            throw new InvalidPacketException(String.format("Invalid packet ID of packet received - %d", id.getValue()));
        } else {
            return null;
        }
    }

    public static JavaPromise<ICommand, Exception> awaitCommand(IPCAdapter adapter, CommandEnum commandEnum, boolean isSlave) {
        JavaPromise<ICommand, Exception> promise = new JavaPromise<>();
        var ref = new Object() {
            Consumer<byte[]> dataCallback = _ignored -> {
            };
        };
        ref.dataCallback = data -> {
            try {
                ICommand command = parse(commandEnum.getCommandId(), data, isSlave);
                if (command != null) {
                    promise.resolve(command);
                    adapter.getDataEventBus().removeListener(ref.dataCallback);
                }
            } catch (Exception e) {
                try {
                    promise.reject(e);
                    adapter.getDataEventBus().removeListener(ref.dataCallback);
                } catch (PromiseFinishedException ex) {
                    // do nothing
                }
            }
        };
        adapter.getDataEventBus().addListener(ref.dataCallback);
        return promise;
    }
}
