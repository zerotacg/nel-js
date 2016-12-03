import FarOrder from "nel/3d/landscape/tile/far_order";
import FarType from "nel/3d/landscape/tile/far_type";
import CRGBA from "nel/misc/c_rgba";

const VERSION = 0;

/**
 * @class nel.3d.landscape.CTileFar
 * @implements {nlio.ISerializable}
 */
export default class CTileFar {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nel.3d.landscape.CTile}
     */
    static readFrom( stream ) {
        var instance = new CTileFar();
        instance.readFrom( stream );

        return instance;
    }

    /**
     * @param {nlio.IWriteStream} stream
     * @param {nel.3d.landscape.CTile} instance
     */
    static writeTo( stream, instance ) {
        instance.writeTo( stream );
    }

    constructor() {
        this.pixels = this.createTypePixels();
    }

    createTypePixels() {
        var types = new Array(FarType.count);
        types[FarType.diffuse] = this.createOrderPixels();
        types[FarType.additive] = this.createOrderPixels();

        return types;
    }

    createOrderPixels() {
        var orders = new Array(FarOrder.count);
        orders[FarOrder.order0] = [];
        orders[FarOrder.order1] = [];
        orders[FarOrder.order2] = [];

        return orders;
    }

    readFrom(stream) {
        var pixels = this.pixels;
        var diffuse = FarType.diffuse;
        var additive = FarType.additive;
        var order0 = FarOrder.order0;
        var order1 = FarOrder.order1;
        var order2 = FarOrder.order2;

        stream.readVersion();

        pixels[diffuse][order0] = stream.readArray(CRGBA.readFrom);
        pixels[diffuse][order1] = stream.readArray(CRGBA.readFrom);
        pixels[diffuse][order2] = stream.readArray(CRGBA.readFrom);
        pixels[additive][order0] = stream.readArray(CRGBA.readFrom);
        pixels[additive][order1] = stream.readArray(CRGBA.readFrom);
        pixels[additive][order2] = stream.readArray(CRGBA.readFrom);
    }

    writeTo(stream) {
        var pixels = this.pixels;
        var diffuse = FarType.diffuse;
        var additive = FarType.additive;
        var order0 = FarOrder.order0;
        var order1 = FarOrder.order1;
        var order2 = FarOrder.order2;

        stream.writeVersion( VERSION );
        stream.writeArray(pixels[diffuse][order0], CRGBA.writeTo);
        stream.writeArray(pixels[diffuse][order1], CRGBA.writeTo);
        stream.writeArray(pixels[diffuse][order2], CRGBA.writeTo);
        stream.writeArray(pixels[additive][order0], CRGBA.writeTo);
        stream.writeArray(pixels[additive][order1], CRGBA.writeTo);
        stream.writeArray(pixels[additive][order2], CRGBA.writeTo);
    }
}
