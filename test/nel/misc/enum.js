import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.misc.Enum", function () {
    var Enum;

    beforeEach("setup", function ( done ) {
        var imports = [
            "nel/misc/enum"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                Enum = modules[ 0 ].default;
            })
            .then(done, done);
    });

    it("should return an object", function () {
        expectEnum({}).to.be.an("object");
    });

    function expectEnum(definition) {
        return expect(new Enum(definition));
    }

    it("should assign ordinals to undefined values", function () {
        expectEnum({ a: undefined }).to.have.property("a", 0);
    });

    it("should ascend the ordinal by one for undefined values", function () {
        expectEnum({ a: 3, b: undefined }).to.have.property("b", 4);
    });
});

