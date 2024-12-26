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
        faces: true,
        edges: true,
        vertecies: true,
    };
    gui.add(settings, 'faces').name('Faces').onChange(updateMaterial);
    gui.add(settings, 'edges').name('Edges').onChange(updateMaterial);
    gui.add(settings, 'vertecies').name('Vertecies').onChange(updateMaterial);
    function updateMaterial() {
        if ( settings.faces )
        {
            model.children[0].material = material;
            model.children[0].material.transparent = false;
            model.children[0].material.opacity = 1;
        } 
        else
        {
            model.children[0].material.dispose();
            model.children[0].material.transparent = true;
            model.children[0].material.opacity = 0;
        }
        settings.edges ? scene.add(edgeLines) : scene.remove(edgeLines);
        settings.vertecies ? scene.add(points) : scene.remove(points);
    }

    // Add GLB model
    let model, points, edgeLines;
    const material = new THREE.MeshBasicMaterial({ color: 0xecadff });
    const pointsMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.05, sizeAttenuation: true });
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const glbLoader = new GLTFLoader();

    glbLoader.load('../../models/cube.glb',
        (gltf) => {
            model = gltf.scene;

            // Add a material to all meshes
            model.traverse((child) => {
                if (child.isMesh) {
                    // Get Points
                    points = new THREE.Points(child.geometry, pointsMaterial);
                    // Get EdgesGeometry
                    const edges = new THREE.EdgesGeometry(child.geometry);
                    edgeLines = new THREE.LineSegments(edges, edgesMaterial);
                    // Update visibility
                    updateMaterial();
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