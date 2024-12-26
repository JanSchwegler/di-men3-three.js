import './style.scss';
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.5, 10);
    camera.position.set(0, 0, 5);

    // Add stats
    let stats;
    stats = new Stats();
    document.body.appendChild( stats.dom );

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 8;

    // Add GUI
    const gui = new GUI();
    let settings = {
        lightBrightness: 1,
        shape: 'TorusKnot',
        shapeOptions: {
            TorusKnot: [],
            Sphere: [],
            Box: [],
            Cone: [],
            Cylinder: [],
            Torus: [],
            Dodecahedron: [],
        },
        material: 'Basic',
        materialOptions: {
            Basic: ['color', 'wireframe'],
            Lambert: ['color', 'emissive', 'flatShading', 'wireframe'],
            Phong: ['color', 'emissive', 'specular', 'shininess', 'flatShading', 'wireframe'],
            Toon: ['color', 'emissive', 'flatShading', 'wireframe'],
            Standard: ['color', 'emissive', 'metalness', 'roughness', 'flatShading', 'wireframe'],
            Physical: ['color', 'emissive', 'metalness', 'roughness', 'clearcoat', 'clearcoatRoughness', 'flatShading', 'wireframe'],
            Matcap: ['color', 'flatShading', 'wireframe'],
            Depth: ['wireframe'],
            Normal: ['flatShading', 'wireframe'],
        },
        color: '#66ffcc',
        emissive: '#000000',
        specular: '#111111',
        shininess: 30,
        metalness: 0,
        roughness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0,
        flatShading: false,
        wireframe: false,
        resetOrbit: function () {
            controls.reset();
        }
    };
    function updateMaterialOptions(material) {
        clearMaterialOptions()
        material.slice(1).forEach((option) => {
            if (option === 'color') folder.addColor(settings, option).name('Color').onChange(updateMaterial);
            if (option === 'emissive') folder.addColor(settings, option).name('Emissive').onChange(updateMaterial);
            if (option === 'specular') folder.addColor(settings, option).name('Specular').onChange(updateMaterial);
            if (option === 'shininess') folder.add(settings, option, 1, 100, 1).name('Shininess').onChange(updateMaterial);
            if (option === 'metalness') folder.add(settings, option, 0, 1, 0.01).name('Metalness').onChange(updateMaterial);
            if (option === 'roughness') folder.add(settings, option, 0, 1, 0.01).name('Roughness').onChange(updateMaterial);
            if (option === 'clearcoat') folder.add(settings, option, 0, 1, 0.01).name('Clearcoat').onChange(updateMaterial);
            if (option === 'clearcoatRoughness') folder.add(settings, option, 0, 1, 0.01).name('Clearcoat Roughness').onChange(updateMaterial);
            if (option === 'flatShading') folder.add(settings, option).name('Flat Shading').onChange(updateMaterial);
            if (option === 'wireframe') folder.add(settings, option).name('Wireframe').onChange(updateMaterial);
        });
    }
    function clearMaterialOptions() {
        for (let i = folder.controllers.length - 1; i >= 0; i--) {
            folder.controllers[i].destroy();
        }
    }
    function updateMaterial() {
        if (object.material.color) object.material.color.set(settings.color);
        if (object.material.emissive) object.material.emissive.set(settings.emissive);
        if (object.material.specular) object.material.specular.set(settings.specular);
        if (object.material.shininess !== undefined) object.material.shininess = settings.shininess;
        if (object.material.metalness !== undefined) object.material.metalness = settings.metalness;
        if (object.material.roughness !== undefined) object.material.roughness = settings.roughness;
        if (object.material.clearcoat !== undefined) object.material.clearcoat = settings.clearcoat;
        if (object.material.clearcoatRoughness !== undefined) object.material.clearcoatRoughness = settings.clearcoatRoughness;
        if (object.material.flatShading !== undefined) object.material.flatShading = settings.flatShading;
        if (object.material.wireframe !== undefined) object.material.wireframe = settings.wireframe;
        object.material.needsUpdate = true;
    }
    gui.add(settings, 'shape', settings.shapeOptions).name('Shape').onChange(
        (value) => {
            console.log(value);
            object.geometry.dispose();
            object.geometry = value[0];
            object.needsUpdate = true;
        }
    );
    gui.add(settings, 'material', settings.materialOptions).name('Material').onChange(
        (value) => {
            object.material = value[0];
            updateMaterial();
            updateMaterialOptions(value);
            object.material.flatShading = settings.flatShading;
            object.material.needsUpdate = true;
        }
    );
    const folder = gui.addFolder('Material Options');
    gui.add(settings, 'lightBrightness', 0, 3, 0.1).name('Light Brightness').onChange(
        (value) => {
            light.intensity = value;
        }
    );
    gui.add(settings, 'resetOrbit').name('Reset Orbit');

    // Add light
    const light = new THREE.DirectionalLight(0xffffff, settings.lightBrightness);
    light.position.set(1, 1, 1);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
    scene.add(ambientLight);

    // Add object
    // Add shapes
    settings.shapeOptions.TorusKnot.push(new THREE.TorusKnotGeometry(1, 0.3, 48, 16));
    settings.shapeOptions.Sphere.push(new THREE.SphereGeometry(1, 16, 8));
    settings.shapeOptions.Box.push(new THREE.BoxGeometry(2, 2, 2));
    settings.shapeOptions.Cone.push(new THREE.ConeGeometry(1, 2, 16));
    settings.shapeOptions.Cylinder.push(new THREE.CylinderGeometry(1, 1, 2, 16));
    settings.shapeOptions.Torus.push(new THREE.TorusGeometry(1, 0.3, 16, 100));
    settings.shapeOptions.Dodecahedron.push(new THREE.DodecahedronGeometry(1.2));
    // Add materials
    settings.materialOptions.Basic.unshift(new THREE.MeshBasicMaterial({ color: settings.color }));
    settings.materialOptions.Lambert.unshift(new THREE.MeshLambertMaterial({ color: settings.color }));
    settings.materialOptions.Phong.unshift(new THREE.MeshPhongMaterial({ color: settings.color }));
    settings.materialOptions.Toon.unshift(new THREE.MeshToonMaterial({ color: settings.color }));
    settings.materialOptions.Standard.unshift(new THREE.MeshStandardMaterial({ color: settings.color }));
    settings.materialOptions.Physical.unshift(new THREE.MeshPhysicalMaterial({ color: settings.color }));
    settings.materialOptions.Matcap.unshift(new THREE.MeshMatcapMaterial({ color: settings.color }));
    settings.materialOptions.Depth.unshift(new THREE.MeshDepthMaterial());
    settings.materialOptions.Normal.unshift(new THREE.MeshNormalMaterial());
    // load initial object
    let object = new THREE.Mesh(settings.shapeOptions[settings.shape][0], settings.materialOptions[settings.material][0]);
    updateMaterialOptions(settings.materialOptions[settings.material]);
    scene.add(object);

    // render loop
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(render);
    function render() {
        // Get delta time (in seconds) from the clock
        const deltaTime = clock.getDelta();

        // Stats
        stats.update();
        controls.update();

        // Render the scene
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', onResize, false);
    onResize();
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