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
        roughnessmap: true,
        metalnessmap: true,
        emissivemap: true,
        normalmap: true,
        displacementmap: true,
    };
    gui.add(settings, 'roughnessmap').name('Roughness Map').onChange(updateMaterial);
    gui.add(settings, 'metalnessmap').name('Metalness Map').onChange(updateMaterial);
    gui.add(settings, 'emissivemap').name('Emissive Map').onChange(updateMaterial);
    gui.add(settings, 'normalmap').name('Normal Map').onChange(updateMaterial);
    gui.add(settings, 'displacementmap').name('Displacement Map').onChange(updateMaterial);

    function updateMaterial() {
        if (settings.roughnessmap) {
            modelClone.children[0].children[0].material.roughnessMap = roughnessTexture;
        } else {
            modelClone.children[0].children[0].material.roughnessMap = null;
        }
        if (settings.metalnessmap) {
            modelClone.children[0].children[0].material.metalness = 1;
            modelClone.children[0].children[0].material.metalnessMap = metalnessTexture;
        } else {
            modelClone.children[0].children[0].material.metalness = 0;
            modelClone.children[0].children[0].material.metalnessMap = null;
        }
        if (settings.emissivemap) {
            modelClone.children[0].children[0].material.emissive = new THREE.Color(0x888888);
            modelClone.children[0].children[0].material.emissiveMap = emissionTexture;
        } else {
            modelClone.children[0].children[0].material.emissive = new THREE.Color(0x000000);
            modelClone.children[0].children[0].material.emissiveMap = null;
        }
        if (settings.normalmap) {
            modelClone.children[0].children[0].material.normalMap = normalTexture;
        } else {
            modelClone.children[0].children[0].material.normalMap = null;
        }
        if (settings.displacementmap) {
            modelClone.children[0].children[0].material.displacementScale = 0.2;
            modelClone.children[0].children[0].material.displacementMap = displacementTexture;
        } else {
            modelClone.children[0].children[0].material.displacementMap = null;
        }
        modelClone.children[0].children[0].material.needsUpdate = true;
    }

    // Add GLB model
    const glbLoader = new GLTFLoader();
    let modelClone;
    glbLoader.load('../../models/bunny/11_textures_gltf/v12_bunny.gltf',
        (gltf) => {
            const model = gltf.scene;
            // Reposition to center
            model.position.y = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3()).y / -2;
            // Clone model
            modelClone = model.clone();
            modelClone.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                }
            });
            // Move to side
            model.position.x = -0.5;
            modelClone.position.x = 0.5;
            // Remove old textures
            modelClone.children[0].children[0].material.roughnessMap.dispose();
            modelClone.children[0].children[0].material.metalnessMap.dispose();
            modelClone.children[0].children[0].material.roughnessMap = null;
            modelClone.children[0].children[0].material.metalnessMap = null;
            updateMaterial();
            // Add to scene
            scene.add(model);
            scene.add(modelClone);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
        }
    );

    // Load new textures
    const colorTexture = new THREE.TextureLoader().load('../../models/bunny/11_textures_gltf/test_textures/body_Color.png');
    const roughnessTexture = new THREE.TextureLoader().load('../../models/bunny/11_textures_gltf/test_textures/body_Roughness.png');
    const metalnessTexture = new THREE.TextureLoader().load('../../models/bunny/11_textures_gltf/test_textures/body_Metallic.png');
    const emissionTexture = new THREE.TextureLoader().load('../../models/bunny/11_textures_gltf/test_textures/body_Emission.png');
    const normalTexture = new THREE.TextureLoader().load('../../models/bunny/11_textures_gltf/test_textures/body_Normal.png');
    const displacementTexture = new THREE.TextureLoader().load('../../models/bunny/11_textures_gltf/test_textures/body_Displacement.png');
    // Set texture properties
    // IMPORTANTE /////////////////////////////////////////////////////////////////////////////////////////////////
    colorTexture.flipY = false; ///////////////////////////////////////////////////////////////////////////////////
    roughnessTexture.flipY = false; ///////////////////////////////////////////////////////////////////////////////
    metalnessTexture.flipY = false; ///////////////////////////////////////////////////////////////////////////////
    emissionTexture.flipY = false; ////////////////////////////////////////////////////////////////////////////////
    normalTexture.flipY = false; //////////////////////////////////////////////////////////////////////////////////
    displacementTexture.flipY = false; ////////////////////////////////////////////////////////////////////////////

    colorTexture.colorSpace = THREE.SRGBColorSpace; ///////////////////////////////////////////////////////////////
    roughnessTexture.colorSpace = THREE.SRGBColorSpace; ///////////////////////////////////////////////////////////
    metalnessTexture.colorSpace = THREE.SRGBColorSpace; ///////////////////////////////////////////////////////////
    emissionTexture.colorSpace = THREE.SRGBColorSpace; ////////////////////////////////////////////////////////////
    normalTexture.colorSpace = THREE.SRGBColorSpace; //////////////////////////////////////////////////////////////
    displacementTexture.colorSpace = THREE.SRGBColorSpace; ////////////////////////////////////////////////////////
    // IMPORTANTE /////////////////////////////////////////////////////////////////////////////////////////////////

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

        // Render the scene
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', onResize, false);
    onResize();
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