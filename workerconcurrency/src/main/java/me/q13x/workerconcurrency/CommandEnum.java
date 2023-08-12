package me.q13x.workerconcurrency;

import me.q13x.workerconcurrency.ipc.commands.init.SMReadyCommand;
import org.teavm.jso.browser.Window;

import java.util.function.BiConsumer;

import me.q13x.workerconcurrency.ipc.CommandContext;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.commands.MSPingCommand;
import me.q13x.workerconcurrency.ipc.commands.SMPongCommand;

/**
 * This Java class contains a list of valid cross-worker IPC commands.
 */
public enum CommandEnum {
    SM_READY((short) -1, false, SMReadyCommand.class, (packet, context) -> {
        // TODO: implement code
    }),
    MS_PING((short) 0, true, MSPingCommand.class, (packet, context) -> {
        if (context.getEnvironmentType() == CommandContext.EnvironmentType.SLAVE) {
            context.getIPCAdapter().write(new SMPongCommand(((MSPingCommand) packet).getRequestId()).toBuffer());
        }
    }),
    SM_PONG((short) 1, false, SMPongCommand.class, (packet, context) -> {
        if (context.getEnvironmentType() == CommandContext.EnvironmentType.MANAGER) {
            Window.alert("Received pong from worker!");
            Window.setTimeout(() -> {
                context.getIPCAdapter().write(new MSPingCommand(((SMPongCommand) packet).getRequestId()).toBuffer());
            }, 10000);
        }
    });

    private short id;
    private boolean boundToSlave;
    private Class<? extends ICommand> commandClass;
    private BiConsumer<ICommand, CommandContext> commandCallback;

    CommandEnum(short id, boolean boundToSlave, Class<? extends ICommand> commandClass, BiConsumer<ICommand, CommandContext> commandCallback) {
        this.id = id;
        this.boundToSlave = boundToSlave;
        this.commandClass = commandClass;
        this.commandCallback = commandCallback;
    }

    public short getCommandId() {
        return this.id;
    }

    public boolean isBoundToSlave() {
        return this.boundToSlave;
    }

    public ICommand getCommandClassInstance() throws InstantiationException, IllegalAccessException {
        return this.commandClass.newInstance();
    }

    public Class<? extends ICommand> getCommandClass() {
        return this.commandClass;
    }

    public BiConsumer<ICommand, CommandContext> getCommandCallback() {
        return this.commandCallback;
    }
}
