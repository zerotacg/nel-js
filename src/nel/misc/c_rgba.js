import AModel from "nel/io/a_model";
import { uint8 } from "nel/io/types";

/**
 * @class nlmisc.CRGBA
 * @implements nlio.ISerializable
 */
export default class CRGBA extends AModel {
}

CRGBA.fields = [
    { type: uint8, name: "r" },
    { type: uint8, name: "g" },
    { type: uint8, name: "b" },
    { type: uint8, name: "a" }
];
