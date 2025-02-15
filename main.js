import './style.scss';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

let scene, camera, cameraInitialPosition = {x: 0, y: 0.22, z: 1.2}, renderer, clock, model, animationButtonPress, animationMixer, animationAction, envmap, intersectedObject = null, touchPosition = {x: -100000, y: -100000}, touchStartTime, touchStartPosition = {x: -100000, y: -100000}, raycaster, mouse, loadingManager, exrLoader, pmremGenerator, orbitControls, composter, renderPass, outlinePass, fxaaPass, gammaCorrectionPass, materialLightGreenUnlit, materialLightGreenLit, materialLightRedUnlit, materialLightRedLit, lookAtLerpAmount = 0.1, lookAtMovementAmount = 0.03, lookAtTarget = new THREE.Vector3(), currentLookAt = new THREE.Vector3();
const currentURL = window.location.pathname.split('/');
const canvas = document.querySelector('#canvas');

const pageNames = [
    '/di-men3-three.js/dokumentation/dokumentation', // Dokumentation
    '01_setup',
    '02_line',
    '03_responsive',
    '04_orbit',
    '05_nesting',
    '06_lil-gui',
    '07_load_gltf',
    '08_load_bunny',
    '09_materials',
    '10_textures',
    '11_textures_gltf',
    '12_animations',
    '13_lighting',
    '14_background',
    '15_userinteraction', // + projektdefinition / Github repo
    '/di-men3-three.js/dist',
    'https://github.com/JanSchwegler/di-men3-three.js'
]

// Redirect to dist folder
if (currentURL[1] == 'di-men3-three.js' && currentURL[2] != 'dist' || currentURL[1] == '') {
    //window.location.href = 'dist/';
}

function init() {
    // check canvas
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }

    // loading manager
    loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
        const progress = (itemsLoaded / itemsTotal) * 100;
        console.log(`Progress: ${progress.toFixed(2)}% (${itemsLoaded} of ${itemsTotal})`);
    };
    loadingManager.onLoad = function () {
        scene.environment = envmap;
        scene.add(model);
    };
    
    // create base elements
    scene = new THREE.Scene();
    scene.background = null;
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false, canvas });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(cameraInitialPosition.x, cameraInitialPosition.y, cameraInitialPosition.z);
    camera.lookAt(cameraInitialPosition.x, cameraInitialPosition.y, 0);

    // Add post processing
    composter = new EffectComposer(renderer);
    renderPass = new RenderPass(scene, camera);
    composter.addPass(renderPass);
    outlinePass = new OutlinePass(new THREE.Vector2(canvas.clientWidth, canvas.clientHeight), scene, camera);
    outlinePass.edgeStrength = 3;
    outlinePass.edgeGlow = 0;
    outlinePass.edgeThickness = 3;
    outlinePass.pulsePeriod = 0;
    outlinePass.visibleEdgeColor.set('#ffffff');
    outlinePass.hiddenEdgeColor.set('#ffffff');
    composter.addPass(outlinePass);
    fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = Math.min(window.devicePixelRatio, 4);
    fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( canvas.clientWidth * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( canvas.clientHeight * pixelRatio );
    composter.addPass(fxaaPass);
    gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
    composter.addPass(gammaCorrectionPass);

    // Setup orbit controls
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents( window );
    orbitControls.enableDamping = true;
    orbitControls.enablePan = false;
    orbitControls.enableZoom = true;
    orbitControls.maxDistance = 2;
    orbitControls.minDistance = 0.8;
    orbitControls.enableRotate = false;
    orbitControls.target.set(cameraInitialPosition.x, cameraInitialPosition.y, 0);
    orbitControls.update();

    // Setup reytracer
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Load model
    const glbLoader = new GLTFLoader(loadingManager);
    glbLoader.load(
        './models/control_panel/v18_control_panel.glb',
        (gltf) => {
            model = gltf.scene;
            const boundingBox = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
            model.position.y -= boundingBox.y * 0.5;
            model.position.x -= boundingBox.x * 0.5 + 0.057;
            animationButtonPress = createCustomAnimationClip();
            // set light materials
            materialLightGreenUnlit = model.children[1].children[2].children[1].material.clone();
            materialLightGreenLit = materialLightGreenUnlit.clone();
            materialLightGreenUnlit.name = 'light_green_lit';
            materialLightGreenLit.emissive.set('#1CBB22');
            materialLightRedUnlit = model.children[1].children[3].children[1].material.clone();
            materialLightRedLit = materialLightRedUnlit.clone();
            materialLightRedUnlit.name = 'light_red_lit';
            materialLightRedLit.emissive.set('#CC1C1C');
            // enable red light
            if (currentURL[3] == 'src') { // sub page
                const currentPage = Number((currentURL[currentURL.length - 2].match(/\d+/) || [0])[0]);
                if (currentPage > 0 && currentPage < 16) model.children.find((child) => child.name == 'button_' + (currentPage + 1).toString().padStart(2, '0')).children[3].children[1].material = materialLightRedLit;
            } else { // home page
                model.children[15].children[3].children[1].material = materialLightRedLit;
            }
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }
    );

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // Add environment map
    exrLoader = new EXRLoader(loadingManager);
    pmremGenerator = new THREE.PMREMGenerator(renderer);
    exrLoader.load('./hdri/hdri_peppermint_powerplant_2k.exr', (texture) => {
        envmap = pmremGenerator.fromEquirectangular(texture).texture;
        texture.dispose();
        pmremGenerator.dispose();
    });

    // render loop
    clock = new THREE.Clock();
    renderer.setAnimationLoop(render);

    // Handle window resize
    window.addEventListener('resize', onResize, false);
    onResize();
    // Move event
    window.addEventListener('mousemove', setTouchPosition);
    window.addEventListener('mouseout', clearTouchPosition);
    window.addEventListener('mouseleave', clearTouchPosition);
    // Click event
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
}

