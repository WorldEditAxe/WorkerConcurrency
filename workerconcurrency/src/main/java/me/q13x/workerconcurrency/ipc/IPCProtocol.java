package me.q13x.workerconcurrency.ipc;

import java.io.UnsupportedEncodingException;

import me.q13x.workerconcurrency.ipc.commands.ICommand;
import me.q13x.workerconcurrency.wrappers.IPCAdapter;

public class IPCProtocol {
    public static byte CONTINUE_BIT = (byte) (1 << 7);
    
    public static int readVarInt(IPCAdapter adapter) {
        int value = 0;
        int shift = 0;
        byte currentByte;

        do {
            currentByte = adapter.nextByte();
            int maskedValue = currentByte & 0x7F; // Mask out the sign bit
            value |= (maskedValue << shift);
            shift += 7;
        } while ((currentByte & CONTINUE_BIT) != 0);

        return value;
    }

    public static void writeVarInt(IPCAdapter adapter, int value) {
        do {
            byte currentByte = (byte) (value & 0x7F); // Mask the lowest 7 bits
            value >>>= 7; // Shift 7 bits to the right
            if (value != 0) {
                currentByte |= CONTINUE_BIT; // Set the continuation bit if there are more bytes
            }
            adapter.write(new byte[] { currentByte }); // Write the byte to the adapter
        } while (value != 0);
    }

    public static String readString(IPCAdapter adapter) {
        int length = IPCProtocol.readVarInt(adapter);
        String string = "";

        while (string.length() < length) {
            string += adapter.nextByte();
        }

        return string;
    }

    public static void writeString(IPCAdapter adapter, String string) {
        IPCProtocol.writeVarInt(adapter, string.length());
        try {
            adapter.write(string.getBytes("utf-8"));
        } catch (UnsupportedEncodingException err) {
            throw new RuntimeException(err.getMessage());
        }
    }

    public static byte[] readByteArray(IPCAdapter adapter) {
        int length = IPCProtocol.readVarInt(adapter);
        byte[] bytes = new byte[length];
        
        for (int location = 0; location < length; location++) {
            bytes[location] = adapter.nextByte();
        }

        return bytes;
    }

    public static void writeByteArray(IPCAdapter adapter, byte[] byteArray) {
        IPCProtocol.writeVarInt(adapter, byteArray.length);
        adapter.write(byteArray);
    }

    public static byte[] concatByteArrays(byte[][] arrays) {
        byte[] newByteArray = new byte[0];
        for (byte[] byteArray : arrays) {
            byte[] oldByteArray = newByteArray;
            int offset = oldByteArray.length;
            newByteArray = new byte[newByteArray.length + byteArray.length];

            for (int i = 0; i < oldByteArray.length; i++) {
                newByteArray[i] = oldByteArray[i];
            }
            for (int i = offset; i < byteArray.length; i++) {
                newByteArray[i] = oldByteArray[i - offset];
            }
        }
        return newByteArray;
    }

    public static IPCAdapter writeCommand(short packetId, ICommand command, IPCAdapter adapter) {
        IPCProtocol.writeVarInt(adapter, packetId);
        command.write(adapter);
        return adapter;
    }
}
