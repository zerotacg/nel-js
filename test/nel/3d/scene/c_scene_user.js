import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.3d.scene.CSceneUser", function () {
    var CLandscapeUser;
    var CSceneUser;

    beforeEach("setup", function ( done ) {
        var imports = [
            "nel/3d/landscape/c_landscape_user",
            "nel/3d/scene/c_scene_user"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CLandscapeUser = modules[ 0 ].default;
                CSceneUser = modules[ 1 ].default;
            })
            .then(done, done);
    });

    it("should response to createLandscape", function () {
        var scene = new CSceneUser();

        expect(scene).to.respondsTo("createLandscape");
    });

    describe("#createLandscape()", function () {
        var scene;

        beforeEach("setup", function () {
            scene = new CSceneUser();
        });

        it("should return a landscape", function () {
            var landscape = scene.createLandscape();

            expect(landscape).to.be.an.instanceOf(CLandscapeUser);
        });
    });
});