function render() {
    // Get delta time (in seconds) from the clock
    const deltaTime = clock.getDelta();

    // Update
    animationMixer ? animationMixer.update(deltaTime) : null;

    // Update hover
    touchSelector();
    updateCameraLookAt();

    // Render the scene
    composter.render(scene, camera);
}

function onResize() {
    const pixelRatio = Math.min(window.devicePixelRatio, 4); // Limit to 4x for performance
    const width = Math.round(canvas.clientWidth * pixelRatio);
    const height = Math.round(canvas.clientHeight * pixelRatio);

    // Set renderer size and adjust canvas attributes
    renderer.setSize(width, height, false);
    canvas.width = width;
    canvas.height = height;

    orbitControls.update();
    updateCameraPosition();

    // Update effect composer
    composter.setSize(width, height);
    fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( width * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );

    // Update camera aspect ratio and projection matrix
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
}

function getButtonNumber(buttonName) {
    const match = buttonName.match(/button_(\d+)/);
    if (match && match[1]) {
        const number = parseInt(match[1], 10);
        return number;
    }
    return null;
}

function getTargetURL(buttonName) {
    const buttonNumber = getButtonNumber(buttonName);
    if (buttonNumber == null) return null; // check if button valide
    if (buttonNumber == 17) return null; // chack if on the overview page / same page

    if (buttonNumber > 1 && buttonNumber < 17) {
        return '/di-men3-three.js/dist/src/' + pageNames[buttonNumber - 1] + '/index.html'; // Subpages
    } else {
        return pageNames[buttonNumber - 1]; // full links
    }
}

function handleClick() {
    if (intersectedObject && intersectedObject.name.includes('button')) {
        // Get target URL
        const targetURL = getTargetURL(intersectedObject.parent.name);
        if (!targetURL) return; // check if target url is valid

        // Start animation
        animationMixer = new THREE.AnimationMixer(intersectedObject.parent.children[1]);
        animationAction = animationMixer.clipAction(animationButtonPress);
        animationAction.loop = THREE.LoopOnce;
        animationAction.clampWhenFinished = true;
        animationAction.play();

        // switch page
        if (targetURL) {
            setTimeout(() => {
                if (targetURL[0] == 'h') {
                    window.open(targetURL, "_self");
                } else {
                    window.location.href = targetURL;
                }
            }, 300);
        }
    }
}

