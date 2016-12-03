import CLandscape from "nel/3d/landscape/c_landscape";

/**
 * @class nel.3d.landscape.CLandscapeModel
 */
export default class CLandscapeModel {

    constructor() {
        /**
         * @type {nel.3d.landscape.CLandscape}
         * @public
         */
        this.landscape = new CLandscape();
    }
}
