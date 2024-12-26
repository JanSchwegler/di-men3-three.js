import './style.scss';
import * as THREE from "three";
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
    let objects = []; // Array to store all cubes
    let previousCube = scene; // Start with the scene as the parent

    // lil gui
    const settings = {
        numCubes: 20,
        satturation: 100,
        brightness: 90,
        cameraDistance: 5
    };
    const gui = new GUI();
    gui.title( "Change cubes and camera" )
    gui.add(camera.position, 'z', 2, 20).name('Camera Distance');
    gui.add(settings, 'satturation', 0, 100).name('Satturation').onFinishChange(resetCubes);
    gui.add(settings, 'brightness', 0, 100).name('Brightness').onFinishChange(resetCubes);
    gui.add(settings, 'numCubes', 1, 100, 1).name('Number of Cubes').onFinishChange(resetCubes);

    function resetCubes() {
        scene.remove(objects[0]);
        objects[0].geometry.dispose();
        objects[0].material.dispose();
        objects = [];
        previousCube = scene;
        createCubes();
    }

    function createCubes() {
        for (let i = 0; i < settings.numCubes; i++) {
            const hue = Math.random(); // Random hue
            const color = new THREE.Color(`hsl(${hue * 360}, ${settings.satturation}%, ${settings.brightness}%)`);

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color });
            const cube = new THREE.Mesh(geometry, material);

            // Position cubes in a row, each nested in the previous
            if (previousCube.type != "Scene") {
                cube.position.x = 1.5;
            }
            
            cube.scale.set(0.9, 0.9, 0.9);

            objects.push(cube);
            
            // Nest the cube inside the previous one
            previousCube.add(cube);
            
            // Update the previous cube for the next iteration
            previousCube = cube;
        }
    }
    createCubes();

    // Handle resizing of the window
    window.addEventListener('resize', onResize, false);
    onResize();

    let previousTime = 0;
    renderer.setAnimationLoop(render);

    function createCamera(distance) {
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        //camera.position.z = distance;
        camera.position.z = 10;
        return camera;
    }

    // render loop
    function render(time) {
        // Calculate delta time (in seconds)
        const deltaTime = (time - previousTime) * 0.001;
        previousTime = time;

        // Update cube rotation based on delta time
        objects.forEach((obj) => {
            obj.rotation.z += deltaTime * (Math.PI * 0.3);
        });

        renderer.render(scene, camera);
    }

    // Handle window resize
    function onResize() {
        const pixelRatio = Math.min(window.devicePixelRatio, 4); // Limit to 4x for performance
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