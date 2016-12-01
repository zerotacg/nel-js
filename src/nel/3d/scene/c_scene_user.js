import CLandscapeUser from "nel/3d/landscape/c_landscape_user";
import CScene from "nel/3d/scene/c_scene";

/**
 * @class nl3d.scene.CSceneUser
 * @implements nl3d.scene.UScene
 */
export default class CSceneUser {

    /**
     * @returns {nl3d.landscape.ULandscape}
     */
    createLandscape() {
        var scene = new CScene();

        return new CLandscapeUser(scene);
    }
}
