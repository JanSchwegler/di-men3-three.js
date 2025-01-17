import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, clock, stats, bunny, scrollFraction = 0, intersectedObject = null;
const canvas = document.querySelector('#canvas');
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progress = (itemsLoaded / itemsTotal) * 100;
    console.log(`Progress: ${progress.toFixed(2)}% (${itemsLoaded} of ${itemsTotal})`);
};

function init() {
    // check canvas
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }
    
    // create base elements
    scene = new THREE.Scene();
    scene.background = null;
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false, canvas });
    camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 2);

    // Add stats
    stats = new Stats();
    document.body.appendChild( stats.dom );

    // Load bunny
    const glbLoader = new GLTFLoader(loadingManager);
    glbLoader.load(
        '../../models/bunny/12_animations.glb',
        (gltf) => {
            bunny = gltf.scene;
            bunny.position.y -= new THREE.Box3().setFromObject(bunny).getSize(new THREE.Vector3()).y * 0.5;
            scene.add(bunny);
            console.log('Bunny loaded:', bunny);
        },
        undefined,
        (error) => {
            console.error('Error loading bunny:', error);
        }
    );

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // render loop
    clock = new THREE.Clock();
    renderer.setAnimationLoop(render);

    // Handle window resize
    window.addEventListener('resize', onResize, false);
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
}

function render() {
    // Get delta time (in seconds) from the clock
    const deltaTime = clock.getDelta();

    // Update
    stats.update();

    // Rotate bunny
    if (bunny) bunny.rotation.y = scrollFraction * Math.PI * -2;

    // Update hover
    raycaster.setFromCamera(mouse, camera);
    if (bunny) {
        //console.log(bunny.children[0].children[0].children);
        const intersects = raycaster.intersectObjects(bunny.children[0].children[0].children, true);
        if (intersects.length > 0) {
            if (intersectedObject !== intersects[0].object) {
                intersectedObject = intersects[0].object;
                document.body.style.cursor = 'pointer';
                console.log('Hovering:', intersectedObject.name);
            }
        } else {
            if (intersectedObject !== null) {
                intersectedObject = null;
                document.body.style.cursor = 'default';
            }
        }
    }

    // Render the scene
    renderer.render(scene, camera);
}

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

function onScroll() {
    const scrollPosition = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollFraction = scrollPosition / maxScroll;
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(yourObject, true);

    if (intersects.length > 0) {
        console.log('Clicked on:', intersects[0].object.name);
    }
}

init();