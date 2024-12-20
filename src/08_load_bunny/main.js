import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

    // Add stats
    let stats;
    stats = new Stats();
    document.body.appendChild( stats.dom );

    // Add GLB model
    const glbLoader = new GLTFLoader();
    glbLoader.load('models/cube.glb', 
        (gltf) => {
            const model = gltf.scene;

            // Add a material to all meshes
            const material = new THREE.MeshBasicMaterial({ color: 0xdddddd });
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = material;
                }
            });

            scene.add(model);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
        }
    );

    // Add orbit controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents( window );
    orbitControls.enableDamping = true;
    orbitControls.enablePan = false;

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
        orbitControls.update();
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