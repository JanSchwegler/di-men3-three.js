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
    const numCubes = 20; // Number of cubes to create
    const camera = createCamera(numCubes * 2 * (1 / Math.sqrt(numCubes)));
    let objects = []; // Array to store all cubes
    let previousCube = scene; // Start with the scene as the parent

    for (let i = 0; i < numCubes; i++) {
        const hue = Math.random(); // Random hue
        const color = new THREE.Color(`hsl(${hue * 360}, 100%, 90%)`);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color });
        const cube = new THREE.Mesh(geometry, material);

        // Position cubes in a row, each nested in the previous
        if (i > 0) {
            cube.position.x = 1.5;
        }
        cube.scale.set(0.9, 0.9, 0.9);

        objects.push(cube);
        
        // Nest the cube inside the previous one
        previousCube.add(cube);
        
        // Update the previous cube for the next iteration
        previousCube = cube;
    }

    // Handle resizing of the window
    window.addEventListener('resize', onResize, false);
    onResize();

    let previousTime = 0;
    renderer.setAnimationLoop(render);

    function createCamera(distance) {
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = distance;
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