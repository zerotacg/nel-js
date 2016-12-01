import CTileBank from "nel/3d/landscape/tile/c_tile_bank";
import CTileFarBank from "nel/3d/landscape/tile/c_tile_far_bank";

/**
 * @class nl3d.landscape.CLandscape
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
     * @param {nl3d.material.ZFunction} z_function
     */
    setZFunction() {}

    /**
     * @method
     * @param {nlmisc.CRGBA} diffuse
     * @param {nlmisc.CRGBA} ambient
     * @param {number} multiply
     */
    setupStaticLight() {}

    /**
     * @method
     */
    releaseAllTiles() {}
}
