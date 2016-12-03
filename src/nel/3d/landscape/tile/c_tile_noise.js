import CTileNoiseMap from "nel/3d/landscape/tile/c_tile_noise_map";

const EMPTY_DISPLACEMENT_MAP = "EmptyDisplacementMap";

const VERSION = 0;

/**
 * @class nel.3d.landscape.CTileNoise
 * @implements {nlio.ISerializable}
 */
export default class CTileNoise {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nel.3d.landscape.CTileNoise}
     */
    static readFrom( stream ) {
        var instance = new CTileNoise();
        instance.readFrom( stream );

        return instance;
    }

    constructor() {
        this.tile_noise_map = CTileNoiseMap.BLANK;
        this.filename = EMPTY_DISPLACEMENT_MAP;
    }

    readFrom(stream) {
        stream.readVersion();

        this.filename = stream.readString();
    }

    writeTo(stream) {
        stream.writeVersion( VERSION );
        stream.writeString( this.filename );
    }
}

export const BLANK = new CTileNoise();
Object.freeze(BLANK);

CTileNoise.BLANK = BLANK;
