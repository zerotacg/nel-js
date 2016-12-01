import AModel from "nel/io/a_model";
import { CheckVersion } from "nel/io/read_stream";
import CVector from "nel/misc/c_vector";

const VERSION = 0;

/**
 * @class nlmisc.CAABB
 */
export default class CAABB extends AModel {
}

CAABB.fields = [
    { type: CheckVersion, value: VERSION },
    { type: CVector, name: "center" },
    { type: CVector, name: "half_size" }
];
