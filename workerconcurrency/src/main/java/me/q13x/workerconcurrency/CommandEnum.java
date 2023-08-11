package me.q13x.workerconcurrency;

import org.teavm.jso.browser.Window;

import java.util.function.BiConsumer;
import java.util.function.Consumer;

import me.q13x.workerconcurrency.ipc.CommandContext;
import me.q13x.workerconcurrency.ipc.commands.ICommand;
import me.q13x.workerconcurrency.ipc.commands.MSPingCommand;
import me.q13x.workerconcurrency.ipc.commands.SMPongCommand;

public enum CommandEnum {
    MS_PING((short) 0, true, MSPingCommand.class, (packet, context) -> {
        if (context.getEnvironmentType() == CommandContext.EnvironmentType.SLAVE) {
            new SMPongCommand(((MSPingCommand) packet).getRequestId())
                .write(context.getIPCAdapter());
        }
    }),
    SM_PONG((short) 1, false, SMPongCommand.class, (packet, context) -> {
        if (context.getEnvironmentType() == CommandContext.EnvironmentType.MASTER) {
            Window.alert("Received pong from worker!");
            Window.setTimeout(() -> {
                new MSPingCommand(((SMPongCommand) packet).getRequestId())
                    .write(context.getIPCAdapter());
            }, 10000);
        }
    });

    short id;
    boolean boundToSlave;
    Class<? extends ICommand> packetClass;
    BiConsumer<ICommand, CommandContext> packetCallback;

    CommandEnum(short id, boolean boundToSlave, Class<? extends ICommand> packetClass, BiConsumer<ICommand, CommandContext> packetCallback) {
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

    public BiConsumer<ICommand, CommandContext> getPacketCallback() {
        return this.packetCallback;
    }
}
