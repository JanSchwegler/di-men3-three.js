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
    const cube = createCube();
    scene.add(cube);

    // Handle resizing of the window
    window.addEventListener('resize', onResize, false);
    onResize();

    let previousTime = 0;
    renderer.setAnimationLoop(render);

    function createCamera() {
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 2;
        return camera;
    }

    function createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
        return new THREE.Mesh(geometry, material);
    }

    // render loop
    function render(time) {
        // Calculate delta time (in seconds)
        const deltaTime = (time - previousTime) * 0.001;
        previousTime = time;

        // Update cube rotation based on delta time
        cube.rotation.x += deltaTime * (Math.PI * 0.3);
        cube.rotation.y += deltaTime * (Math.PI * 0.3);

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

        adjustCameraToObject();
    }

    function adjustCameraToObject() {
        const objectWidth = 1;
        const objectHeight = 1;
        const padding = 1; // Padding around object
        const aspectRatio = camera.aspect;
        const fov = camera.fov * (Math.PI / 180);
        let distance;

        if (aspectRatio > 1) { // Landscape mode (wide screen)
            distance = Math.max((objectHeight / 2 + padding) / Math.tan(fov / 2), 1);
        } else { // Portrait mode (tall screen)
            distance = Math.max((objectWidth / 2 + padding) / Math.tan(fov / 2) / aspectRatio, 2);
        }
        camera.position.z = distance;
    }
}
main();