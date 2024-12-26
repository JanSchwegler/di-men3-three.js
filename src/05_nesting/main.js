import './style.scss';
import * as THREE from "three";

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

    // Create cube base elements
    const objects = [];
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xffabab });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xbdffab });
    const material3 = new THREE.MeshBasicMaterial({ color: 0xabc8ff });

    // Create cubes
    objects.push(createCube(material1));
    objects.push(createCube(material2));
    objects.push(createCube(material3));

    // Set positions and scales
    objects[1].position.x = 2;
    objects[2].position.x = 2;
    objects[1].scale.set(0.7, 0.7, 0.7);
    objects[2].scale.set(0.7, 0.7, 0.7);

    // Nest cubes
    scene.add(objects[0]);
    objects[0].add(objects[1]);
    objects[1].add(objects[2]);

    // Handle resizing of the window
    window.addEventListener('resize', onResize, false);
    onResize();

    let previousTime = 0;
    renderer.setAnimationLoop(render);

    function createCamera() {
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        return camera;
    }

    function createCube(material) {
        return new THREE.Mesh(geometry, material);
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