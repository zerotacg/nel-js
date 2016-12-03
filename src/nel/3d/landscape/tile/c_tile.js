import Bitmap from "nel/3d/landscape/tile/bitmap";
import Enum from "nel/misc/enum";

/**
 * @namespace nel.3d.landscape
 * @enum
 */
var Flags = new Enum({
    FREE: 0x80000000
});

const VERSION = 4;

/**
 * @class nel.3d.landscape.CTile
 * @implements {nlio.ISerializable}
 */
export default class CTile {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nel.3d.landscape.CTile}
     */
    static readFrom( stream ) {
        var instance = new CTile();
        instance.readFrom( stream );

        return instance;
    }

    static writeTo( stream, instance ) {
        instance.writeTo(stream);
    }

    constructor() {
        this.flags = Flags.FREE;
        this.bitmap_names = new Array(Bitmap.count);
    }

    readFrom(stream) {
        stream.readCheckVersion(VERSION);

        this.flags = stream.readUint32();
        this.bitmap_names[Bitmap.diffuse] = stream.readString();
        this.bitmap_names[Bitmap.additive] = stream.readString();
        this.bitmap_names[Bitmap.alpha] = stream.readString();
    }

    writeTo(stream) {
        stream.writeVersion(VERSION);
    }
}
