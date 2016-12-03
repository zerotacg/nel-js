import CTileBank from "nel/3d/landscape/tile/c_tile_bank";
import CTileFarBank from "nel/3d/landscape/tile/c_tile_far_bank";

/**
 * @class nel.3d.landscape.CLandscape
 */
export default class CLandscape {
    constructor() {
        this.tile_bank = new CTileBank();
        this.tile_far_bank = new CTileFarBank();
    }

    /**
     * @method
     * @param {number} threshold
     */
    setThreshold() {}

    /**
     * @method
     * @param {nel.3d.material.ZFunction} z_function
     */
    setZFunction() {}

    /**
     * @method
     * @param {nel.misc.CRGBA} diffuse
     * @param {nel.misc.CRGBA} ambient
     * @param {number} multiply
     */
    setupStaticLight() {}

    /**
     * @method
     */
    releaseAllTiles() {}
}
