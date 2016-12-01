import AModel from "nel/io/a_model";
import { uint16 } from "nel/io/types";
import CArray from "nel/misc/c_array";

/**
 * @class nl3d.landscape.zone.CTileElement
 * @implements nlio.ISerializable
 */
export default class CTileElement extends AModel {
}

CTileElement.fields = [
    { type: uint16, name: "flags" },
    { type: CArray.template(uint16, 3), name: "tile_ids" }
];
