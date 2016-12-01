import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.3d.landscape.tile.CTileSet", function () {
    var CTileBorder;
    var CTileSet;

    before("imports", function ( done ) {
        var imports = [
            "nel/3d/landscape/tile/c_tile_border",
            "nel/3d/landscape/tile/c_tile_set"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CTileBorder = modules[ 0 ].default;
                CTileSet = modules[ 1 ].default;
            })
            .then(done)
            .catch(done)
        ;
    });

    describe("#createBorders()", function () {
        var tile_set;

        beforeEach("setup", function () {
            tile_set = new CTileSet();
        });

        it("should return an array", function () {
            expect(tile_set.createBorders()).to.be.an("array");
        });

        it("should create length elements", function () {
            expect(tile_set.createBorders(1)).to.have.length(1);
            expect(tile_set.createBorders(2)).to.have.length(2);
            expect(tile_set.createBorders(3)).to.have.length(3);
        });

        it("should create tile borders", function () {
            var array = tile_set.createBorders(1);
            expect(array[0]).to.be.an.instanceOf(CTileBorder);
        });
    });
});
