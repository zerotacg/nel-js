/**
 * @class nlmisc.CArray
 */
export default class CArray {
    static template( type ) {
        var length;
        if ( arguments.length === 2 ) {
            length = arguments[1];
        }

        return new CArray({ length, type });
    }

    constructor( config ) {
        Object.assign(this, config);
    }

    readFrom( stream ) {
        var type = this.type;
        var length = this.length || stream.readSint32();
        console.assert(length >= 0, "length should be positive");
        var values = new Array(length);

        for ( var i = 0; i < length; ++i ) {
            values[ i ] = type.readFrom(stream);
        }

        return values;
    }
}
