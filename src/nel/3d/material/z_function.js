import Enum from "nel/misc/enum";

/**
 * @namespace nl3d.material
 * @enum
 */
var ZFunction = new Enum({
    always: 0,
    never: undefined,
    equal: undefined,
    notequal: undefined,
    less: undefined,
    lessequal: undefined,
    greater: undefined,
    greaterequal: undefined,
    zfuncCount: undefined
});

export default ZFunction;
