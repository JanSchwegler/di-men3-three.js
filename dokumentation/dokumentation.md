# Introduction <!-- omit from toc -->

This documentation provides a comprehensive guide to getting started with Three.js. It offers code snippets for the basic structure of a Three.js application, covering essential components like scenes, cameras, renderers, and objects. Additionally, it dives into specific features and techniques.

# Table of Content <!-- omit from toc -->

- [1. Setting Up the Development Environment for Three.js](#1-setting-up-the-development-environment-for-threejs)
  - [1.1. Step-by-Step Installation](#11-step-by-step-installation)
  - [1.2. Important Commands](#12-important-commands)
- [2. Linking Project Files](#2-linking-project-files)
  - [2.1. HTML](#21-html)
  - [2.2. Javascript](#22-javascript)
  - [2.3. SASS](#23-sass)
- [3. Create Code Exclusively for Development Hidden in the Final Build](#3-create-code-exclusively-for-development-hidden-in-the-final-build)
- [4. Basic Structure of a Minimal Three.js File](#4-basic-structure-of-a-minimal-threejs-file)
  - [4.1. Import](#41-import)
  - [4.2. Fallback / WebGL compatibility check](#42-fallback--webgl-compatibility-check)
  - [4.3. Scene](#43-scene)
  - [4.4. Camera](#44-camera)
  - [4.5. Objects](#45-objects)
  - [4.6. Renderer](#46-renderer)
- [5. Base Code](#5-base-code)
  - [5.1. index.html](#51-indexhtml)
  - [5.2. style.scss](#52-stylescss)
  - [5.3. main.js](#53-mainjs)
- [6. lil-gui (brwoser controls)](#6-lil-gui-brwoser-controls)
  - [6.1. Create fields](#61-create-fields)
  - [6.2. Include logic](#62-include-logic)
  - [6.3. Nested controllers](#63-nested-controllers)
- [7. Responsive Canvas](#7-responsive-canvas)
  - [7.1. Canvas Handling](#71-canvas-handling)
  - [7.2. Positioning the Camera to Keep the Object Fully Visible with Fixed Padding](#72-positioning-the-camera-to-keep-the-object-fully-visible-with-fixed-padding)
- [8. Nesting](#8-nesting)
  - [8.1. Supported Nestable Objects](#81-supported-nestable-objects)
  - [8.2. Passed Properties](#82-passed-properties)
  - [8.3. Example of Adding a Base Object and a Nested Object](#83-example-of-adding-a-base-object-and-a-nested-object)
  - [8.4. Bypassing Inheritance](#84-bypassing-inheritance)
- [9. Orbit, Pan \& Zoom](#9-orbit-pan--zoom)
  - [9.1. Disable functions](#91-disable-functions)
  - [9.2. Set Limits](#92-set-limits)
  - [9.3. Damping](#93-damping)
- [10. Load GLTF File](#10-load-gltf-file)
  - [10.1. Copying models](#101-copying-models)
- [11. Materials](#11-materials)
  - [11.1. Requirements](#111-requirements)
  - [11.2. Comparison](#112-comparison)
  - [11.3. General Settings](#113-general-settings)
    - [11.3.1. Shading](#1131-shading)
    - [11.3.2. Culling (Back-face culling)](#1132-culling-back-face-culling)
  - [11.4. Update Material](#114-update-material)
- [12. Load Textures](#12-load-textures)
  - [12.1. Load Texturemaps (jpg, png, etc.)](#121-load-texturemaps-jpg-png-etc)
  - [12.2. Texture Settings](#122-texture-settings)
    - [12.2.1. UV Maps](#1221-uv-maps)
    - [12.2.2. Magnification \& Minification](#1222-magnification--minification)
    - [12.2.3. Types](#1223-types)
    - [12.2.4. Formats](#1224-formats)
    - [12.2.5. Color Space](#1225-color-space)
    - [12.2.6. Compression](#1226-compression)
    - [12.2.7. LoadingManager](#1227-loadingmanager)
- [13. Animations](#13-animations)
  - [13.1. Quick overview](#131-quick-overview)
  - [13.2. Loaders](#132-loaders)
  - [13.3. Animation Clips](#133-animation-clips)
  - [13.4. Keyframe Tracks](#134-keyframe-tracks)
  - [13.5. Animation Mixer](#135-animation-mixer)
  - [13.6. Animation Action](#136-animation-action)
  - [13.7. Animation Object Groups](#137-animation-object-groups)
- [14. Lighting](#14-lighting)
  - [14.1. Shadows](#141-shadows)
    - [14.1.1. Renderer](#1411-renderer)
    - [14.1.2. Light Sources](#1412-light-sources)
    - [14.1.3. Objects](#1413-objects)
  - [14.2. Lights](#142-lights)
  - [14.3. Environment Map](#143-environment-map)
    - [Mapping Types](#mapping-types)
    - [Loading](#loading)
- [User Interaction](#user-interaction)
  - [Orbit Controls](#orbit-controls)
  - [Scroll](#scroll)
  - [Mouse \& Touch (Hover \& Click)](#mouse--touch-hover--click)
    - [15.1. mousemovement](#151-mousemovement)
    - [15.2. touchmovement](#152-touchmovement)
- [16. Todo Pages](#16-todo-pages)

# 1. Setting Up the Development Environment for Three.js

Before warking with three.js, I set up my developing environment. I used the recommended enviroment with the installation trough NPM and vite as the build tool, roughly described in the [three.js manual](https://threejs.org/docs/index.html#manual/en/introduction/Installation).

Before working with Three.js, it’s essential to set up a development environment that ensures a smooth workflow. The recommended approach is to use [NPM](https://www.npmjs.com/) for package management and [Vite](https://vitejs.dev/) as the build tool. This setup is outlined in the [Three.js manual](https://threejs.org/docs/index.html#manual/en/introduction/Installation). Follow the steps below to get started:

## 1.1. Step-by-Step Installation

1. **Install Node.js**

   Node.js comes with NPM (Node Package Manager) which is used to install, update and manage the pakages. It also create a "package.json" file that lists all used packages. With this file you can easily install the packages on another machine.

   - Download and install Node.js from the [official website](https://nodejs.org/).

2. **Create a New Project Directory**

   Create a New Project Directory.

3. **Open Terminal in IDE**

   - Open VS Code (or prefferd IDE) and its Terminal:
     ![Open Terminal](images/3_3_open_terminal.png)
   - If wanted, change the terminal to "Command Prompt":
     ![Change Terminal](images/3_3_select_terminal.png)
   - Navigate to the Project Directory.

     ```bash
     # Enter folder (autocomplete with "Tab"):
     cd di-men3-three.js

     # Leave folder:
     cd ..
     ```

4. **Install Three.js & Vite**

   Run follwoing commands in the Terminal to install the packages for Three.js and Vite:

   ```bash
   npm install --save three
   npm install --save-dev vite

   # optinally install SASS
   npm install -D sass

   # check installed packages
   npm list
   ```

5. **Configure Vite**

   Add a `vite.config.js` file to the root of your project and paste following code into it. The code defines to use [relativ path](https://vite.dev/guide/build.html#relative-base) with `base: ''` and adds [multiple enterypoints](https://vite.dev/guide/build.html#multi-page-app). For exaple `main: resolve(__dirname, 'index.html')`.

   ```bash
   import { resolve } from 'path';
   import { defineConfig } from 'vite';

   export default defineConfig({
     base: '',
     build: {
       rollupOptions: {
         input: {
           main: resolve(__dirname, 'index.html'),
           setup: resolve(__dirname, 'src/01_setup/setup.html'),
           line: resolve(__dirname, 'src/02_line/index.html'),
         }
       }
     }
   });
   ```

6. **Create Development Directory**

   In the Project direcory add one named "src" for all files.
   In this folder you can create an `index.html`, `style.css` and `main.js`. the main.js is nececarry for Three.js.

7. **Run and Build the Website**

    To see the index.html Page, you need to run the Vite Server. You also need to Build the Files to run idependent of the Server. The necessary commands are listed in the following capter.

## 1.2. Important Commands

- Move in the directory:

  ```bash
  # Enter folder (autocomplete with "Tab"):
  cd di-men3-three.js

  # Leave folder:
  cd ..
  ```

- Run Vite Develepment Server:

  ```bash
  npx vite dev
  ```

  [View page on `http://localhost:5173`](http://localhost:5173)

- Stop Vite Develepment Server:
  ```bash
  #Press Ctrl + C
  ```
- Build Page:
  ```bash
  npx vite build
  ```

# 2. Linking Project Files  
For a basic website, you need an `index.html`, `main.js`, and `style.css`.

## 2.1. HTML  
The HTML is structured normally with a link to the `main.js` file. If you link a CSS file directly, it should also be included. When using SASS, there’s no need to link the SASS file in the HTML, as you link it in the main.js.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>title</title>

    <!-- optioanal css link -->
    <link rel="stylesheet" href="style.css">

</head>
<body>
    <!-- js link -->
    <script type="module" src="main.js"></script>

</body>
</html>
```

## 2.2. Javascript
At the top of the JavaScript file, you import the SASS file:
```javascript
import '/style.scss';
```

## 2.3. SASS  
With Vite (if SASS is installed), no additional configuration is needed for SASS to work. However, the SASS file must be imported in the `main.js` file, as shown in the JavaScript section.

# 3. Create Code Exclusively for Development Hidden in the Final Build
To include code in the development environment that is excluded from the final build, you can use the following `if` statement:

```javascript
if (import.meta.env.DEV) {
  // Code to execute
}
```
In HTML, it can look like this:
```html
<script type="module">
  if (import.meta.env.DEV) {
    document.body.insertAdjacentHTML(
      'beforeend', // Options: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
      '<div id="dev-block"></div>'
    );
  }
</script>
```

# 4. Basic Structure of a Minimal Three.js File

This chapter outlines the fundamental components of a Three.js file. Using this code, you can display 3D objects on a website.

[In the next chapter](#5-base-code), you’ll find the complete base code for quick reference and copy-paste use.

## 4.1. Import

To use Three.js, import the necessary modules at the top of your file.

While Three.js offers the essential tools for 3D graphics, additional features such as controls, loaders, and effects are included in the addons directory. These addons do not require separate installation but must be explicitly imported when needed.

```javascript
import * as THREE from "three";
// Additional modules can be imported here
```

## 4.2. Fallback / WebGL compatibility check

Although rare, some devices or browsers may not support WebGL 2. Implementing a fallback ensures a better user experience.

```javascript
import WebGL from "three/addons/capabilities/WebGL.js";

if (!WebGL.isWebGL2Available()) {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
} else {
  createScene();
}
```

## 4.3. Scene

The scene acts as a container for all the objects, lights, and cameras.

![Three.js File](images/6_3_threejs-structure.svg)
[Image Source: threejs.org](https://threejs.org/manual/#en/fundamentals)

```javascript
const scene = new THREE.Scene();
```

## 4.4. Camera

The `PerspectiveCamera` is commonly used for 3D scenes.
There are two types:

- [PerspectiveCamera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)
- [OrthographicCamera](https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera)

```javascript
const camera = new THREE.PerspectiveCamera(
  75, // Field of view in degrees
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5; // Move the camera away from the origin
```

## 4.5. Objects

To display something in the scene, you need to add a 3D object. You can add your own or load a [primitive](https://threejs.org/manual/#en/primitives).

Remember the structure of an object: it requires geometry and material (or texture), both combined into a new mesh.

```javascript
// Object
// ├── Geometry (defines the shape)
// └── Material (defines the surface appearance)

const geometry = new THREE.BoxGeometry(); // Define the shape
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Define the surface appearance
const cube = new THREE.Mesh(geometry, material); // Combine shape and material
scene.add(cube); // Add the cube to the scene
```

## 4.6. Renderer

And finally, the renderer is responsible for rendering the scene and camera onto the screen. The `WebGLRenderer` is the default and most widely used renderer in Three.js.

```javascript
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Match the screen size
document.body.appendChild(renderer.domElement); // Attach the canvas to the document

// Later you render the Scene. If there is not only a still image, you have to create a loop
renderer.render(scene, camera); // Render the scene from the camera's perspective
```

# 5. Base Code
This base code features HTML, SASS and JavaScript files for copy-paste use.

## 5.1. index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script type="module" src="main.js"></script>
</body>
</html>
```

## 5.2. style.scss
```scss
/* reset */
* {
    box-sizing: border-box;
}

html, body, div, h1, h2, h3, h4, h5, h6, p, a, img, ul, ol, li, form, input, button {
    margin: 0;
    padding: 0;
    border: none;
    text-decoration: none;
}

/* colors */
$background-color: #d1d1d1;

/* Fonts */


/* style */
body {
    background-color: $background-color;
    min-height: 100vh;
    width: 100%;

    #canvas {
        height: 100vh;
        width: 100%;
        display: block;
    }
}
```
## 5.3. main.js
```javascript
import './style.scss';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// additional imports:
// import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Variables
let scene, camera, renderer, clock, bunny;
const canvas = document.querySelector('#canvas');

// Setup LoadingManager
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
    camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 2);

    // Load GLTF model
    const glbLoader = new GLTFLoader(loadingManager);
    glbLoader.load('../../models/bunny/12_animations.glb',
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

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // render loop
    clock = new THREE.Clock();
    renderer.setAnimationLoop(render);

    // Handle window resize
    window.addEventListener('resize', onResize, false);
    onResize();
}

function render() {
    // Get delta time (in seconds) from the clock
    const deltaTime = clock.getDelta();

    // Update
    // animationMixer.update(deltaTime) // update animation mixer
    // stats.update(); // update stats
    // orbitControls.update() // update orbit controls

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
```

# 6. lil-gui (brwoser controls)
[lil-gui](https://lil-gui.georgealways.com/) is a lightweight library for adding interactive controls to your project. It’s perfect for quickly tweaking parameters in real-time, making it ideal for debugging, prototyping, and creative coding. 

You can simply load it as an addon:
```javascript
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
```

After loading the addon, you can create a gui:
```javascript
const gui = new GUI();

// optionally add a title
gui.title('GUI-Title')
```

## 6.1. Create fields
Either define the varibales before adding them, often stored in an object:
```javascript
const settings = {
  setting1: "string",
  setting2: bool,
  setting3: 10
}

gui.add(settings, 'setting1');
gui.add(settings, 'setting2').name('Bool Flag'); // include name
gui.add(settings, 'setting3', 1 , 100, 1); // include min, max and steps

// use settings
let string: settings.setting1;
let bool: settings.setting2;
let value: settings.setting3;
```

Or modify directly in the gui:
```javascript
gui.add(camera.position, 'z', 1, 10).name('Camera Distance');
```

## 6.2. Include logic
Since changing the variables doesn't directly modify your 3D objects, you can incorporate additional logic:
```javascript
// insert code
gui.add(settings, 'brightness', 0, 100).name('Brightness').onFinishChange( value => {
	console.log( value );
});
// call function
gui.add(settings, 'numCubes', 1, 100, 1).name('Number of Cubes').onChange(resetCubes);
// on all changes
gui.onChange( event => {
  // readables:
	event.object     // object that was modified
	event.property   // string, name of property
	event.value      // new value of controller
	event.controller // controller that was modified

  console.log(event.object);
});
```

## 6.3. Nested controllers
Organize controllers with nested structures for better clarity. This is done using folders:
```javascript
// add folder to gui
const folder = gui.addFolder( 'Nested Settings' );
// add setting to folder
folder.add(nestedSettings, 'setting');
```

# 7. Responsive Canvas
A canvas has two sizes: its visible display size on the page and its internal pixel resolution. To maintain responsiveness, both sizes must be set and updated accordingly. Additionally, you can adjust the camera distance for fixed elements.

## 7.1. Canvas Handling
Ideally, you should create and style the canvas using HTML and CSS.
```html
<canvas id="canvas"></canvas>
<style>
  #canvas {
    height: 100vh;
    width: 100%;
    /* display block is important to eliminate the white border */
    display: block;
  }
</style>
```
In a function, both sizes are reset based on the canvas display size. In the main function, you add an event listener for the `resize` event and also call the function once during the initial load. (If you start and stop rendering, you may also add and remove the event listener to improve performance.)

Within the function, you read the new display size and set it as the render size (internal pixel resolution). Additionally, set the canvas `width` and `height` attributes to ensure the resolution matches the actual display size. Finally, correct the aspect ratio to eliminate any distortion.

Retina displays often create a mismatch between physical and browser-reported pixel sizes. This issue can be resolved for sharper renders at the cost of performance.

**Standard Calculation without Extra Resolution for Retina Displays**
```javascript
// Handle resizing of the window
window.addEventListener('resize', onResize, false);
onResize();

function onResize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Set renderer size and adjust canvas attributes
  renderer.setSize(width, height, false);
  canvas.width = width;
  canvas.height = height;

  // Update camera aspect ratio and projection matrix
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
}
``` 

**Enhanced resolution based on the device's actual pixel ratio, limited to 4x for performance reasons.**
```javascript
// Handle resizing of the window
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
}
``` 

## 7.2. Positioning the Camera to Keep the Object Fully Visible with Fixed Padding
Due to the manual definition of object size and padding, this solution is not recommended for pages with zoomable websites.

During window resizing, the camera’s Z position is also adjusted to ensure the object remains visible with the correct padding. This adjustment is based on the camera’s FOV and the aspect ratio of the viewport. Before performing the calculation, you need to define the object's `width`, `height`, and `padding` to ensure accurate results.

```javascript
const objectWidth = 1;
const objectHeight = 1;
const padding = 1;
```

To start, ignore the aspect ratio and calculate the distance using only the FOV, object size, and padding. This is done with a tangent calculation. (Technically, this calculates the distance for an aspect ratio of 1, which corresponds to a square viewport.)

![Calculation sketch](images/5_2_calculation.jpg)

You halve the FOV to form a right triangle. With this, you can now calculate the height:

$$
\text{height} = \tan\left(\frac{\text{length of the opposite side}}{\text{FOV angle}}\right)
$$

- To calculate the FOV angle, first convert the FOV from degrees to radians and then halve it:

$$
\text{FOV angle (radians)} = \frac{\frac{\text{FOV (degrees)} \times \pi}{180}}{2}
$$

- For the opposite side, take half of the object's width or height and add the padding. To ensure the object fits in the viewport, use the width if the aspect ratio is portrait, and the height if the aspect ratio is landscape:

$$
\text{Opposite side} = \frac{\text{Object width or height}}{2} + \text{Padding}
$$

After the calculation, simply divide the result by the aspect ratio when the browser is in portrait mode to adjust for the aspect ratio.

**In code, this looks like this:**

You can use a separate function to handle the camera movement, which is called from within the resize function. With high FOV values, the camera may move very close to the object in order to spread, for example, a 180° view across the screen. To prevent the camera from intersecting with the object, there is a minimum distance value of 1.

```javascript
function onResize() {
  adjustCameraToObject();
}

function adjustCameraToObject() {
  // set dimensions and padding
  const objectWidth = 1;
  const objectHeight = 1;
  const padding = 1;
  // get new camera aspect ratio
  const aspectRatio = camera.aspect;
  // get camera fov in radiants
  const fov = camera.fov * (Math.PI / 180);
  // initialize distance to use later on
  let distance;

  if (aspectRatio > 1) { // Landscape mode
      // calculate distance with height and set min to 1
      distance = Math.max((objectHeight / 2 + padding) / Math.tan(fov / 2), 1);
  } else { // Portrait mode
      // calculate distance with width and set min to 1
      distance = Math.max((objectWidth / 2 + padding) / Math.tan(fov / 2) / aspectRatio, 1);
  }
  camera.position.z = distance;
}
```

# 8. Nesting
Nesting in Three.js allows you to group objects under a parent, simplifying the management of complex structures. When a parent object is transformed (position, rotation, scale), its child objects inherit those transformations.

## 8.1. Supported Nestable Objects
You can nest any Three.js object, including:
- Meshes
- Groups
- Cameras
- Lights
- Helpers
- Custom Objects

## 8.2. Passed Properties
- **Position**: Child positions are relative to the parent.
- **Rotation**: Child rotations are combined with the parent's.
- **Scale**: Parent scale applies proportionally to children.

This means changes to the parent automatically propagate to the children.

## 8.3. Example of Adding a Base Object and a Nested Object
```javascript
const parent = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const child = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

scene.add(parent); // Add parent at root
parent.add(child); // Nest child under parent
child.position.set(1, 1, 0); // Position relative to parent
```

## 8.4. Bypassing Inheritance
If you need to bypass these transformations and set a child’s position in world space, you can detach it temporarily or transform the world position to the parent’s local space:

```javascript
// Set child position based on world coordinates
const targetWorldPosition = new THREE.Vector3(3, 2, 5);
const localPosition = parent.worldToLocal(targetWorldPosition.clone());
child.position.copy(localPosition);
```

Or, temporarily detach to set world position directly:

```javascript
scene.attach(child); // Temporarily remove from parent
child.position.set(3, 2, 5); // Set world position
parent.attach(child); // Reattach to parent
```

After reattaching, the child will retain its visual position but its coordinates will update to match the parent’s local space. This behavior ensures a consistent relationship in the hierarchy.

# 9. Orbit, Pan & Zoom
The [OrbitControls library](https://threejs.org/docs/index.html#examples/en/controls/OrbitControls) provides an easy way to orbit, pan, and zoom the camera using mouse or touch input.

``` javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

Since these controls manipulate the camera, when created, the controller is automatically bound to the camera. For the listeners to work properly, it's necessary to link the canvas to the controls. Additionally, you can optionally listen for window-level inputs, such as resizing or key presses, to ensure the camera and controls behave correctly across various events.

``` javascript
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents( window );
```

When the user interacts with the camera through touch, the camera updates automatically. However, if you are animating or updating the camera (for example, with damping, smooth zoom, or auto-rotation) without direct user input, you must explicitly call the `controls.update()` function within the animation loop to ensure the camera's position and orientation are properly updated.

``` javascript
renderer.setAnimationLoop(render);
function render() {
    controls.update(); // controls update function
    renderer.render(scene, camera);
}
```

## 9.1. Disable functions
Out of the box, orbit, pan, and zoom are enabled. You can easily disable them by:

``` javascript
controls.enableRotate = false; // Disable rotation
controls.enableZoom = false;   // Disable zooming
controls.enablePan = false;    // Disable panning
```

## 9.2. Set Limits
For all the settings, you can set limits such as:

``` javascript
controls.maxDistance = 100;           // Limit the zoom out distance
controls.minDistance = 1;             // Limit the zoom in distance
controls.maxPolarAngle = Math.PI / 2; // Limit the vertical rotation (no flipping)
```

## 9.3. Damping
For a smoother orbit and pan, it is recommended to set this setting to `true`. Additionally, it's important to update the camera controls every frame to account for the post-touch smoothing.

``` javascript
controls.enableDamping = true; // Smooths the movement
controls.dampingFactor = 0.05; // The damping speed (default: 0.05)

// controls.update();
renderer.setAnimationLoop(render);
function render() {
    controls.update();
    renderer.render(scene, camera);
}
```

# 10. Load GLTF File
To load a custom 3D model, use a `.glb` or `.gltf` file. A `.glb` file contains all assets, like UV maps and textures, in one file. In contrast, a `.gltf` file stores the model separately, along with additional `.bin` and texture files. For simplicity, using a `.glb` file is recommended.

Export your model from Blender via `Export > glTF 2.0`. In the export menu, you can choose between `.glb` or `.gltf`, and adjust other settings as needed.

![GLTF Export](images/gltf_export.png)

Import the GLTF loader to load the 3D model:
``` javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
```

Create a new loader and load the model. For both `.glb` and `.gltf` files, load only the main `.gltf` file. Any additional files, like `.bin` or textures, are loaded automatically.

The `(gltf) => {}` function waits until the model is fully loaded, ensuring all resources are available on execution.

The `(xhr) => {}` function runs during the loading process and can handle tasks for the loading duration. In this example, it logs the loading percentage.

The `(error) => {}` function is triggered if an error occurs. In this example, it logs the error to the console.

``` javascript
const glbLoader = new GLTFLoader();
glbLoader.load('yourPath/yourModel.glb',
  (gltf) => {
      model = gltf.scene;
      scene.add(model);
  },
  (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
      console.error('An error happened', error);
  }
);
```
When loading textures manually, please refer to the section about textures to ensure they are displayed correctly.

## 10.1. Copying models
Linking or creating a new variable that points to another object does not create a copy - it links to the original. To create an actual copy, use `.clone()`. 

Since a 3D model consists of multiple meshes and textures, all of them must be cloned. Without cloning them, changes to one material will affect both the original and the cloned object.

The following code creates a clone, loops through all children, and clones all of its materials:
``` javascript
const model = gltf.scene;
model = model.clone();
model.traverse((child) => {
  if (child.isMesh) {
    child.material = child.material.clone();
  }
});
```

# 11. Materials
In Three.js, there are different types of materials, most of which are also found in other 3D programs. (This section focuses on the first six "normal color materials" and does **not** cover the specialized materials in the second list).

- [MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)
- [MeshLambertMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshLambertMaterial)
- [MeshPhongMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial)
- [MeshToonMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshToonMaterial)
- [MeshStandartMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)
- [MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial)


Specialized Materials:
- [PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial)
- [LineBasicMaterial](https://threejs.org/docs/#api/en/materials/LineBasicMaterial)
- [LineDashedMaterial](https://threejs.org/docs/#api/en/materials/LineDashedMaterial)
- [SpriteMaterial](https://threejs.org/docs/#api/en/materials/SpriteMaterial)
- [MeshDistanceMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshDistanceMaterial)
- [MeshDepthMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshDepthMaterial)
- [MeshMatcapMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshMatcapMaterial)
- [MeshNormalMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshNormalMaterial)
- [ShadowMaterial](https://threejs.org/docs/index.html#api/en/materials/ShadowMaterial)
- [ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)
- [RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)

## 11.1. Requirements
"Normal color materials" **require a light source** in the scene because they rely on light calculations. The exception is `MeshBasicMaterial`, which displays a uniform color and does not perform any light calculations, so no light source is necessary. Naturally, these materials must also be linked to a displayed mesh.

Example with lights and `MeshLambertMaterial`:
``` javascript
// Add light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(light);
scene.add(ambientLight);
// Add cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial( { color: 0x999999 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
```

## 11.2. Comparison
Here is a list of materials arranged by their complexity and rendering requirements. Although they share similar settings and features, each material introduces unique properties for achieving more realistic rendering.

| **Material**                                                                                      | **Supports Lighting** | **Unique Properties**                                                                            |
| ------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------ |
| [MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)       | ❌                     |                                                                                                  |
| [MeshLambertMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshLambertMaterial)   | ✅                     | `emissive`                                                                                       |
| [MeshPhongMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial)       | ✅                     | `emissive`, `specular`, `shininess`                                                              |
| [MeshToonMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshToonMaterial)         | ✅                     | `emissive`                                                                                       |
| [MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) | ✅                     | `emissive`, `metalness`, `roughness`                                                             |
| [MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial) | ✅                     | `emissive`, `metalness`, `roughness`, `clearcoat`, `clearcoatRoughness`, `sheen`, `transmission` |

## 11.3. General Settings
Here are some general settings to consider, regardless of the material choice:

### 11.3.1. Shading
Determines whether the object appears faceted or smooth. The default is `false`.

```javascript
object.material.flatShading = false;
mesh.material.needsUpdate = true;
```

### 11.3.2. Culling (Back-face culling)
There are three diffrend modes to show the faces. The default is `THREE.FrontSide`. Other options are `THREE.BackSide` and `THREE.DoubleSide`.
```javascript
object.material.side = THREE.FrontSide;
mesh.material.needsUpdate = true;
```

## 11.4. Update Material
Some material changes update automatically, but for more resource-intensive adjustments, the material must be refreshed manually:
```javascript
mesh.material.needsUpdate = true;
```

Manual refresh is required for:
- Shading
- Adding or removing a texture

# 12. Load Textures

Loading image textures is a complex topic with many details to consider. It's highly recommended to load models with all assets, including UV maps, textures, etc., as GLTF files handle these automatically when stored in the file (see the section on loading GLTF models). This approach simplifies the workflow and ensures that necessary settings are saved within the GLTF file.

However, when replacing or manually adding new assets to the model, these settings **do not** apply to the new textures. Even if manual changes in Three.js are not involved, it's important to understand the settings and apply them as needed.

For more information, refer to the [Overview](https://threejs.org/manual/#en/textures) & [Settings](https://threejs.org/docs/index.html#api/en/constants/Textures)

## 12.1. Load Texturemaps (jpg, png, etc.)
The `TextureLoader` does not require any additional addons and is included with base Three.js. It is recommended to first load textures into variables (for compressed textures, an extra decompression `Loader` is needed). For Three.js to read the textures correctly, the following settings are required:

- **Flip Texture**: Three.js automatically flips textures vertically. To prevent the texture from being mirrored (which would misalign it with the UV map), set this to `false`.
- **Color Space**: Set the color space to `sRGB` for colored textures (default is `""`). Without this setting, Three.js may misinterpret color values, resulting in incorrect lighting calculations or overly bright/dark textures.

  Textures that should **NOT** use `sRGB`:

  - Normal maps
  - Height maps
  - Roughness maps
  - Metalness maps
  - Any texture storing non-color data

  For these, use `THREE.NoColorSpace` or leave it undefined.

Example of loading and configuring textures:
``` javascript
// Load new textures
const colorTexture = new THREE.TextureLoader().load('path/textureColor.png');
const roughnessTexture = new THREE.TextureLoader().load('path/textureRoughness.png');
const metalnessTexture = new THREE.TextureLoader().load('path/textureMetallic.png');
const emissionTexture = new THREE.TextureLoader().load('path/textureEmission.png');
const normalTexture = new THREE.TextureLoader().load('path/textureNormal.png');
const displacementTexture = new THREE.TextureLoader().load('path/textureDisplacement.png');
const alphaTexture = new THREE.TextureLoader().load('path/textureAlpha.png');
// Set flipY
colorTexture.flipY = false;
roughnessTexture.flipY = false;
metalnessTexture.flipY = false;
emissionTexture.flipY = false;
normalTexture.flipY = false;
displacementTexture.flipY = false;
alphaTexture.flipY = false;
// Set Color Space (for the two colored textures)
colorTexture.colorSpace = THREE.SRGBColorSpace;
emissionTexture.colorSpace = THREE.SRGBColorSpace;
// Apply textures (some textures require an other value for the texture to work)
model.children[0].material.map = colorTexture;
model.children[0].material.roughnessMap = roughnessTexture;
model.children[0].material.metalness = 1;
model.children[0].material.metalnessMap = metalnessTexture;
model.children[0].material.emissive = new THREE.Color(0xffffff);
model.children[0].material.emissiveMap = emissionTexture;
model.children[0].material.normalMap = normalTexture;
model.children[0].material.displacementMap = displacementTexture;
model.children[0].material.transparent = true;
model.children[0].material.alphaMap = alphaTexture;
```

## 12.2. Texture Settings

### 12.2.1. UV Maps
There is nothing special about UV maps in Three.js. When using textures, it is important to ensure that UV maps are properly set up beforehand. 
- Imported models will typically include their UV maps, 
- while Three.js preset geometries also come with default UV maps.

### 12.2.2. Magnification & Minification
It's almost impossible for a camera to see and render a texture at its original pixel size. Magnification and minification refer to how textures are rendered when viewed at different scales. Magnification occurs when a texture is displayed larger than its original resolution, while minification happens when it is displayed smaller. In Three.js, these processes are controlled by texture filtering methods, which determine how pixel information is interpolated or averaged. [Three.js provides a useful visual comparison.](https://threejs.org/manual/#en/textures)

Magnification:

| **Filter**            | **Filter Code** | **Description**                                                                |
| --------------------- | --------------- | ------------------------------------------------------------------------------ |
| `THREE.NearestFilter` | 1003            | Displays textures with sharp, pixelated edges. Creates flickering when moving. |
| `THREE.LinearFilter`  | 1006            | Smoothly interpolates between texture pixels.                                  |

**For most cases `THREE.LinearFilter` is recommended.**

``` javascript
model.children[0].material.map.magFilter = THREE.LinearFilter;
model.children[0].material.map.needsUpdate = true;
```

Minification:

Before looking at the filters, we look at Mips. Mips are copies of the texture, each half the width and height of the previous mip, where the pixels have been blended to create the smaller mip. Mips are generated until a 1x1 pixel mip is reached. The resulting mips might look something like this:

![Mipmap](images/mipmap.png)

[Image: © Three.js](https://threejs.org/manual/#en/textures)

The minification filters are ordered by quality and performance. At the top is the simplest filter, while the bottom offers the best visual quality. `THREE.NearestFilter` produces the most visible flickering at a distance, while `THREE.LinearMipMapLinearFilter` provides the smoothest result.

| **Filter**                         | **Filter Code** | **Description**                                                        |
| ---------------------------------- | --------------- | ---------------------------------------------------------------------- |
| `THREE.NearestFilter`              | 1003            | Choose the closest pixel in the texture, no mipmapping.                |
| `THREE.LinearFilter`               | 1006            | Choose 4 pixels from the texture and blend them, no mipmapping.        |
| `THREE.NearestMipMapNearestFilter` | 1004            | Choose the appropriate mip then choose one pixel.                      |
| `THREE.NearestMipMapLinearFilter`  | 1005            | Choose 2 mips, choose one pixel from each, blend the 2 pixels.         |
| `THREE.LinearMipMapNearestFilter`  | 1007            | Chose the appropriate mip then choose 4 pixels and blend them.         |
| `THREE.LinearMipMapLinearFilter`   | 1008            | Choose 2 mips, choose 4 pixels from each and blend all 8 into 1 pixel. |

**For simpler scenes, the bottom filter, `THREE.LinearMipMapLinearFilter`, is recommended.** For faster minification, use `THREE.LinearMipMapNearestFilter` or even `THREE.NearestMipMapLinearFilter`.

``` javascript
model.children[0].material.map.minFilter = THREE.LinearMipMapLinearFilter;
model.children[0].material.map.needsUpdate = true;
```

### 12.2.3. Types
The texture type primarily affects how the data is stored and processed in WebGL after loading. When loading standard image formats (PNG, JPEG, etc.), you don't need to specify a type - `UnsignedByteType` will work fine by default.

However, there are a few special cases where you need to set the correct type upfront:

1. **HDR/EXR images**: These need `FloatType` or `HalfFloatType` to load and display correctly.
2. **Data textures**: When creating textures from raw data (e.g., heightmaps or special effects). Specify the correct type that matches the data format.
3. **Render targets**: Require the appropriate type based on what is stored (e.g., `FloatType` for HDR rendering).

So for regular image textures, no type is needed (default: `UnsignedByteType`).
```javascript
const texture = new THREE.TextureLoader().load('myimage.png');  // Type not needed
```

### 12.2.4. Formats
The `format` tells Three.js about the structure of the image data, mainly related to the channels and colors used. Here are some examples of texture formats:

| Format                | Format Code | Channels                            |
| --------------------- | ----------- | ----------------------------------- |
| THREE.RGBAFormat      | 1023        | 4 channels: Red, Green, Blue, Alpha |
| THREE.RGBFormat       | 1022        | 3 channels: Red, Green, Blue        |
| THREE.LuminanceFormat | 1024        | 1 channel: Brightness only          |
| THREE.RedFormat       | 1028        | 1 channel: Only red component       |
| THREE.RGFormat        | 1029        | 2 channels: Red and Green           |

### 12.2.5. Color Space
`ColorSpace` defines how Three.js interprets the texture and its different values. Generally, you differentiate between textures that will display colors (`THREE.SRGBColorSpace`) and textures that won't (`THREE.LinearSRGBColorSpace`). By default, `ColorSpace` is set to `""`, which is equivalent to `THREE.LinearSRGBColorSpace` because WebGL performs calculations in linear space by default. Ultimately, this comes down to internal gamma correction. Textures with `THREE.SRGBColorSpace` will be gamma-corrected to ensure accurate colors, while "technical" textures, such as roughness, should not undergo gamma correction.

``` javascript
colorTexture.colorSpace = THREE.SRGBColorSpace;
```

Use `THREE.SRGBColorSpace` for:
- Color Texture
- Emission Texture

Use `THREE.LinearSRGBColorSpace`, `""` , `undefined` for:
- Normal maps
- Height maps
- Roughness maps
- Metalness maps
- Any texture storing non-color data

### 12.2.6. Compression
The `THREE.TextureLoader` only supports a limited set of defult coded 2D image formats:
- JPEG
- PNG
- GIF (static frames only)
- BMP
- WEBP

For other formats with specialized compression, specific `loaders` are available to handle decompression. Use the corresponding `loader` to decompress the data on load. Some of the supported decompression methods include:
- Basis Universal (KTX2)
- S3TC / DXT
- ETC1/ETC2
- ASTC
- PVRTC

With a .ktx2 file, it could look like this:
``` javascript
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

const ktx2Loader = new THREE.KTX2Loader();
ktx2Loader
  .setTranscoderPath('/path/to/basis/')
  .detectSupport(renderer);

ktx2Loader.load('textures/compressedTexture.ktx2', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshStandardMaterial({ map: texture });
  scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material));
});
```

### 12.2.7. LoadingManager
The `LoadingManager` in Three.js is a utility that helps manage and monitor the loading of assets, including textures, models, and other resources. It provides a way to track the progress of asset loading and handle events like when all assets are loaded or if an error occurs.

- **Centralized Control**: Allows managing multiple loaders (e.g., `TextureLoader`, `GLTFLoader`) from a single point.
- **Progress Tracking**: Tracks the number of assets being loaded and notifies when all assets are ready.
- **Error Handling**: Provides hooks to handle errors during the loading process.
- **Custom Behavior**: Defines custom functions to be executed at different stages of loading (start, progress, completion).

``` javascript
// Create a LoadingManager
const manager = new THREE.LoadingManager();

// Define callbacks
manager.onStart = (url, itemsLoaded, itemsTotal) => {
    console.log(`Started loading: ${url}`);
    console.log(`Loaded ${itemsLoaded} of ${itemsTotal} items.`);
};
manager.onLoad = () => {
    console.log('All assets loaded!');
};
manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log(`Loading: ${url}`);
    console.log(`Loaded ${itemsLoaded} of ${itemsTotal} items.`);
};
manager.onError = (url) => {
    console.error(`There was an error loading ${url}`);
};

// Create a TextureLoader with the LoadingManager
const textureLoader = new THREE.TextureLoader(manager);

// Load textures
const texture1 = textureLoader.load('path/texture1.jpg');
const texture2 = textureLoader.load('path/texture2.jpg');
```

# 13. Animations
The Three.js animation system has completely changed in 2015. Beware of outdated information! It now works similar to Unity and Unreal Engine 4.

Different properties of a 3D object can be changed, such as bones and material color. The animated properties can be faded in, faded out, crossfaded, and warped. The weight and time scales of animations can be changed independently. [Animation system overview](https://threejs.org/docs/index.html#manual/en/introduction/Animation-system)

## 13.1. Quick overview
- Keyframes for an animation are stored in an `AnimationClip`, which is loaded along with a GLTF file.  
- The `AnimationMixer` is responsible for running animations and must be updated in each frame.  
- An `AnimationClip` is linked to the `AnimationMixer` to create an `AnimationAction`, which controls the animation.  
- To apply the same animation to multiple objects, use an `AnimationObjectGroup`.

This provides a visual representation of a possible animation object structure, illustrating both an individually animated object and an `AnimationObjectGroup`:
```
Scene
│
└── AnimationMixer
    │
    ├── AnimationAction 1 (Individual Object)
    │   ├── AnimationClip
    │   │   └── KeyframeTrack
    │   │
    │   └── Target: Object3D (Individual)
    │
    └── AnimationAction 2 (AnimationObjectGroup)
        ├── AnimationClip
        │   └── KeyframeTrack
        │
        └── Target: AnimationObjectGroup
            ├── Object3D (Tree 1)
            ├── Object3D (Tree 2)
            └── Object3D (Tree 3)
```

Code example:
```javascript
(gltf) => {
  bunny = gltf.scene;
  bunnyAnimationClips = gltf.animations; // save animations from gltf
  scene.add(bunny);
},

...

const animationMixer = new THREE.AnimationMixer(bunny); // create animationMixer for bunny
const animationAction = animationMixer.clipAction(bunnyAnimationClips[0]); // create animationAction
animationAction.play(); // play animationAction

// You can find a specific Clip:
const bunnyAnimationClipIdle = bunnyAnimationClips.find(clip => clip.name.toLowerCase() === "idle");

...

function render() {
  const deltaTime = clock.getDelta();
  animationMixer ? animationMixer.update(deltaTime) : null; // update animationMixer

  ...

  renderer.render(scene, camera);
}
```

## 13.2. Loaders
Different loaders can directly load the animations included in the assets. Using the GLTF workflow is recommended.

- THREE.ObjectLoader
- THREE.BVHLoader
- THREE.ColladaLoader
- THREE.FBXLoader
- THREE.GLTFLoader

## 13.3. Animation Clips
When loading a 3D file containing animations, the different [AnimationClips](https://threejs.org/docs/index.html#api/en/animation/AnimationClip) are stored in the child named `animations` (e.g., `mesh.animations`). These clips are required to play animations.

The `AnimationClip` is managed using the `AnimationAction`.

## 13.4. Keyframe Tracks
An `AnimationClip` contains the data for the animation, which is stored in a [KeyframeTrack](https://threejs.org/docs/index.html#api/en/animation/KeyframeTrack). This data is typically not modified directly.

## 13.5. Animation Mixer
An [AnimationMixer](https://threejs.org/docs/index.html#api/en/animation/AnimationMixer) is required to play an animation. It bundles multiple animations and manages the updates.

Update the `AnimationMixer` each frame using `deltatime`:

``` jacascript
function update () {
	mixer.update( deltaSeconds );
}
```

| Setting/Method             | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| time                       | The global mixer time in seconds                        |
| timeScale                  | Scaling factor for the global mixer time                |
| update(deltaTime)          | Updates the mixer and its controlled actions            |
| clipAction(clip, root)     | Returns an AnimationAction for the passed clip          |
| existingAction(clip, root) | Returns an existing AnimationAction for the passed clip |
| stopAllAction()            | Deactivates all previously scheduled actions            |
| uncacheClip(clip)          | Releases resources associated with a clip               |
| uncacheRoot(root)          | Releases resources associated with a root object        |
| uncacheAction(clip, root)  | Releases resources associated with an action            |

## 13.6. Animation Action
While attaching the `AnimationClip` to the `AnimationMixer`, an [AnimationAction](https://threejs.org/docs/index.html#api/en/animation/AnimationAction) named `action` is created. The `AnimationClip` is controlled through the `AnimationAction`, enabling operations such as `play`, `pause`, `loop`, `blend`, adjusting `timeScale`, and more.

Attach the `AnimationClip` to the `AnimationMixer` and `play` it:

``` jacascript
const action = mixer.clipAction(clip);
action.play();
```

| Setting            | Description                                                             | Default Value |
| ------------------ | ----------------------------------------------------------------------- | ------------- |
| enabled            | Enables or disables the action                                          | true          |
| weight             | Controls the influence of this action relative to other active actions  | 1             |
| timeScale          | Scales the speed of the animation playback                              | 1             |
| loop               | Sets the looping mode (LoopOnce, LoopRepeat, LoopPingPong)              | LoopRepeat    |
| repetitions        | Number of times the animation should repeat                             | Infinity      |
| clampWhenFinished  | If true, the last frame of the animation will be clamped when finished  | false         |
| zeroSlopeAtStart   | Ensures smooth interpolation when the clip is played after another      | true          |
| zeroSlopeAtEnd     | Ensures smooth interpolation when another clip is played after this one | true          |
| paused             | Pauses or resumes the action                                            | false         |
| time               | Sets the local time of the action (in seconds)                          | 0             |
| effectiveTimeScale | Read-only property that returns the effective time scale                | N/A           |
| effectiveWeight    | Read-only property that returns the effective weight                    | N/A           |

## 13.7. Animation Object Groups
The `AnimationAction` can only manage a single `AnimationClip`. To play and manage the same `AnimationClip` across multiple objects simultaneously, group the objects using an [AnimationObjectGroup](https://threejs.org/docs/index.html#api/en/animation/AnimationObjectGroup). Link the `AnimationObjectGroup` to the `AnimationMixer`. Using a group can be more efficient than creating individual `AnimationActions` for each object.

# 14. Lighting
When thinking about lighting, it's not just about light. There are a few things to consider, such as the environment map, shadows, and lights.

## 14.1. Shadows
**By default, there are no shadows being calculated.**

[Extended overview on threejs.org](https://threejs.org/manual/#en/shadows)

### 14.1.1. Renderer
First, shadows have to be activated in the renderer. This is called a [shadowMap](). There are multiple `shadowMap.types`:

| Shadow Map Type  | Quality     |
| ---------------- | ----------- |
| BasicShadowMap   | Low         |
| PCFShadowMap     | Medium      |
| PCFSoftShadowMap | High        |
| VSMShadowMap     | Medium-High |

```javascript
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
```

### 14.1.2. Light Sources
For each light, the `castShadows` property must be activated when needed. This creates a `light.shadow.camera`, which is bound to the light's position. This camera is used to render the shadows. There are some important quality settings to consider:

- `mapSize` / resolution (default: 512 x 512)
- Near and far planes for the shadow (default: 0.5 / 500)

The `mapSize` values must be powers of 2, up to the [WebGLRenderer.capabilities.maxTextureSize](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.capabilities) of the device.

The near and far planes are set on the `light.shadow.camera` and define the range in which shadows are rendered. Depending on the light, the `light.shadow.camera` is either an orthographic or perspective camera. Like a regular camera, the `light.shadow.camera` has properties such as `zoom`, `fov`, `height`, and `width` to ensure no shadows are out of bounds.

```javascript
// Create light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);

// Set cast shadows
light.castShadow = true;

// Set shadow map resolution
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

// Set near and far plane
light.shadow.camera.near = 1;
light.shadow.camera.far = 20;

scene.add(directionalLight);
```

Use the `cameraHelper` to visualize the `light.shadow.camera`:

```javascript
const helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);
```

### 14.1.3. Objects
Define for every object if it receives or / and cast shadows.

```javascript
cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.receiveShadow = true;
cube.castShadow = true;
scene.add(cube);
```

## 14.2. Lights
Most light sources work with a light position and a target position (not with rotation!). The target position can be either a point or an object.

| Light Type                                                                   | Purpose                                                                                                           | Efficiency Rating | Supports Shadows |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- |
| [AmbientLight](https://threejs.org/docs/#api/en/lights/AmbientLight)         | Provides uniform illumination to all objects in the scene                                                         | Efficient         | No               |
| [HemisphereLight](https://threejs.org/docs/#api/en/lights/HemisphereLight)   | Simulates sky and ground reflection, good for outdoor scenes                                                      | Medium            | No               |
| [PointLight](https://threejs.org/docs/#api/en/lights/PointLight)             | Emits light in all directions from a single point                                                                 | Intensive         | Yes              |
| [DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight) | Simulates distant light source (e.g., sunlight) with parallel rays                                                | Medium            | Yes              |
| [SpotLight](https://threejs.org/docs/#api/en/lights/SpotLight)               | Creates a cone of light emanating from a single point                                                             | Intensive         | Yes              |
| [RectAreaLight](https://threejs.org/docs/#api/en/lights/RectAreaLight)       | Emits light uniformly across a rectangular plane (It's an Addon and has limited support and does work diffrently) | Intensive         | No               |

## 14.3. Environment Map
The `environmentMap` is a texture used to simulate an environment for realistic lighting and reflections. The texture can be set as:  

- `scene.environment`: for lighting and reflections  
- `scene.background`: for displaying the texture visually  

### Mapping Types
There are two mapping types:

| Equirectangular | Cube |
| --------------- | ---- |
| ![Equirectangular](images/environment_equirectangular.jpeg) | ![Cube](images/environment_cubemap.jpeg) |

[Images: © trekview.org](https://www.trekview.org/blog/projection-type-360-photography/)

Both mapping types support `reflection` and `refraction`:  
- `THREE.CubeReflectionMapping`  
- `THREE.CubeRefractionMapping`  
- `THREE.EquirectangularReflectionMapping`  
- `THREE.EquirectangularRefractionMapping`

[Example demonstrating the `reflection` and `refraction` effects](https://threejs.org/examples/#webgl_materials_envmaps)  

### Loading
Depending on the file type, a different loader is used. When loading, it's recommended to preprocess the texture using the `pmremGenerator`. This generates mipmaps, which improve quality and performance.

Example with an EXR file:

```javascript
const pmremGenerator = new THREE.PMREMGenerator(renderer);
exrLoader.load('../../hdri/Sky.exr', (texture) => {
  envmap = pmremGenerator.fromEquirectangular(texture).texture;
  texture.dispose();
});

scene.background = envmap;
scene.environment = envmap;
```

# User Interaction

## Orbit Controls

## Scroll

## Mouse & Touch (Hover & Click)
There are multiple ways to detect and process click interactions. [Threejs.org features two approaches:](https://threejs.org/manual/#en/picking)  

- **The CPU approach**: This uses a raycast to check the entire scene for intersections with the bounding boxes of objects. Afterward, it checks every triangle (face) of the intersected objects.
- **The GPU approach**: This renders each object in a unique color in a separate offscreen scene. Then, it looks up the color of the pixel at the mouse position. This color identifies the hovered object.

Below is an example of a CPU-based method to detect hover interactions.  

### 15.1. mousemovement
Set variables:
```javascript
let intersectedObject = null;
let touchPosition = {x: -100000, y: -100000}; // the initial touchPostion value is set so its unlikely to touch something.
```

Set functions to update the `touchPosition` based on the canvas position to eliminate shifts. When the pointer leaves, reset the `touchPosition` to its initial value:
```javascript
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

window.addEventListener('mousemove', setTouchPosition);
window.addEventListener('mouseout', clearTouchPosition);
window.addEventListener('mouseleave', clearTouchPosition);
```

In the render function, intersections are checked on every frame. In this example, only the sub-children of the bunny are checked using `intersectObjects`, so it first verifies if the bunny exists. Often, the children of the entire scene are passed to the raycaster: `raycaster.intersectObjects(scene.children, true);`
```javascript
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

// functioncall in the render function
function render() {
  // Update hover
  touchSelector();
  // Render the scene
  renderer.render(scene, camera);
}
```

### 15.2. touchmovement
The touch inputs are passed to the previously set functions:
```javascript
function handleTouchStart(event) {
  // optionally add: event.preventDefault();
  setTouchPosition(event.touches[0]);
}

function handleTouchMove(event) {
  setTouchPosition(event.touches[0]);
}

function handleTouchEnd() {
  clearTouchPosition();
}

window.addEventListener('touchstart', handleTouchStart);
window.addEventListener('touchmove', handleTouchMove);
window.addEventListener('touchend', handleTouchEnd);
```

# 16. Todo Pages
- [x] responsive
- [x] orbit / zoom / pan
- [x] nesting
- [x] lil gui (add browser controls)
- [x] load my own object
- [x] materials
- [x] textures
- [x] animations
- [ ] lights
- [ ] environment / background
- [ ] user interaction -> scroll / click
- [ ] tween between meshes -> visualize data
- [ ] create usecases?
- [ ] create overview and menu
- [ ] for setup: gitignore / install packages on new machine