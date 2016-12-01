import CLandscape from "nel/3d/landscape/c_landscape";

/**
 * @class nl3d.landscape.CLandscapeModel
 */
export default class CLandscapeModel {

    constructor() {
        /**
         * @type {nl3d.landscape.CLandscape}
         * @public
         */
        this.landscape = new CLandscape();
    }
}
