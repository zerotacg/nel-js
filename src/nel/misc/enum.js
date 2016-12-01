/**
 * @function nlmisc.Enum
 * @param {object} definition
 */
export default class Enum {
    constructor( definition ) {
        var ordinal = 0;

        var keys = Object.keys(definition);
        keys.reduce(( entries, key ) => {
            var value = definition[ key ];
            if ( value === undefined ) {
                value = ordinal;
            }

            entries[ key ] = value;
            ordinal = value + 1;

            return entries;
        }, this);

        Object.freeze(this);
    }
}
