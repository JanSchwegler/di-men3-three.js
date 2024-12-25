import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
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
    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 2);

    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Add stats
    let stats;
    stats = new Stats();
    document.body.appendChild( stats.dom );

    // Add GUI
    const gui = new GUI();
    let settings = {
        animation: 'Walk',
        animationOptions: ['Walk', 'Idle'],
        loop: false,
        restart: function() {
            if (animationMixer) {
                animationMixer.stopAllAction();
                if (settings.animation === 'Walk') {
                    actionWalk.play();
                } else if (settings.animation === 'Idle') {
                    actionIdle.play();
                }
            }
        },
        stop: function() {
            if (animationMixer) {
                animationMixer.stopAllAction();
            }
        }
    };
    gui.add(settings, 'animation', settings.animationOptions).name('Animation').onChange((value) => {
        if (animationMixer) {
            if (value === 'Walk') {
                actionWalk.time = 0;
                actionWalk.stop();
                actionIdle.crossFadeTo(actionWalk, 0.5).play();
            } else if (value === 'Idle') {
                actionIdle.time = 0;
                actionIdle.stop();
                actionWalk.crossFadeTo(actionIdle, 0.5).play();
            }
        }
    });
    gui.add(settings, 'loop').name('Loop').onChange(setLoop);
    gui.add(settings, 'restart').name('Restart');
    gui.add(settings, 'stop').name('Stop');

    // Add GLB model
    const glbLoader = new GLTFLoader();
    let model, animations, animationMixer, actionIdle, actionWalk;
    glbLoader.load('../../models/bunny/12_animations.glb',
        (gltf) => {
            model = gltf.scene;
            animations = gltf.animations;
            animationMixer = new THREE.AnimationMixer(model);
            actionWalk = animationMixer.clipAction(animations[0]);
            actionIdle = animationMixer.clipAction(animations[1]);
            // Reposition to center
            model.position.y = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3()).y / -2;
            // Add to scene
            scene.add(model);
            setLoop(settings.loop);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
        }
    );

    // GUI functions
    function setLoop(value) {
        if (animationMixer) {
            actionWalk.setLoop(value ? THREE.LoopRepeat : THREE.LoopOnce);
            actionIdle.setLoop(value ? THREE.LoopRepeat : THREE.LoopOnce);
        }
    }

    // Add orbit controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents( window );
    orbitControls.enableDamping = true;
    orbitControls.enablePan = false;
    orbitControls.maxDistance = 10;
    orbitControls.minDistance = 0.5;

    // render loop
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(render);
    function render() {
        // Get delta time (in seconds) from the clock
        const deltaTime = clock.getDelta();

        // Update
        orbitControls.update();
        stats.update();
        animationMixer ? animationMixer.update(deltaTime) : null;

        // Render the scene
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', onResize, false);
    onResize();
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