import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.3d.landscape.zone.CSearch", function () {
    var CSearch;

    before("imports", function ( done ) {
        var imports = [
            "nel/3d/landscape/zone/c_search"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CSearch = modules[ 0 ].default;
            })
            .then(done)
            .catch(done)
        ;
    });

    beforeEach("setup", function () {
    });

    describe(".getName()", function () {
        it("should return a string", function () {
            expectName(0x0000).to.equal("1_AA.zonel");
            expectName(0x0100).to.equal("2_AA.zonel");
            expectName(0xfe00).to.equal("255_AA.zonel");
            expectName(0xff00).to.equal("256_AA.zonel");
            expectName(0xfffff).to.equal("256_JV.zonel");
            expectName(0x0001).to.equal("1_AB.zonel");
            expectName(0x0002).to.equal("1_AC.zonel");
            expectName(0x0019).to.equal("1_AZ.zonel");
            expectName(0x001A).to.equal("1_BA.zonel");
            expectName(0x0101).to.equal("2_AB.zonel");
            expectName(0x0202).to.equal("3_AC.zonel");
            expectName(0xffff).to.equal("256_JV.zonel");
        });

        function expectName( zoneId ) {
            return expect(CSearch.getName(zoneId));
        }
    });
});
