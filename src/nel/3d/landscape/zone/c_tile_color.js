import AModel from "nel/io/a_model";
import { uint16 } from "nel/io/types";

/**
 * @class nel.3d.landscape.zone.CTileColor
 * @implements nlio.ISerializable
 */
export default class CTileColor extends AModel {
}

CTileColor.fields = [
    { type: uint16, name: "color_565" }
];
