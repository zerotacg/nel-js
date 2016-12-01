const VERSION = 0;

/**
 * @class nl3d.landscape.CTileLand
 * @implements {nlio.ISerializable}
 */
export default class CTileLand {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nl3d.landscape.CTileLand}
     */
    static readFrom( stream ) {
        var instance = new CTileLand();
        instance.readFrom( stream );

        return instance;
    }

    static writeTo( stream, instance ) {
        instance.writeTo(stream);
    }

    constructor() {
        this.name = undefined;
        this.tile_sets = [];
    }

    readFrom(stream) {
        stream.readVersion();

        this.name  = stream.readString();
        this.tile_sets = stream.readStringArray();
    }

    writeTo(stream) {
        stream.writeVersion(VERSION);

        stream.writeString( this.name );
        stream.writeStringArray(this.tile_sets);
    }
}