function createCustomAnimationClip() {
    const times = [0, 5]; // Start and end times in seconds
    const values = [0, -0.5]; // Start and end z positions
    const trackName = `.position[z]`;
    const track = new THREE.KeyframeTrack(trackName, times, values);
    const duration = 5 / 30; // Assuming 30 fps, duration in seconds
    const clip = new THREE.AnimationClip('ButtonPress', duration, [track]);
    return clip;
}

function handleTouchStart(event) {
    setTouchPosition(event.touches[0]);
    touchStartTime = Date.now();
    touchStartPosition.x = touchPosition.x
    touchStartPosition.y = touchPosition.y
}

function handleTouchEnd() {
    const touchEndTime = Date.now();
    if (touchEndTime - touchStartTime < 200 && Math.abs(touchStartPosition.x - touchPosition.x) < 0.01 && Math.abs(touchStartPosition.y - touchPosition.y) < 0.01) {
        handleClick();
    }
    clearTouchPosition();
}

function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * canvas.width  / rect.width,
        y: (event.clientY - rect.top ) * canvas.height / rect.height,
    };
}

function setTouchPosition(event) {
    const pos = getCanvasRelativePosition(event);
    touchPosition.x = (pos.x / canvas.width ) *  2 - 1;
    touchPosition.y = (pos.y / canvas.height) * -2 + 1;
}

function clearTouchPosition() {
    touchPosition.x = -100000;
    touchPosition.y = -100000;
}

function addOutlinePass() {
    if (intersectedObject.name.includes('_')) {
        outlinePass.selectedObjects = [intersectedObject];
    } else {
        outlinePass.selectedObjects = [intersectedObject.parent.children[1]];
    }
    document.body.style.cursor = 'pointer';
    // enable green light
    const targetURL = getTargetURL(intersectedObject.parent.name);
    if (targetURL) {
        intersectedObject.parent.children[2].children[1].material = materialLightGreenLit;
    }
}

function removeOutlinePass() {
    outlinePass.selectedObjects = [];
    document.body.style.cursor = 'default';
}

function handleLeaveButton(object) {
    if (object == null || !object.name.includes('button')) return;
    // disable green light
    object.parent.children[2].children[1].material = materialLightGreenUnlit;
}

function touchSelector() {
    raycaster.setFromCamera(touchPosition, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        if (intersectedObject !== intersects[0].object) {
            handleLeaveButton(intersectedObject);
            intersectedObject = intersects[0].object;
            if (intersectedObject.name.includes('button')) {
                addOutlinePass();
            } else {
                removeOutlinePass();
            }
        }
    } else {
        if (intersectedObject !== null) {
            removeOutlinePass();
            handleLeaveButton(intersectedObject);
            intersectedObject = null;
        }
    }
}

function updateCameraLookAt() {
    if (touchPosition.x == -100000 || touchPosition.y == -100000) {
        lookAtTarget.set(
            cameraInitialPosition.x,
            cameraInitialPosition.y,
            0
        );
        lookAtLerpAmount = 0.02;
    } else {
        lookAtTarget.set(
            cameraInitialPosition.x + lookAtMovementAmount * touchPosition.x,
            cameraInitialPosition.y + lookAtMovementAmount * touchPosition.y,
            0
        );
        lookAtLerpAmount = 0.1;
    }
    camera.getWorldDirection(currentLookAt);
    currentLookAt.add(camera.position);
    currentLookAt.lerp(lookAtTarget, lookAtLerpAmount);
    camera.lookAt(currentLookAt);
}

function updateCameraPosition() {
    const size = new THREE.Vector3(1.8, 0.9, 0.5);
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const fov = camera.fov * (Math.PI / 180);// Calculate the camera distance needed to fit the object
    const distance = Math.max(
        size.x / (2 * Math.tan(fov / 2) * aspect),
        size.y / (2 * Math.tan(fov / 2)),
        size.z
    );
    camera.position.z = 0.25 + distance * 1.1; // Add 10% margin
    if (0.25 + distance * 1.1 > 2) {
        orbitControls.maxDistance = 0.25 + distance * 1.1;
    }
}

init();