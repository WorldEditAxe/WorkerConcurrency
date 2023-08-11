package me.q13x.workerconcurrency;

import java.util.function.BiConsumer;
import java.util.function.Consumer;

import me.q13x.workerconcurrency.ipc.CommandContext;
import me.q13x.workerconcurrency.ipc.commands.ICommand;
import me.q13x.workerconcurrency.ipc.commands.MSPingCommand;
import me.q13x.workerconcurrency.ipc.commands.SMPongCommand;

public enum CommandEnum {
    /*
    MS_PING((short) 0, true, MSPingCommand.class, (packet, context) -> {
        
    }),
    */
    SM_PONG((short) 1, false, SMPongCommand.class, (packet, context) -> {
        // TODO: implement
    });

    short id;
    boolean boundToSlave;
    Class<? extends ICommand> packetClass;
    BiConsumer<Class<? extends ICommand>, CommandContext> packetCallback;

    CommandEnum(short id, boolean boundToSlave, Class<? extends ICommand> packetClass, BiConsumer<Class<? extends ICommand>, CommandContext> packetCallback) {
        this.id = id;
        this.boundToSlave = boundToSlave;
        this.packetClass = packetClass;
        this.packetCallback = packetCallback;
    }

    public short getCommandId() {
        return this.id;
    }

    public boolean isBoundToSlave() {
        return this.boundToSlave;
    }

    public Class<? extends ICommand> getPacketClass() {
        return this.packetClass;
    }

    public BiConsumer<Class<? extends ICommand>, CommandContext> getPacketCallback() {
        return this.packetCallback;
    }
}
