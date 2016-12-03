import CTileColor from "nel/3d/landscape/zone/c_tile_color";
import CTileElement from "nel/3d/landscape/zone/c_tile_element";
import CTileLightInfluence from "nel/3d/landscape/zone/c_tile_light_influence";
import AModel from "nel/io/a_model";
import { CheckVersion } from "nel/io/read_stream";
import { uint8 } from "nel/io/types";
import CArray from "nel/misc/c_array";
import CVector3s from "nel/misc/c_vector_3s";

const VERSION = 7;

/**
 * @class nel.3d.landscape.zone.CPatch
 * @implements nlio.ISerializable
 */
export default class CPatch extends AModel {
}

CPatch.fields = [
    { type: CheckVersion, value: VERSION },
    { type: CArray.template(CVector3s, 4 ), name: "vertices" },
    { type: CArray.template(CVector3s, 8 ), name: "tangents" },
    { type: CArray.template(CVector3s, 4 ), name: "interiors" },
    { type: CArray.template(CTileElement), name: "tiles" },
    { type: CArray.template(CTileColor), name: "tile_colors" },
    { type: uint8, name: "order_s" },
    { type: uint8, name: "order_t" },
    { type: CArray.template(uint8), name: "compressed_lumels" },
    { type: uint8, name: "noise_rotation" },
    { type: uint8, name: "corner_smooth_flag" },
    { type: uint8, name: "flags" },
    { type: CArray.template(CTileLightInfluence), name: "tile_light_influences" }
];
