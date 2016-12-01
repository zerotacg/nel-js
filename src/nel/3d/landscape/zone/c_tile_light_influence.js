import AModel from "nel/io/a_model";
import { uint8 } from "nel/io/types";
import CArray from "nel/misc/c_array";

/**
 * @class nl3d.landscape.zone.CTileLightInfluence
 * @implements nlio.ISerializable
 */
export default class CTileLightInfluence extends AModel {
}

CTileLightInfluence.fields = [
    { type: CArray.template(uint8, 2), name: "light" },
    { type: uint8, name: "packed_light_factor" }
];
