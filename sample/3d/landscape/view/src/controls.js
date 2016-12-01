import THREE from "three";

export default class Controls {
    constructor( config ) {
        Object.assign(this, config);

        this.mouseMove = this.mouseMove.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouse_last = new THREE.Vector3(0, 0);
        this.mouse_current = new THREE.Vector3(0, 0);
        this.mouse_move = new THREE.Vector3(0, 0);
        this.pan = false;
        this.bind();
    }

    mouseMove( event ) {
        event.preventDefault();
        event.stopPropagation();

        if ( this.pan ) {
            this.setVector(this.mouse_current, event);
        }
    }

    setVector( vector, event ) {
        vector.set(event.clientX, event.clientY, 0);
    }

    mouseDown( event ) {
        event.preventDefault();
        event.stopPropagation();

        this.setVector(this.mouse_last, event);
        this.setVector(this.mouse_current, event);
        this.pan = event.button === 0;
    }

    mouseUp( event ) {
        event.preventDefault();
        event.stopPropagation();

        this.setVector(this.mouse_last, event);
        this.setVector(this.mouse_current, event);
        this.pan = false;
    }

    bind() {
        var dom_object = this.dom_object;
        dom_object.addEventListener("mousemove", this.mouseMove, false);
        dom_object.addEventListener("mousedown", this.mouseDown, false);
        dom_object.addEventListener("mouseup", this.mouseUp, false);

    }

    update() {
        var move = this.mouse_move;
        var current = this.mouse_current;
        var last = this.mouse_last;
        var object = this.object;

        move.subVectors(current, last);
        move.multiplyScalar(this.movement_speed);
        object.translateX(-move.x);
        object.translateY(move.y);
        object.translateZ(move.z);

        last.copy(current);
    }
}
