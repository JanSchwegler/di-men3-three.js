import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, clock, stats, bunny, animationMixer, animationAction, scrollFraction = 0, intersectedObject = null, touchPosition = {x: -100000, y: -100000}, touchStartTime, touchStartPosition = {x: -100000, y: -100000};
const canvas = document.querySelector('#canvas');
const htmlContent = document.querySelector('#htmlContent');
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
            const idleAnimation = gltf.animations.find(animation => animation.name.toLowerCase() === "idle");
            if (idleAnimation) handleAnimation(idleAnimation);
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
    // Scroll rotation event
    window.addEventListener('scroll', getScrollFraction);
    // Move event
    window.addEventListener('mousemove', setTouchPosition);
    window.addEventListener('mouseout', clearTouchPosition);
    window.addEventListener('mouseleave', clearTouchPosition);
    // Click event
    window.addEventListener('click', () => handleClick(intersectedObject));
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
}

function render() {
    // Get delta time (in seconds) from the clock
    const deltaTime = clock.getDelta();

    // Update
    stats.update();
    animationMixer ? animationMixer.update(deltaTime) : null;

    // Rotate bunny
    if (bunny) bunny.rotation.y = scrollFraction * Math.PI * -2;

    // Update hover
    touchSelector();

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

function handleAnimation(animation) {
    animationMixer = new THREE.AnimationMixer(bunny);
    animationAction = animationMixer.clipAction(animation);
    animationAction.play();
}

function getScrollFraction() {
    const scrollPosition = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollFraction = scrollPosition / maxScroll;
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
        handleClick(intersectedObject);
    }
    clearTouchPosition();
}

function handleClick(object) {
    if (object) {
        switch (object.name) {
            case 'bunny002_1':
                changeHTMLContent('Bunny Body');
                break;
            case 'bunny002_2':
                changeHTMLContent('Bunny Head');
                break;
            case 'bunny002_3':
                changeHTMLContent('Bunny Eye');
                break;
            default:
                changeHTMLContent('HTML Content');
                break;
        }
    } else {
        changeHTMLContent('HTML Content');
    }
}

function changeHTMLContent(content) {
    if (htmlContent) {
        for(let i = htmlContent.children.length - 1; i >= 0; i--) {
            htmlContent.children[i].innerHTML = content;
        }
    }
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

function touchSelector() {
    raycaster.setFromCamera(touchPosition, camera);
    if (bunny) {
        const intersects = raycaster.intersectObjects(bunny.children[0].children[0].children, true);
        if (intersects.length > 0) {
            if (intersectedObject !== intersects[0].object) {
                intersectedObject = intersects[0].object;
                document.body.style.cursor = 'pointer';
            }
        } else {
            if (intersectedObject !== null) {
                intersectedObject = null;
                document.body.style.cursor = 'default';
            }
        }
    }
}

init();