package me.q13x.workerconcurrency;

import me.q13x.workerconcurrency.commons.WrappedWorkerState;
import me.q13x.workerconcurrency.ipc.commands.MSCleanupCommand;
import me.q13x.workerconcurrency.ipc.commands.SMFinishedCommand;
import me.q13x.workerconcurrency.ipc.commands.init.MSIntentCommand;
import me.q13x.workerconcurrency.ipc.commands.init.SMReadyCommand;

import java.util.concurrent.Callable;
import java.util.function.BiConsumer;

import me.q13x.workerconcurrency.ipc.CommandContext;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.commands.MSPingCommand;
import me.q13x.workerconcurrency.ipc.commands.SMPongCommand;
import me.q13x.workerconcurrency.platform.browser.js.workerglobals.DedicatedWorkerGlobalScope;

/**
 * This Java class contains a list of valid cross-worker IPC commands.
 * ONLY add callbacks for setting default behavior!
 */
public enum CommandEnum {
    MS_INTENT((short) -2, true, MSIntentCommand.class, (packet, context) -> {}, () -> new MSIntentCommand()),
    SM_READY((short) -1, false, SMReadyCommand.class, (packet, context) -> {}, () -> new SMReadyCommand()),
    MS_PING((short) 0, true, MSPingCommand.class, (packet, context) -> {}, () -> new MSPingCommand()),
    SM_PONG((short) 1, false, SMPongCommand.class, (packet, context) -> {}, () -> new SMPongCommand()),
    MS_CLEANUP((short) 2, true, MSCleanupCommand.class, (packet, context) -> {
        if (context.getEnvironmentType() == CommandContext.EnvironmentType.SLAVE) {
            // TODO: cleanup code here
            context.getRemoteManager().getAdapter().writeCommand(new SMFinishedCommand());
            DedicatedWorkerGlobalScope.get().close();
        }
    }, () -> new MSCleanupCommand()),
    SM_FINISHED((short) 3, false, SMFinishedCommand.class, (packet, context) -> {
        if (context.getEnvironmentType() == CommandContext.EnvironmentType.MANAGER) {
            RemoteWorkerSlave worker = context.getRemoteSlave();
            worker.setState(WrappedWorkerState.STOPPED);
        }
    }, () -> new SMFinishedCommand());


    private short id;
    private boolean boundToSlave;
    private Class<? extends ICommand> commandClass;
    private Callable<ICommand> constructor;
    private BiConsumer<ICommand, CommandContext> commandCallback;

    CommandEnum(short id, boolean boundToSlave, Class<? extends ICommand> commandClass, BiConsumer<ICommand, CommandContext> commandCallback, Callable<ICommand> constructor) {
        this.id = id;
        this.boundToSlave = boundToSlave;
        this.commandClass = commandClass;
        this.constructor = constructor;
        this.commandCallback = commandCallback;
    }

    public short getCommandId() {
        return this.id;
    }

    public boolean isBoundToSlave() {
        return this.boundToSlave;
    }

    public ICommand getCommandClassInstance() throws Exception {
        return constructor.call();
    }

    public Class<? extends ICommand> getCommandClass() {
        return this.commandClass;
    }

    public BiConsumer<ICommand, CommandContext> getCommandCallback() {
        return this.commandCallback;
    }
}
