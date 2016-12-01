import THREE from "three";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
var mesh;

import CZone from "nel/3d/landscape/zone/c_zone";
import CReadFile from "nel/io/c_read_file";
import Controls from "./fly_controls";

var controls = new Controls(camera);
var points = 10;

var render = function () {
    requestAnimationFrame(render);

    if ( mesh ) {
        //mesh.rotation.x += 0.05;
        //mesh.rotation.y += 0.0125;
    }
    controls.update(1);
    renderer.render(scene, camera);
};

render();

window.CReadFile = CReadFile;
window.handleFiles = function ( files ) {
    for ( var i = 0; i < files.length; ++i ) {
        openFile(files.item(i));
    }
};

function openFile( file ) {
    CReadFile.open(file)
        .then(loadZone)
        .then(writeFbx)
        .then(model => {
            var geometry = window.geometry = new THREE.Geometry();
            var length = model.patches.length;
            var bias = new THREE.Vector3(model.patch_bias.x, model.patch_bias.y, model.patch_bias.z);
            camera.position.x = model.bounding_box.center.x;
            camera.position.y = model.bounding_box.center.y;
            camera.position.z = model.bounding_box.center.z + 200;
            for ( var i = 0; i < length; ++i ) {
                var patch = model.patches[ i ];
                pushVertices(patch, model.patch_scale, bias, geometry);
                // addLine(patch, model.patch_scale, bias);
            }
            createFaces(geometry);

            if ( mesh ) {
                scene.remove(mesh);
            }
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        })
        .catch(console.error.bind(console, "error"))
    ;
}

function loadZone(stream) {
    console.log("reading");
    var model = window.model = stream.read(CZone);
    console.log("done reading", model);

    return model;
}

function writeFbx(model) {
    return model;
}

function pushVertices( patch, scale, bias, geometry ) {
    var vertices = patch.vertices.map(unpack.bind(this, scale, bias));
    var tangents = patch.tangents.map(unpack.bind(this, scale, bias));
    var interiors = patch.interiors.map(unpack.bind(this, scale, bias));

    for( var y = 0; y < points; ++y ) {
        for( var x = 0; x < points; ++x ) {
            pushVertex(x, y, vertices, tangents, interiors, geometry);
            pushVertex(x+1, y, vertices, tangents, interiors, geometry);
            pushVertex(x+1, y+1, vertices, tangents, interiors, geometry);
            pushVertex(x, y+1, vertices, tangents, interiors, geometry);
        }
    }
}

function pushVertex( x, y, vertices, tangents, interiors, geometry ) {
    var steps = (points);
    var ps = x / steps;
    var pt = y / steps;
    var vertex = bezierPoint(ps, pt, vertices, tangents, interiors);

    geometry.vertices.push(vertex);
}

function bezierPoint(ps, pt, vertices, tangents, interiors) {
    var p = new THREE.Vector3(0, 0, 0);

    var ps2 = ps * ps;
    var ps1 = 1.0 - ps;
    var ps12 = ps1 * ps1;
    var s0 = ps12 * ps1;
    var s1 = 3.0 * ps * ps12;
    var s2 = 3.0 * ps2 * ps1;
    var s3 = ps2 * ps;
    var pt2 = pt * pt;
    var pt1 = 1.0 - pt;
    var pt12 = pt1 * pt1;
    var t0 = pt12 * pt1;
    var t1 = 3.0 * pt * pt12;
    var t2 = 3.0 * pt2 * pt1;
    var t3 = pt2 * pt;

    mulAdd(p, vertices[0] , s0 * t0);
    mulAdd(p, tangents[7] , s1 * t0);
    mulAdd(p, tangents[6] , s2 * t0);
    mulAdd(p, vertices[3] , s3 * t0);
    mulAdd(p, tangents[0] , s0 * t1);
    mulAdd(p, interiors[0], s1 * t1);
    mulAdd(p, interiors[3], s2 * t1);
    mulAdd(p, tangents[5] , s3 * t1);
    mulAdd(p, tangents[1] , s0 * t2);
    mulAdd(p, interiors[1], s1 * t2);
    mulAdd(p, interiors[2], s2 * t2);
    mulAdd(p, tangents[4] , s3 * t2);
    mulAdd(p, vertices[1] , s0 * t3);
    mulAdd(p, tangents[2] , s1 * t3);
    mulAdd(p, tangents[3] , s2 * t3);
    mulAdd(p, vertices[2] , s3 * t3);

    return p;
}

function mulAdd(dst, src, f)
{
    dst.x+= src.x*f;
    dst.y+= src.y*f;
    dst.z+= src.z*f;
}

function createFaces(geometry ) {
    for( var i = 0, length = geometry.vertices.length; i < length; i += 4 ) {
        geometry.faces.push(new THREE.Face3(i, i + 1, i + 2));
        geometry.faces.push(new THREE.Face3(i, i + 2, i + 3));
    }
}

function addLine( patch, scale, bias ) {
    var vertices = patch.vertices.map(unpack.bind(this, scale, bias));
    var tangents = patch.tangents.map(unpack.bind(this, scale, bias));
    var interiors = patch.interiors.map(unpack.bind(this, scale, bias));

    addCurve(vertices[0], tangents[0], tangents[1], vertices[1]);
    addCurve(vertices[1], tangents[2], tangents[3], vertices[2]);
    addCurve(vertices[2], tangents[4], tangents[5], vertices[3]);
    addCurve(vertices[3], tangents[6], tangents[7], vertices[0]);

    addCurve(tangents[0], interiors[0], interiors[3], tangents[5]);
    addCurve(tangents[1], interiors[1], interiors[2], tangents[4]);
    addCurve(tangents[2], interiors[1], interiors[0], tangents[7]);
    addCurve(tangents[3], interiors[2], interiors[3], tangents[6]);
}

function addCurve( node1, control1, control2, node2 ) {
    var curve = new THREE.CubicBezierCurve3(
        node1,
        control1,
        control2,
        node2
    );

    var geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints(50);

    // Create the final Object3d to add to the scene
    var line = new THREE.Line(geometry, material);
    scene.add(line);
}

function unpack(scale, bias, vertex) {
    var vector = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
    vector.multiplyScalar(scale);
    vector.add(bias);

    return vector;
}

window.toFbx = function ( geometry ) {
    fbxVertices(geometry.vertices);
    fbxIndex(geometry.faces);
};

function fbxVertices( vertices ) {
    var values = vertices.reduce(( values, vertex ) => values.concat([ vertex.x, vertex.y, vertex.z ]), []);
    console.log(`Vertices: *${values.length} {\na:${values.join(",")}\n}`);
}

function fbxIndex( faces ) {
    var values = faces.reduce(( values, face ) => values.concat([ face.a, face.b, face.c * -1 - 1 ]), []);

    console.log(`PolygonVertexIndex: *${values.length} {\na:${values.join(",")}\n}`);
}
