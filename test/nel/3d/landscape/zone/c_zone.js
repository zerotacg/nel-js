import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

var System = jspm.Loader();

describe("nel.3d.landscape.zone.CZone", function () {
    var CZone;
    var CBuffer;
    var CReadStream;
    var VersionError;

    before("imports", function ( done ) {
        var imports = [
            "nel/3d/landscape/zone/c_zone",
            "nel/io/buffer",
            "nel/io/read_stream",
            "nel/io/stream"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CZone = modules[ 0 ].default;
                CBuffer = modules[ 1 ].default;
                CReadStream = modules[ 2 ].default;
                VersionError = modules[ 3 ].VersionError;
            })
            .then(done)
            .catch(done)
        ;
    });

    describe("#readFrom", function () {
        var buffer;
        var stream;

        beforeEach("setup", function () {
            buffer = CBuffer.fromValues([ 4, "ZONE" ]);
            stream = new CReadStream(buffer);
        });

        context("when the version is below 4", function () {
            it("should throw a VersionError", function () {
                buffer.setUint8(0, 0x00);
                expectRead().to.throw(VersionError);
            });
        });

        function expectRead() {
            return expect(()=> stream.read(CZone));
        }

        context("when the version is 4", function () {
            it("should not throw", function () {
                expectRead().to.not.throw(VersionError);
            });
        });

        context("when the header is not ZONE", function () {
            it("should throw", function () {
                buffer.setUint32(1, 0);
                expectRead().to.throw(TypeError);
            });
        });

        context("when the header is ZONE", function () {
            it("should not throw", function () {
                expectRead().to.not.throw(TypeError);
            });
        });
    });
});
