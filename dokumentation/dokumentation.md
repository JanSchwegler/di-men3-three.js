# 1. Introduction

This documentation provides a comprehensive guide to getting started with Three.js. It offers code snippets for the basic structure of a Three.js application, covering essential components like scenes, cameras, renderers, and objects. Additionally, it dives into specific features and techniques.

# 2. Table of Content

- [1. Introduction](#1-introduction)
- [2. Table of Content](#2-table-of-content)
- [3. Setting Up the Development Environment for Three.js](#3-setting-up-the-development-environment-for-threejs)
  - [3.1. Step-by-Step Installation](#31-step-by-step-installation)
  - [3.2. Important Commands](#32-important-commands)
- [4. Linking Project Files](#4-linking-project-files)
  - [4.1. HTML](#41-html)
  - [4.2. Javascript](#42-javascript)
  - [4.3. SASS](#43-sass)
- [5. Create Code Exclusively for Development Hidden in the Final Build](#5-create-code-exclusively-for-development-hidden-in-the-final-build)
- [6. Basic Structure of a Minimal Three.js File](#6-basic-structure-of-a-minimal-threejs-file)
  - [6.1. Import](#61-import)
  - [6.2. Fallback / WebGL compatibility check](#62-fallback--webgl-compatibility-check)
  - [6.3. Scene](#63-scene)
  - [6.4. Camera](#64-camera)
  - [6.5. Objects](#65-objects)
  - [6.6. Renderer](#66-renderer)
  - [6.7. Base Code](#67-base-code)
- [7. Responsive Canvas](#7-responsive-canvas)
  - [7.1. Canvas Handling](#71-canvas-handling)
  - [7.2. Positioning the Camera to Keep the Object Fully Visible with Fixed Padding](#72-positioning-the-camera-to-keep-the-object-fully-visible-with-fixed-padding)
- [8. Todo Pages](#8-todo-pages)

# 3. Setting Up the Development Environment for Three.js

Before warking with three.js, I set up my developing environment. I used the recommended enviroment with the installation trough NPM and vite as the build tool, roughly described in the [three.js manual](https://threejs.org/docs/index.html#manual/en/introduction/Installation).

Before working with Three.js, it’s essential to set up a development environment that ensures a smooth workflow. The recommended approach is to use [NPM](https://www.npmjs.com/) for package management and [Vite](https://vitejs.dev/) as the build tool. This setup is outlined in the [Three.js manual](https://threejs.org/docs/index.html#manual/en/introduction/Installation). Follow the steps below to get started:

## 3.1. Step-by-Step Installation

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

## 3.2. Important Commands

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

# 4. Linking Project Files  
For a basic website, you need an `index.html`, `main.js`, and `style.css`.

## 4.1. HTML  
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

## 4.2. Javascript
At the top of the JavaScript file, you import the SASS file:
```javascript
import '/style.scss';
```

## 4.3. SASS  
With Vite (if SASS is installed), no additional configuration is needed for SASS to work. However, the SASS file must be imported in the `main.js` file, as shown in the JavaScript section.

# 5. Create Code Exclusively for Development Hidden in the Final Build
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

# 6. Basic Structure of a Minimal Three.js File

This chapter outlines the fundamental components of a Three.js file. Using this code, you can display 3D objects on a website.

At the end of this chapter, you’ll find the complete base code for quick reference and copy-paste use.

## 6.1. Import

To use Three.js, import the necessary modules at the top of your file.

While Three.js offers the essential tools for 3D graphics, additional features such as controls, loaders, and effects are included in the addons directory. These addons do not require separate installation but must be explicitly imported when needed.

```javascript
import * as THREE from "three";
// Additional modules can be imported here
```

## 6.2. Fallback / WebGL compatibility check

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

## 6.3. Scene

The scene acts as a container for all the objects, lights, and cameras.

![Three.js File](images/6_3_threejs-structure.svg)
[Image Source: threejs.org](https://threejs.org/manual/#en/fundamentals)

```javascript
const scene = new THREE.Scene();
```

## 6.4. Camera

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

## 6.5. Objects

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

## 6.6. Renderer

And finally, the renderer is responsible for rendering the scene and camera onto the screen. The `WebGLRenderer` is the default and most widely used renderer in Three.js.

```javascript
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Match the screen size
document.body.appendChild(renderer.domElement); // Attach the canvas to the document

// Later you render the Scene. If there is not only a still image, you have to create a loop
renderer.render(scene, camera); // Render the scene from the camera's perspective
```

## 6.7. Base Code

Below is the complete base code, combining all the steps above into a functional Three.js setup.

```javascript
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

if (!WebGL.isWebGL2Available()) {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
} else {
  createScene();
}

function createScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x999999 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
}
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

**Enhanced resolution based on the device's actual pixel ratio, limited to 2x for performance reasons.**
```javascript
// Handle resizing of the window
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

# 8. Todo Pages
- [ ] responsive
- [ ] orbit / controls
- [ ] load my own
- [ ] materials / textures
- [ ] lights
- [ ] environment / background