import CZone from "nel/3d/landscape/zone/c_zone";
import CReadFile from "nel/io/c_read_file";

let argv = process.argv;
let file = argv[1];

CReadFile.open(file)
    .then(readZone)
    .then(writeFbx)
    .catch(console.error.bind(console, "error"))
;

function readZone( stream ) {
    console.log("reading");
    var model = stream.read(CZone);
    console.log("done reading", model);

    return model;
}

function writeFbx( model ) {
    var length = model.patches.length;
    for ( var i = 0; i < length; ++i ) {
        var patch = model.patches[ i ];
        console.log(`patch: ${i}`);
    }
}
