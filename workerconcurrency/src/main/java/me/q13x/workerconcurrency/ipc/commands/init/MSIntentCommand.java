package me.q13x.workerconcurrency.ipc.commands.init;

import me.q13x.workerconcurrency.CommandEnum;
import me.q13x.workerconcurrency.ipc.ICommand;
import me.q13x.workerconcurrency.ipc.IPCProtocol;

public class MSIntentCommand implements ICommand {
    protected String intent;

    public MSIntentCommand(String intent) {
        this.intent = intent;
    }

    public MSIntentCommand() {}

    public String getIntent() {
        return intent;
    }

    public MSIntentCommand setIntent(String intent) {
        this.intent = intent;
        return this;
    }

    @Override
    public CommandEnum getCommandEnum() {
        return CommandEnum.MS_INTENT;
    }

    @Override
    public ICommand read(byte[] buffer, int offset) {
        this.intent = IPCProtocol.readString(buffer, offset).getValue();
        return this;
    }

    @Override
    public byte[] toBuffer() {
        return IPCProtocol.writeString(intent);
    }
}
