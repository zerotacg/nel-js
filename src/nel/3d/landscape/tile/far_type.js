import Enum from "nel/misc/enum";

/**
 * @namespace nl3d.landscape
 * @enum
 */
var FarType = new Enum({
    diffuse: 0,
    additive: 1,
    alpha: 2,
    count: 2
});

export default FarType;
