package me.q13x.workerconcurrency.ipc;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class IPCProtocol {

    public static ReadResult<Integer> readVarInt(byte[] buffer) {
        return IPCProtocol.readVarInt(buffer, 0);
    }
    
    public static ReadResult<Integer> readVarInt(byte[] buffer, int offset) {
        int value = 0;
        int shift = 0;
        int bytesRead = 0;
    
        while (true) {
            byte b = buffer[offset++];
            bytesRead++;
    
            value |= (b & 0x7F) << shift;
            if ((b & 0x80) == 0) {
                break;
            }
            shift += 7;
        }
    
        return new ReadResult<>(value, bytesRead);
    }

    public static byte[] writeVarInt(int number) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    
        while (true) {
            if ((number & ~0x7F) == 0) {
                outputStream.write(number);
                break;
            } else {
                outputStream.write((number & 0x7F) | 0x80);
                number >>>= 7;
            }
        }
    
        return outputStream.toByteArray();
    }

    public static int calculateVarIntSize(int number) {
        int size = 0;

        while (true) {
            if ((number & ~0x7F) == 0) {
                size++;
                break;
            } else {
                size++;
                number >>>= 7;
            }
        }

        return size;
    }

    public static void writeVarLong(long value, OutputStream outputStream) throws IOException {
        while ((value & ~0x7FL) != 0L) {
            outputStream.write((int)(value & 0x7F) | 0x80);
            value >>>= 7;
        }
        outputStream.write((int)value & 0x7F);
    }

    public static ReadResult<Long> readVarLong(byte[] buffer, int offset) {
        long value = 0;
        int shift = 0;

        while (true) {
            byte b = buffer[offset++];
            value |= (long)(b & 0x7F) << shift;
            if ((b & 0x80) == 0) {
                break;
            }
            shift += 7;
        }

        return new ReadResult<>(value, offset - 1);
    }

    public static int calculateVarLongLength(long value) {
        int length = 0;

        do {
            length++;
            value >>>= 7;
        } while (value != 0);

        return length;
    }

    public static ReadResult<String> readString(byte[] buffer, int offset) {
        ReadResult<Integer> lengthResult = IPCProtocol.readVarInt(buffer, offset);
        offset += lengthResult.getReadBytes();
        
        int stringLength = lengthResult.getValue();
        byte[] stringBytes = new byte[stringLength];
        
        System.arraycopy(buffer, offset, stringBytes, 0, stringLength);
        offset += stringLength;

        String string = new String(stringBytes, StandardCharsets.UTF_8);
        
        return new ReadResult<>(string, offset - lengthResult.getReadBytes());
    }

    public static byte[] writeString(String string) {
        try {
            byte[] stringBytes = string.getBytes("utf-8");
            int stringLength = stringBytes.length;

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            outputStream.write(writeVarInt(stringLength));  // Write length data
            outputStream.write(stringBytes);               // Write string data

            return outputStream.toByteArray();
        } catch (IOException err) {
            throw new RuntimeException(err.getMessage());
        }
    }

    public static ReadResult<byte[]> readByteArray(byte[] buffer, int offset) {
        ReadResult<Integer> lengthResult = IPCProtocol.readVarInt(buffer, offset);
        int length = lengthResult.getValue();
        offset += lengthResult.getReadBytes();
        
        byte[] bytes = new byte[length];
        
        for (int location = 0; location < length; location++) {
            bytes[location] = buffer[offset++];
        }
    
        return new ReadResult<>(bytes, lengthResult.getReadBytes() + length);
    }
    
    
    public static byte[] writeByteArray(byte[] byteArray) {
        byte[] lengthBytes = writeVarInt(byteArray.length);
        
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            outputStream.write(lengthBytes);
            outputStream.write(byteArray);
        } catch (IOException err) {
            throw new RuntimeException(err.getMessage());
        }
        
        return outputStream.toByteArray();
    }

    public static ReadResult<Short> readShort(byte[] buffer, int offset) {
        short result = (short) ((buffer[offset] << 8) | (buffer[offset + 1] & 0xFF));
        return new ReadResult<>(result, 2);
    }
    
    public static byte[] writeShort(short value) {
        byte[] bytes = new byte[2];
        bytes[0] = (byte) (value >> 8);
        bytes[1] = (byte) (value & 0xFF);
        return bytes;
    }
    

    public static byte[] concatByteArrays(byte[][] arrays) {
        int totalLength = 0;
        for (byte[] array : arrays) {
            totalLength += array.length;
        }
        
        byte[] newByteArray = new byte[totalLength];
        int offset = 0;
        
        for (byte[] array : arrays) {
            System.arraycopy(array, 0, newByteArray, offset, array.length);
            offset += array.length;
        }
        
        return newByteArray;
    }
    

    public static byte[] writeCommand(short packetId, ICommand command) {
        byte[] commandBytes = command.toBuffer();  // Convert ICommand to byte array
        byte[] packetIdBytes = writeShort(packetId);  // Use the writeShort method
        
        byte[] result = new byte[packetIdBytes.length + commandBytes.length];
        
        // Copy packet ID bytes and command bytes into the result array
        System.arraycopy(packetIdBytes, 0, result, 0, packetIdBytes.length);
        System.arraycopy(commandBytes, 0, result, packetIdBytes.length, commandBytes.length);
        
        return result;
    }
    
    public static ReadResult<Short> readCommandId(byte[] buffer, int offset) {
        ReadResult<Short> shortResult = readShort(buffer, offset);
        return new ReadResult<>(shortResult.getValue(), shortResult.getReadBytes());
    }    

    public static class ReadResult<T extends Object> {
        T result;
        int readBytes;

        public ReadResult(T value, int readBytes) {
            this.result = value;
            this.readBytes = readBytes;
        }

        public T getValue() {
            return result;
        }

        public int getReadBytes() {
            return readBytes;
        }
    }
}
