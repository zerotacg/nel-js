import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

var System = jspm.Loader();

describe("nel.3d.landscape.tile.CTileBank", function () {
    var CTileBank;
    var CTileNoise;
    var CBuffer;
    var CReadStream;
    var CWriteStream;

    before("imports", function ( done ) {
        var imports = [
            "nel/3d/landscape/tile/c_tile_bank",
            "nel/3d/landscape/tile/c_tile_noise",
            "nel/io/buffer",
            "nel/io/read_stream",
            "nel/io/write_stream"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CTileBank = modules[ 0 ].default;
                CTileNoise = modules[ 1 ].default;
                CBuffer = modules[ 2 ].default;
                CReadStream = modules[ 3 ].default;
                CWriteStream = modules[ 4 ].default;
            })
            .then(done)
            .catch(done)
        ;
    });

    var tile_bank;
    var buffer;
    var stream;
    var displacement_maps;

    beforeEach("setup", function () {
        tile_bank = new CTileBank();
        buffer = CBuffer.create(16);
        var write_stream = new CWriteStream(buffer);
        write_stream.writeString("BANK");
        write_stream.writeVersion(4);
        displacement_maps = [
            new CTileNoise(),
            new CTileNoise(),
            new CTileNoise()
        ];
        write_stream.writeUint32(displacement_maps.length);

        stream = new CReadStream(buffer);
        stream.readArray = function( readElement ) {
            if ( readElement === CTileNoise.readFrom ) {
                return displacement_maps;
            }
        };
    });

    describe("#readFrom()", function () {
        context("when not starting with bank header", function () {
            it("should throw", function () {
                var write_stream = new CWriteStream(buffer);
                write_stream.writeString("no bank");
                expect(() => tile_bank.readFrom(stream)).to.throw(TypeError);
            });
        });

        context("when starting with bank header", function () {
            it("should not throw", function () {
                expect(() => tile_bank.readFrom(stream)).to.not.throw(TypeError);
            });
        });

        context("when version is below 2", function () {
            it("should throw", function () {
                buffer.setUint8(8, 1);
                expect(() => tile_bank.readFrom(stream)).to.throw(TypeError);
            });
        });

        context("when version is 4", function () {
            beforeEach("setup", function () {
                sinon.stub(tile_bank, "readDisplacementMapsFrom");
                sinon.stub(tile_bank, "readAbsolutePathFrom");
                sinon.stub(tile_bank, "readTileLandsFrom");
                sinon.stub(tile_bank, "readTileSetsFrom");
                sinon.stub(tile_bank, "readTilesFrom");

                tile_bank.readFrom(stream);
            });

            it("should read displacement maps", function () {
                expect(tile_bank.readDisplacementMapsFrom).to.have.been.calledWith(stream);
            });

            it("should read the absolute path", function () {
                expect(tile_bank.readAbsolutePathFrom).to.have.been.calledWith(stream);
            });
        });

        it("should compute the x ref", function () {
            sinon.stub(tile_bank, "computeXRef");

            tile_bank.readFrom(stream);

            expect(tile_bank.computeXRef).to.have.been.called;
        });
    });

    describe("#readDisplacementMapsFrom()", function () {
        it("should read the displacement maps from the stream", function () {
            tile_bank.readFrom(stream);

            expect(tile_bank).to.have.property("displacement_maps", displacement_maps);
        });

        it("should set the first displacement map to blank", function () {
            tile_bank.readFrom(stream);

            expect(displacement_maps[0]).to.equal(CTileNoise.BLANK);
        });
    });
});
