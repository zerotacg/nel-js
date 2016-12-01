import CBorderVertex from "nel/3d/landscape/zone/c_border_vertex";
import CPatch from "nel/3d/landscape/zone/c_patch";
import AModel from "nel/io/a_model";
import { CheckVersion } from "nel/io/read_stream";
import { CheckChars } from "nel/io/read_stream";
import { uint16 } from "nel/io/types";
import { sint32 } from "nel/io/types";
import { float } from "nel/io/types";
import CAABB from "nel/misc/c_aabb";
import CArray from "nel/misc/c_array";
import CVector from "nel/misc/c_vector";

const VERSION = 4;
const HEADER = "ZONE";

/**
 * @class nl3d.landscape.zone.CZone
 * @implements nlio.ISerializable
 */
export default class CZone extends AModel {
}

CZone.fields = [
    { type: CheckVersion, value: VERSION },
    { type: CheckChars, value: HEADER },
    { type: uint16, name: "id" },
    { type: CAABB, name: "bounding_box" },
    { type: CVector, name: "patch_bias" },
    { type: float, name: "patch_scale" },
    { type: sint32, name: "num_vertices" },
    { type: CArray.template(CBorderVertex), name: "border_vertices" },
    { type: CArray.template(CPatch), name: "patches" },
    //{ type: Array.template(CPatchConnect), name: "patch_connects" },
    //{ type: CPointLightNamedArray, name: "point_lights" }
];

//f.xmlSerial (ZoneId, "ZONE_ID");
//f.xmlSerial (ZoneBB, "BB");
//f.xmlSerial (PatchBias, "PATCH_BIAS");
//f.xmlSerial (PatchScale, "PATCH_SCALE");
//f.xmlSerial (NumVertices, "NUM_VERTICES");
//
//f.serialCont(BorderVertices);
//
//f.serialCont(Patchs);
//
//f.serialCont(PatchConnects);
//
//
//f.serial(_PointLightArray);
//_PatchRenderClipped.resize((uint)Patchs.size());
//_PatchOldRenderClipped.resize((uint)Patchs.size());
//_PatchRenderClipped.setAll();
//_PatchOldRenderClipped.setAll();
