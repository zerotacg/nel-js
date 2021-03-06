import { MAX_SINGLE_BYTE_VERSION, VersionError } from "nel/io/stream";

export class CheckVersion {
    static readFrom( stream, config ) {
        return stream.readCheckVersion(config.value);
    }
}

export class CheckChars {
    static readFrom( stream, config ) {
        return stream.readCheckChars(config.value);
    }
}

/**
 * @class nlio.CReadStream
 * @implements {nlio.IReadStream}
 */
export default class CReadStream {
    /**
     * @param {nlio.CBuffer} buffer
     */
    constructor( buffer ) {
        this.buffer = buffer;
        this.pos = 0;
        this.littleEndian = true;
    }

    /**
     * @param {nlio.IReadable} readable
     */
    read( readable ) {
        return readable.readFrom(this);
    }

    readUint8() {
        return this.buffer.getUint8(this.pos++);
    }

    readSint8() {
        return this.buffer.getSint8(this.pos++);
    }

    readUint16() {
        var value = this.buffer.getUint16(this.pos, this.littleEndian);
        this.pos += 2;

        return value;
    }

    readSint16() {
        var value = this.buffer.getSint16(this.pos, this.littleEndian);
        this.pos += 2;

        return value;
    }

    readUint32() {
        var value = this.buffer.getUint32(this.pos, this.littleEndian);
        this.pos += 4;

        return value;
    }

    readSint32() {
        var value = this.buffer.getSint32(this.pos, this.littleEndian);
        this.pos += 4;

        return value;
    }

    readFloat() {
        var value = this.buffer.getFloat(this.pos, this.littleEndian);
        this.pos += 4;

        return value;
    }

    readBool() {
        return this.readBit();
    }

    readBit() {
        var value = this.readUint8();

        return !!value;
    }

    readBuffer( length ) {
        var value = this.buffer.get(this.pos, length);
        this.pos += length;

        return value;
    }

    readString() {
        var length = this.readUint32();

        return this.readChars(length);
    }

    readChars( length ) {
        var buffer = this.readBuffer(length);

        return String.fromCharCode.apply(null, buffer);
    }

    readCheckString( expected ) {
        var actual = this.readString();

        this.readCheck(expected, actual);
    }

    readCheck( expected, actual ) {
        if ( expected !== actual ) {
            var message = `Invalid data format, expected to read "${expected}" but got "${actual}"`;

            throw new TypeError(message);
        }
    }

    readCheckChars( expected ) {
        var actual = this.readChars(expected.length);

        this.readCheck(expected, actual);
    }

    readVersion() {
        var version = this.readUint8();

        if ( version === MAX_SINGLE_BYTE_VERSION ) {
            version = this.readUint32();
        }

        return version;
    }

    readCheckVersion( expected ) {
        var actual = this.readVersion();
        if ( expected !== actual ) {
            throw new VersionError(expected, actual);
        }
    }

    readArray( readElement ) {
        var length = this.readSint32();
        var value = new Array(length);

        for ( var i = 0; i < length; ++i ) {
            value[ i ] = readElement.call(this, this);
        }

        return value;
    }

    readStringArray() {
        return this.readArray(this.readString);
    }
}
