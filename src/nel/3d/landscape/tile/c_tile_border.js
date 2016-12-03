import Border from "nel/3d/landscape/tile/border";
import CRGBA from "nel/misc/c_rgba";

const VERSION = 0;

/**
 * @class nel.3d.landscape.CTileBorder
 * @implements {nlio.ISerializable}
 */
export default class CTileBorder {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nel.3d.landscape.CTileBorder}
     */
    static readFrom( stream ) {
        var instance = new CTileBorder();
        instance.readFrom(stream);

        return instance;
    }

    static writeTo( stream, instance ) {
        instance.writeTo(stream);
    }

    constructor() {
        this.set = false;
        this.width = undefined;
        this.height = undefined;
        this.borders = this.createBorders();
    }

    createBorders() {
        var borders = [];
        for ( var i = 0; i < Border.count; ++i ) {
            borders[i] = [];
        }

        return borders;
    }

    readFrom( stream ) {
        stream.readCheckVersion(VERSION);

        this.set = stream.readBool();
        this.width = stream.readSint32();
        this.height = stream.readSint32();
        this.borders[Border.top] = stream.readArray(CRGBA.readFrom);
        this.borders[Border.bottom] = stream.readArray(CRGBA.readFrom);
        this.borders[Border.left] = stream.readArray(CRGBA.readFrom);
        this.borders[Border.right] = stream.readArray(CRGBA.readFrom);
    }

    writeTo( stream ) {
        stream.writeVersion(VERSION);
    }
}
