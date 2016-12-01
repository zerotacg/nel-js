/**
 * @author mrdoob / http://mrdoob.com/
 */
export default class PointerLockControls {
    constructor( camera ) {

        var scope = this;

        camera.rotation.set(0, 0, 0);
        var PI_2 = Math.PI / 2;

        var onMouseMove = function ( event ) {
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            camera.rotation.y -= movementX * 0.002;
            camera.rotation.x -= movementY * 0.002;

            camera.rotation.x = Math.max(-PI_2, Math.min(PI_2, camera.rotation.x));

            event.preventDefault();
            event.stopPropagation();
        };

        document.addEventListener('mousemove', onMouseMove, false);
    }

    update() {}
}
