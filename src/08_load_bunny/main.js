import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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

    // Add stats
    let stats;
    stats = new Stats();
    document.body.appendChild( stats.dom );

    // Add GUI
    const gui = new GUI();
    let settings = {
        vertecies: true
    };
    gui.add(settings, 'vertecies').name('Vertecies').onChange(
        (value) => {
            scene.getObjectByName('pointsGroupe').visible = value;
        }
    );

    // Add GLB model
    let pointsGroupe = new THREE.Group();
    pointsGroupe.name = 'pointsGroupe';
    const material = new THREE.MeshBasicMaterial({ color: 0x999999 });
    const pointsMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.005, sizeAttenuation: true });
    const glbLoader = new GLTFLoader();
    glbLoader.load('../../models/bunny/08_load_bunny.glb',
        (gltf) => {
            const model = gltf.scene;
            // loop through all children of the model
            model.traverse((child) => {
                if (child.isMesh) {
                    // add material
                    child.material = material;
                    // add points to pointsGroupe
                    const points = new THREE.Points(child.geometry, pointsMaterial);
                    pointsGroupe.add(points);
                }
            });
            model.add(pointsGroupe);
            model.position.y = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3()).y / -2;
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
    
    function createCamera() {
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 1.3;
        return camera;
    }

    // render loop
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(render);
    function render() {
        // Get delta time (in seconds) from the clock
        const deltaTime = clock.getDelta();

        // Update
        orbitControls.update();
        stats.update();

        // Render the scene
        renderer.render(scene, camera);
    }

    // Handle window resize
    function onResize() {
        const pixelRatio = Math.min(window.devicePixelRatio, 4);
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