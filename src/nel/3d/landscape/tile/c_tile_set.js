import Bitmap from "nel/3d/landscape/tile/bitmap";
import CTileBorder from "nel/3d/landscape/tile/c_tile_border";
import CTileSetTransition from "nel/3d/landscape/tile/c_tile_set_transition";
import Displacement from "nel/3d/landscape/tile/displacement";
import Transition from "nel/3d/landscape/tile/transition";

const VERSION = 5;

/**
 * @class nl3d.landscape.CTileSet
 * @implements {nlio.ISerializable}
 */
export default class CTileSet {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nl3d.landscape.CTileSet}
     */
    static readFrom( stream ) {
        var instance = new CTileSet();
        instance.readFrom( stream );

        return instance;
    }

    static writeTo( stream, instance ) {
        instance.writeTo(stream);
    }

    constructor() {
        this.surcface_data = undefined;
        this.oriented = undefined;
        this.tile_vegetable_desc_filename = undefined;
        this.displacement_bitmaps = new Array(Displacement.count);
        this.name = undefined;
        this.tile_transitions = this.createTileTransitions();
        this.borders_128 = this.createBorders(2);
        this.borders_256 = this.createBorders(2);
        this.border_transitions = this.createBorderTransitions();
    }

    createTileTransitions() {
        var array = new Array(Transition.count);
        for( var i = 0; i < Transition.count; ++i) {
            array[i] = new CTileSetTransition();
        }
        return array;
    }

    createBorderTransitions() {
        var length = Transition.count;
        var array = new Array(length);
        for( var i = 0; i < length; ++i) {
            array[i] = this.createBorders(Bitmap.count);
        }
        return array;
    }

    createBorders(length) {
        var array = new Array(length);
        for( var i = 0; i < length; ++i ) {
            array[i] = new CTileBorder();
        }

        return array;
    }

    readFrom(stream) {
        stream.readCheckVersion(VERSION);

        this.surcface_data = stream.readUint32();
        this.oriented = stream.readBool();
        this.tile_vegetable_desc_filename = stream.readString();
        this.readDisplacementBitmapsFrom(stream);

        this.name = stream.readString();
        this.tiles_128 = stream.readArray( stream.readSint32 );
        this.tiles_256 = stream.readArray( stream.readSint32 );

        this.readTileTransitionsFrom(stream);

        this.child_names = stream.readStringArray();

        stream.read(this.borders_128[Bitmap.diffuse]);
        stream.read(this.borders_128[Bitmap.additive]);

        stream.read(this.borders_256[Bitmap.diffuse]);
        stream.read(this.borders_256[Bitmap.additive]);

        this.readBorderTransitionsFrom(stream);
    }

    readDisplacementBitmapsFrom( stream ) {
        var displacements = this.displacement_bitmaps;

        for (var displace = Displacement.first; displace < Displacement.count; ++displace) {
            displacements[displace] = stream.readUint32();
        }
    }

    readTileTransitionsFrom( stream ) {
        var transitions = this.tile_transitions;

        this.readTransitions(transitions, stream);
    }

    readTransitions( transitions, stream ) {
        for ( var i = 0; i < Transition.count; ++i ) {
            stream.read(transitions[ i ]);
        }
    }

    readBorderTransitionsFrom( stream ) {
        var border_transitions = this.border_transitions;
        var length = Transition.count;
        for( var i = 0; i < length; ++i ) {
            stream.read(border_transitions[i][Bitmap.diffuse]);
            stream.read(border_transitions[i][Bitmap.additive]);
            stream.read(border_transitions[i][Bitmap.alpha]);
        }
    }

    writeTo(stream) {
        stream.writeVersion(VERSION);
    }
}
