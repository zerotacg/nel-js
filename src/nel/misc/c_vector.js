import AModel from "nel/io/a_model";
import { float } from "nel/io/types";

/**
 * @class nlmisc.CVector
 */
export default class CVector extends AModel {
}

CVector.fields = [
    { type: float, name: "x" },
    { type: float, name: "y" },
    { type: float, name: "z" }
];
