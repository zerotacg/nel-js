const VERSION = 1;

/**
 * @class nl3d.landscape.CTileSetTransition
 * @implements {nlio.ISerializable}
 */
export default class CTileSetTransition {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nl3d.landscape.CTileSetTransition}
     */
    static readFrom( stream ) {
        var instance = new CTileSetTransition();
        instance.readFrom(stream);

        return instance;
    }

    static writeTo( stream, instance ) {
        instance.writeTo(stream);
    }

    constructor() {
        this.tile = undefined;
    }

    readFrom( stream ) {
        stream.readCheckVersion(VERSION);

        this.tile = stream.readSint32();
    }

    writeTo( stream ) {
        stream.writeVersion(VERSION);
        stream.writeSint32(this.tile);
    }
}
