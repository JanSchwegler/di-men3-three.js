import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

let scene, camera, renderer, clock, orbitControls, stats, gui, hdri, texture, bunny;
const canvas = document.querySelector('#canvas');

const exrLoader = new EXRLoader();
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
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false, canvas });

    camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0.3, 3);

    // Add stats
    stats = new Stats();
    document.body.appendChild( stats.dom );

    // Add orbit controls
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents( window );
    orbitControls.enableDamping = true;
    orbitControls.enablePan = false;
    orbitControls.enableZoom = false;

    // Load bunny
    const glbLoader = new GLTFLoader(loadingManager);
    glbLoader.load(
        '../../models/bunny/12_animations.glb',
        (gltf) => {
            bunny = gltf.scene;
            bunny.position.y -= new THREE.Box3().setFromObject(bunny).getSize(new THREE.Vector3()).y * 0.5;
            scene.add(bunny);
        },
        undefined,
        (error) => {
            console.error('Error loading bunny:', error);
        }
    );

    // Load HDRI
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    exrLoader.load('../../hdri/Sky.exr', (texture) => {
        hdri = pmremGenerator.fromEquirectangular(texture).texture;
        texture.dispose();
    }, 
    undefined, 
    (error) => {
        console.error(`Error loading HDRI: `, error);
        reject(error);
    });

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    texture = textureLoader.load('../../models/bunny/11_textures_gltf/body_BaseColor_1001.png');

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    // Setup GUI
    setupGUI()

    // render loop
    clock = new THREE.Clock();
    renderer.setAnimationLoop(render);

    // Handle window resize
    window.addEventListener('resize', onResize, false);
    onResize();
}

function setupGUI() {
    gui = new GUI();

    const settings = {
        background: 'Color',
        backgroundOptions: ['Color', 'Transparent', 'Texture', 'Environment Map'],
        color: '#3a2c2e',
    };
    
    gui.add(settings, 'background', settings.backgroundOptions).name('Background').onChange(handleBackgroundChange);

    function handleBackgroundChange(value) {
        gui.controllers.forEach((control) => {
            if (control.property === 'color') {
                control.destroy();
            }
        });
        switch (value) {
            case 'Color':
                scene.background = new THREE.Color(settings.color);
                gui.addColor(settings, 'color').name('Color').onChange((color) => {
                    scene.background = new THREE.Color(color);
                });
                break;
            case 'Transparent':
                scene.background = null;
                break;
            case 'Texture':
                scene.background = texture;
                break;
            case 'Environment Map':
                scene.background = hdri;
                break;
        }
    }
    handleBackgroundChange(settings.background);
}

function render() {
    // Get delta time (in seconds) from the clock
    const deltaTime = clock.getDelta();

    // Update
    orbitControls.update();
    stats.update();

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

init();