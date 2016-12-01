import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.3d.material.ZFunction", function () {
    var ZFunction;

    beforeEach("setup", function ( done ) {
        var imports = [
            "nel/3d/material/z_function"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                ZFunction = modules[ 0 ].default;
            })
            .then(done, done);
    });

    it("should have a fixed values", function() {
        expect(ZFunction.always).to.equal(0);
        expect(ZFunction.never).to.equal(1);
        expect(ZFunction.equal).to.equal(2);
        expect(ZFunction.notequal).to.equal(3);
        expect(ZFunction.less).to.equal(4);
        expect(ZFunction.lessequal).to.equal(5);
        expect(ZFunction.greater).to.equal(6);
        expect(ZFunction.greaterequal).to.equal(7);
        expect(ZFunction.zfuncCount).to.equal(8);
    });
});
