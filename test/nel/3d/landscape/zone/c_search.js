import {expect} from "chai";
import jspm from "jspm";

const System = jspm.Loader();

describe("nel.3d.landscape.zone.CSearch", function () {
    let CSearch;

    before("imports", function ( done ) {
        let imports = [
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
        [
            { zoneId: 0x0000, zoneFileName: "1_AA.zonel" },
            { zoneId: 0x0100, zoneFileName: "2_AA.zonel" },
            { zoneId: 0xfe00, zoneFileName: "255_AA.zonel" },
            { zoneId: 0xff00, zoneFileName: "256_AA.zonel" },
            { zoneId: 0xfffff, zoneFileName: "256_JV.zonel" },
            { zoneId: 0x0001, zoneFileName: "1_AB.zonel" },
            { zoneId: 0x0002, zoneFileName: "1_AC.zonel" },
            { zoneId: 0x0019, zoneFileName: "1_AZ.zonel" },
            { zoneId: 0x001A, zoneFileName: "1_BA.zonel" },
            { zoneId: 0x0101, zoneFileName: "2_AB.zonel" },
            { zoneId: 0x0202, zoneFileName: "3_AC.zonel" },
            { zoneId: 0xffff, zoneFileName: "256_JV.zonel" }
        ]
            .forEach(( { zoneId, zoneFileName } ) => {
                it(`should return ${zoneFileName}`, function () {
                    expect(CSearch.getName(zoneId)).to.equal(zoneFileName);
                });
            });
    });

    describe.only(".getIds", function () {
        [
            { x: 0, y: 0, sizeArea: 0, ids: [ 0 ] },
            { x: 159, y: 0, sizeArea: 0, ids: [ 0x0000 ] },
            { x: 160, y: 0, sizeArea: 0, ids: [ 0x0001 ] },
            { x: 160*0xff, y: 0, sizeArea: 0, ids: [ 0x00ff ] },
            { x: 160*0xff + 159, y: 0, sizeArea: 0, ids: [ 0x00ff ] },
            { x: 160*0xff + 159, y: 0, sizeArea: 1, ids: [ 0x00ff ] },
            { x: 160*0xff + 159, y: 0, sizeArea: 159, ids: [ 0x00ff ] },
            { x: 160*0xff + 159, y: 0, sizeArea: 160, ids: [ 0x00fe, 0x00ff,
                                                             0x01fe, 0x01ff] },
            { x: 0, y: 159, sizeArea: 0, ids: [ 0x0000 ] },
            { x: 0, y: 160, sizeArea: 0, ids: [ 0x0100 ] },
            { x: 0, y: 160*0xff, sizeArea: 0, ids: [ 0xff00 ] },
            { x: 0, y: 160*0xff + 159, sizeArea: 0, ids: [ 0xff00 ] },
            { x: 0, y: 160*0xff + 159, sizeArea: 1, ids: [ 0xff00 ] },
            { x: 0, y: 160*0xff + 159, sizeArea: 159, ids: [ 0xff00 ] },
            { x: 0, y: 160*0xff + 159, sizeArea: 160, ids: [ 0xfe00, 0xfe01,
                                                             0xff00, 0xff01 ] },
            { x: 0, y: 0, sizeArea: 159, ids: [ 0 ] },
            { x: 0, y: 0, sizeArea: 160, ids: [ 0x0000, 0x0001,
                                                0x0100, 0x0101 ] },
            { x: 320, y: 320, sizeArea: 80, ids: [ 0x0101, 0x0102,
                                                   0x0201, 0x0202 ] },
            { x: 240, y: 240, sizeArea: 0, ids: [ 0x0101 ] },
            { x: 240, y: 240, sizeArea: 79, ids: [ 0x0101 ] },
            { x: 240, y: 240, sizeArea: 80, ids: [ 0x0101, 0x0102,
                                                   0x0201, 0x0202 ] },
            { x: 240, y: 240, sizeArea: 81, ids: [ 0x0000, 0x0001,
                                                   0x0100, 0x0101] },
            { x: 240, y: 240, sizeArea: 159, ids: [ 0x0000, 0x0001,
                                                    0x0100, 0x0101] },
            { x: 240, y: 240, sizeArea: 160, ids: [ 0x0000, 0x0001, 0x0002,
                                                    0x0100, 0x0101, 0x0102,
                                                    0x0200, 0x0201, 0x0202] }
        ]
            .forEach(( { x, y, sizeArea, ids } ) => {
                it("should return all ids within the radius", function () {
                    const search = new CSearch();
                    expect(search.getIds(x, y, sizeArea)).to.deep.equal(ids);
                });
            });
    });
});
