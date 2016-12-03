/**
 * @class nel.3d.landscape.CLandscapeUser
 * @implements {nel.3d.landscape.ULandscape}
 */
export default class CLandscapeUser {

    /**
     * @constructor
     * @param {nel.3d.scene.CScene} scene
     */
    constructor( scene ) {
        console.assert(scene);

        /**
         * @type {nel.3d.scene.CScene}
         * @private
         */
        this._scene = scene;
        /**
         * @type {nel.3d.landscape.CLandscapeModel}
         * @private
         */
        this._model = scene.createLandscapeModel();
    }

    /**
     * @override
     */
    setThreshold( threshold ) {
        this._model.landscape.setThreshold(threshold);
    }

    /**
     * @override
     */
    setZFunction( z_function ) {
        this._model.landscape.setZFunction(z_function);
    }

    /**
     * @override
     */
    setupStaticLight( diffuse, ambient, multiply ) {
        this._model.landscape.setupStaticLight(diffuse, ambient, multiply);
    }

    /**
     * @override
     * @param {string} tile_bank_filename
     * @param {string} far_bank_filename
     */
    loadBankFiles( tile_bank_filename, far_bank_filename ) {
        var path = this.path;
        var landscape = this._model.landscape;
        var tile_bank = landscape.tile_bank;
        var tile_bank_file = path.lookup(tile_bank_filename);
        var tile_far_bank = landscape.tile_far_bank;
        var tile_far_bank_file = path.lookup(far_bank_filename);

        landscape.releaseAllTiles();

        tile_bank.clear();
        tile_bank.readFrom(tile_bank_file);
        tile_bank.makeAllPathsRelative();
        tile_bank.makeAllExtensionsDDS();
        tile_bank.setAbsPath("");

        tile_far_bank.readFrom(tile_far_bank_file);
        tile_bank_file.close();
        tile_far_bank_file.close();
    }
}
