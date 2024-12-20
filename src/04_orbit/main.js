import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

function main() {
    // get canvas
    const canvas = document.querySelector('#canvas');
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }
    
    // create base elements
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    const camera = createCamera();
    const cube = createCube();
    scene.add(cube);

    // Add stats
    let stats;
    stats = new Stats();
    document.body.appendChild( stats.dom );

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents( window );
    controls.enableDamping = true;
    controls.maxDistance = 100;
    controls.minDistance = 1;

    // Add transform Controls
    const transform = new TransformControls( camera, renderer.domElement );
    transform.addEventListener( 'dragging-changed', function ( event ) { // Disable orbit controls when transforming
        controls.enabled = !event.value;
    } );
    const gizmo = transform.getHelper();

    // Add helpers
    const axesHelper = new THREE.AxesHelper(5); // 5 -> Size of the axes
    const gridHelper = new THREE.GridHelper( 10, 10, 0x888888, 0x444444 ); // 10 -> Size and divisions, 0x888888 -> Color, 0x444444 -> Center line color

    // Add GUI
    const gui = new GUI();

    const customText = document.createElement("div");
    customText.style.fontSize = "12px";
    customText.style.padding = "12px 4px";
    customText.style.color = "#ebebeb";
    customText.style.lineHeight = "1.3";
    customText.innerHTML = `
        <strong>Controls:</strong><br>
        Orbit: Left Mouse Button<br>
        Zoom: Right Mouse Button<br>
        Pan: Right Mouse Button
    `;
    gui.domElement.querySelector(".children").appendChild(customText);

    const guiOptions = {
        transformMode: 'translate',
        space: 'world',
        gizmoVisible: true,
        axesHelper: false,
        gridHelper: true,
        centerCube() {
            controls.target.set(0, 0, 0);
        },
        resetCube() {
            cube.position.set(0, 0, 0);
            cube.rotation.set(0, 0, 0);
            cube.scale.set(1, 1, 1);
        }
    }

    gui.add(guiOptions, 'transformMode', ['translate', 'rotate', 'scale']).name('Transform Mode').onChange((value) => {
        transform.setMode(value);
    });
    gui.add(guiOptions, 'space', ['world', 'local']).name('Space').onChange((value) => {
        transform.setSpace(value);
    });
    gui.add(guiOptions, 'gizmoVisible').name('Show Gizmo').onChange(guiToggle);
    gui.add(guiOptions, 'axesHelper').name('Show Axes').onChange(guiToggle);
    gui.add(guiOptions, 'gridHelper').name('Show Grid').onChange(guiToggle);
    gui.add(guiOptions, 'centerCube').name('Reset Pan');
    gui.add(guiOptions, 'resetCube').name('Reset Cube Transform');

    function guiToggle() {
        if (guiOptions.axesHelper) {
            scene.add(axesHelper);
        } else {
            scene.remove(axesHelper);
        }
        if (guiOptions.gridHelper) {
            scene.add(gridHelper);
        } else {
            scene.remove(gridHelper);
        }
        if (guiOptions.gizmoVisible) {
            scene.add(gizmo);
            transform.attach( cube );
        } else {
            transform.detach();
        }
    }
    guiToggle();

    // Handle resizing of the window
    window.addEventListener('resize', onResize, false);
    onResize();
    
    let previousTime = 0;
    renderer.setAnimationLoop(render);

    function createCamera() {
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.x = 2;
        camera.position.y = 2;
        camera.position.z = 2;
        return camera;
    }

    function createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xecadff });
        return new THREE.Mesh(geometry, material);
    }

    // render loop
    function render(time) {
        // Calculate delta time (in seconds)
        const deltaTime = (time - previousTime) * 0.001;
        previousTime = time;

        // Update
        controls.update();
        stats.update();

        renderer.render(scene, camera);
    }

    // Handle window resize
    function onResize() {
        const pixelRatio = Math.min(window.devicePixelRatio, 2); // Limit to 2x for performance
        const width = Math.round(canvas.clientWidth * pixelRatio);
        const height = Math.round(canvas.clientHeight * pixelRatio);

        // Set renderer size and adjust canvas attributes
        renderer.setSize(width, height, false);
        canvas.width = width;
        canvas.height = height;

        // Update camera aspect ratio and projection matrix
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}
main();