import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

let scene, camera, renderer, light, lightHelper, plane, cube, sphere, bunny;
let clock, orbitControls, transformControls, gizmo, stats;
let gui, envMap;
const canvas = document.querySelector('#canvas');

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
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 2, 6);

    // Add RectAreaLightUniformsLib
    RectAreaLightUniformsLib.init();

    // Add stats
    stats = new Stats();
    document.body.appendChild( stats.dom );

    // Add orbit controls
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents( window );
    orbitControls.enableDamping = true;
    orbitControls.enablePan = false;
    orbitControls.maxDistance = 35;
    orbitControls.minDistance = 0.5;

    // Add transform Controls
    transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.size = 0.3;
    transformControls.addEventListener('dragging-changed', function (event) {
        orbitControls.enabled = !event.value;
    });
    gizmo = transformControls.getHelper();
    scene.add(gizmo);

    // Add Objects
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    //planeMaterial.side = THREE.DoubleSide;
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    plane.castShadow = true;
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, 0.5, 0);
    cube.receiveShadow = true;
    cube.castShadow = true;
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 1, roughness: 0.1 });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(2, 0.8, 0);
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    scene.add(sphere);

    const glbLoader = new GLTFLoader(loadingManager);
    glbLoader.load('../../models/bunny/12_animations.glb',
        (gltf) => {
            bunny = gltf.scene;
            bunny.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    node.material.side = 0;
                }
            });
            scene.add(bunny);
        }
    );

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
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
  
    const lightFolder = gui.addFolder('Light');
    const lightTypes = {
        'Ambient': THREE.AmbientLight,
        'Hemisphere': THREE.HemisphereLight,
        'Point': THREE.PointLight,
        'Directional': THREE.DirectionalLight,
        'Spot': THREE.SpotLight,
        'Rect Area': THREE.RectAreaLight,
    };
  
    const lightSettings = {
        type: 'Directional',
        intensity: 1,
        color: 0xffffff,
        groundColor: 0x000000,
        positionX: 0,
        positionY: 3,
        positionZ: 0,
        targetX: 0,
        targetY: 0.6,
        targetZ: 0,
        distance: 10,
        angle: Math.PI / 8,
        penumbra: 0,
        decay: 1,
        width: 3,
        height: 3,
        rotateX: Math.PI / -2,
        rotateY: 0
    };
  
    lightFolder.add(lightSettings, 'type', Object.keys(lightTypes)).onChange(updateLight);
    lightFolder.add(lightSettings, 'intensity', 0, 2).onChange(value => light.intensity = value);
    lightFolder.addColor(lightSettings, 'color').onChange(value => light.color.setHex(value));
  
    const shadowFolder = gui.addFolder('Shadows');
    const shadowSettings = {
        mapSize: 100,
        type: 'BasicShadowMap'
    };
  
    shadowFolder.add(shadowSettings, 'mapSize', 1, 100, 1).onChange(updateShadowMapSize);
    shadowFolder.add(shadowSettings, 'type', ['BasicShadowMap', 'PCFShadowMap', 'PCFSoftShadowMap', 'VSMShadowMap']).onChange(updateShadowType);
  
    const envFolder = gui.addFolder('Environment');
    const envSettings = {
        useEnvMap: false,
        HDRI: 'Studio',
        hdris: ['Studio','City','Sky'],
        envMaps: []
    };

    const exrLoader = new EXRLoader(loadingManager);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const loadHDRIs = (hdris) => {
        const loadPromises = hdris.map((file) => {
            return new Promise((resolve, reject) => {
                const fullPath = `../../hdri/${file}.exr`;
                exrLoader.load(fullPath, (texture) => {
                    envSettings.envMaps.push(pmremGenerator.fromEquirectangular(texture).texture);
                    texture.dispose();
                    resolve(); // Resolve the promise when done
                }, undefined, (error) => {
                    console.error(`Error loading: ${fullPath}`, error);
                    reject(error); // Reject the promise on error
                });
            });
        });

        return Promise.all(loadPromises)
            .then(() => {
                console.log('All HDRIs loaded');
            })
            .catch((error) => {
                console.error('Error loading HDRIs:', error);
            });
    };
    loadHDRIs(envSettings.hdris);


    envFolder.add(envSettings, 'useEnvMap').listen().onChange(toggleEnvMap);
    envFolder.add(envSettings, 'HDRI', envSettings.hdris).onChange(changeEnvMap);
  
    function updateLight() {
        scene.remove(light);
        transformControls.detach();
        if (lightHelper) scene.remove(lightHelper);

        light = new lightTypes[lightSettings.type](lightSettings.color, lightSettings.intensity);
        light.position.set(lightSettings.positionX, lightSettings.positionY, lightSettings.positionZ);
        
        if (light.target) {
            light.target.position.set(lightSettings.targetX, lightSettings.targetY, lightSettings.targetZ);
        }

        if (light.shadow) {
            light.castShadow = true;
        }

        for (let i = lightFolder.controllers.length - 1; i >= 3; i--) {
            lightFolder.controllers[i].destroy();
        }

        scene.add(light);

        // Add appropriate helper based on light type
        switch(lightSettings.type) {
            case 'Ambient':
                lightHelper = null;
                break;
            case 'Directional':
                lightHelper = new THREE.DirectionalLightHelper(light, 1);
                break;
            case 'Hemisphere':
                lightHelper = new THREE.HemisphereLightHelper(light, 1);
                lightFolder.addColor(lightSettings, 'groundColor').onChange(value => light.groundColor.setHex(value));
                light.groundColor = new THREE.Color(lightSettings.groundColor);
                break;
            case 'Point':
                lightHelper = new THREE.PointLightHelper(light, 1);
                lightFolder.add(lightSettings, 'distance', 0, 100).onChange(value => light.distance = value);
                lightFolder.add(lightSettings, 'decay', 1, 2).onChange(value => light.decay = value);
                light.distance = lightSettings.distance;
                light.decay = lightSettings.decay;
                break;
            case 'Spot':
                lightHelper = new THREE.SpotLightHelper(light);
                lightFolder.add(lightSettings, 'distance', 0.1, 10).onChange(value => light.distance = value);
                lightFolder.add(lightSettings, 'angle', 0, Math.PI / 2).onChange(value => light.angle = value);
                lightFolder.add(lightSettings, 'penumbra', 0, 1).onChange(value => light.penumbra = value);
                lightFolder.add(lightSettings, 'decay', 1, 2).onChange(value => light.decay = value);
                light.distance = lightSettings.distance;
                light.angle = lightSettings.angle;
                light.penumbra = lightSettings.penumbra;
                light.decay = lightSettings.decay;
                break;
            case 'Rect Area':
                lightHelper = new RectAreaLightHelper(light);
                light.add(lightHelper);
                light.lookAt( 0, 0, 0 );
                lightFolder.add(lightSettings, 'width', 1, 20).onChange(value => light.width = value);
                lightFolder.add(lightSettings, 'height', 1, 20).onChange(value => light.height = value);
                lightFolder.add(lightSettings, 'rotateX', -Math.PI, 0).onChange(value => light.rotation.x = value);
                lightFolder.add(lightSettings, 'rotateY', Math.PI / -2, Math.PI / 2).onChange(value => light.rotation.y = value);
                light.width = lightSettings.width;
                light.height = lightSettings.height;
                light.rotation.x = lightSettings.rotateX;
                light.rotation.y = lightSettings.rotateY;
                break;
        }

        if (lightHelper) {
            if (lightSettings.type != 'Rect Area') {
                scene.add(lightHelper);
            }
            transformControls.attach(light);
        } 
    }
    updateLight();
  
    function updateShadowMapSize(size) {
        let value = window.innerWidth > window.innerHeight ? window.innerWidth * size / 50 : window.innerHeight * size / 50;
        light.shadow.mapSize.width = value;
        light.shadow.mapSize.height = value;
        light.shadow.map = null;
    }
    updateShadowMapSize(shadowSettings.mapSize);
  
    function updateShadowType(type) {
        renderer.shadowMap.type = THREE[type];

        // Disable and re-enable shadow maps to force an update
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.enabled = true;

        // Force all materials to update
        scene.traverse((object) => {
            if (object.material) {
                object.material.needsUpdate = true;
            }
        });
        
        renderer.shadowMap.needsUpdate = true;
    }
  
    function toggleEnvMap(useEnvMap) {
        if (useEnvMap) {
            if (!envMap) {
                changeEnvMap(envSettings.hdris[0]);
            }
            scene.background = envMap;
            scene.environment = envMap;
        } else {
            scene.background = null;
            scene.environment = null;
        }
    }

    function changeEnvMap(envMapName) {
        envMap = envSettings.envMaps[envSettings.hdris.indexOf(envMapName)];
        envSettings.useEnvMap = true;
        scene.background = envMap;
        scene.environment = envMap;
    }
}

function render() {
    // Get delta time (in seconds) from the clock
    const deltaTime = clock.getDelta();

    // Update
    orbitControls.update();
    stats.update();
    if (lightHelper && light.type != 'RectAreaLight') {
        lightHelper.update();
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

init();