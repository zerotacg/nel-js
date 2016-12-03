import CLandscapeUser from "nel/3d/landscape/c_landscape_user";
import CScene from "nel/3d/scene/c_scene";

/**
 * @class nel.3d.scene.CSceneUser
 * @implements nel.3d.scene.UScene
 */
export default class CSceneUser {

    /**
     * @returns {nel.3d.landscape.ULandscape}
     */
    createLandscape() {
        var scene = new CScene();

        return new CLandscapeUser(scene);
    }
}
