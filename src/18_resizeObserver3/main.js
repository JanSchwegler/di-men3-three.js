import "./style.scss";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

let scene,
  camera,
  renderer,
  clock,
  stats,
  bunny,
  animationMixer,
  animationAction,
  scrollFraction = 0,
  intersectedObject = null,
  touchPosition = { x: -100000, y: -100000 },
  touchStartTime,
  touchStartPosition = { x: -100000, y: -100000 },
  raycaster,
  mouse,
  loadingManager,
  composter,
  renderPass,
  outlinePass,
  fxaaPass,
  gammaCorrectionPass;
const canvas = document.querySelector("#canvas");
const htmlContent = document.querySelector("#htmlContent");

function init() {
  // check canvas
  if (!canvas) {
    console.error("Canvas element not found.");
    return;
  }

  const settings = {
    debounce: false,
  };
  const gui = new GUI();
  gui.title("debounce");
  gui.add(settings, "debounce").name("Debounce");

  // loading manager
  loadingManager = new THREE.LoadingManager();
  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progress = (itemsLoaded / itemsTotal) * 100;
    console.log(
      `Progress: ${progress.toFixed(2)}% (${itemsLoaded} of ${itemsTotal})`,
    );
  };

  // create base elements
  scene = new THREE.Scene();
  scene.background = null;
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    premultipliedAlpha: false,
    canvas,
  });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  camera = new THREE.PerspectiveCamera(
    55,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 2);

  // Setup effect composer
  composter = new EffectComposer(renderer);
  renderPass = new RenderPass(scene, camera);
  composter.addPass(renderPass);
  outlinePass = new OutlinePass(
    new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
    scene,
    camera,
  );
  outlinePass.edgeStrength = 1;
  outlinePass.edgeGlow = 2;
  outlinePass.edgeThickness = 5;
  outlinePass.pulsePeriod = 0;
  outlinePass.visibleEdgeColor.set("#000000");
  outlinePass.hiddenEdgeColor.set("#000000");
  outlinePass.selectedObjects = scene.children;
  composter.addPass(outlinePass);
  fxaaPass = new ShaderPass(FXAAShader);
  const pixelRatio = Math.min(window.devicePixelRatio, 4);
  fxaaPass.material.uniforms["resolution"].value.x =
    1 / (canvas.clientWidth * pixelRatio);
  fxaaPass.material.uniforms["resolution"].value.y =
    1 / (canvas.clientHeight * pixelRatio);
  composter.addPass(fxaaPass);
  gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
  composter.addPass(gammaCorrectionPass);

  // Setup reytracer
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Add stats
  stats = new Stats();
  document.body.appendChild(stats.dom);

  // Load bunny
  const glbLoader = new GLTFLoader(loadingManager);
  glbLoader.load(
    "../../models/bunny/12_animations.glb",
    (gltf) => {
      bunny = gltf.scene;
      bunny.position.y -=
        new THREE.Box3().setFromObject(bunny).getSize(new THREE.Vector3()).y *
        0.5;

      bunny.traverse((e) => {
        if (e?.name?.includes("bunny002_3")) {
          e.material = new THREE.MeshPhysicalMaterial({
            color: 0x3c3c3c, // Slightly lighter base color
            emissive: 0x000000,
            roughness: 0.1, // Slightly increased for more natural look
            clearcoat: 0.5, // Reduced clearcoat for less plastic look
            metalness: 0.1, // Added slight metalness for depth
            ior: 1.5, // Added index of refraction
            transmission: 0.1, // Added slight transmission for depth
            specularIntensity: 1, // Added specular highlight control
            specularColor: 0xffffff, // White specular highlights
            envMapIntensity: 1.2, // Enhanced environment reflections
          });
          e.material.needsUpdate = true;
        }
      });
      scene.add(bunny);
      const idleAnimation = gltf.animations.find(
        (animation) => animation.name.toLowerCase() === "idle",
      );
      if (idleAnimation) handleAnimation(idleAnimation);
    },
    undefined,
    (error) => {
      console.error("Error loading bunny:", error);
    },
  );

  // Add light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Add a soft fill light from the opposite direction
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
  fillLight.position.set(-1, 0.5, -1);
  scene.add(fillLight);

  // Keep a subtle ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // render loop
  clock = new THREE.Clock();
  renderer.setAnimationLoop(render);

  // Scroll rotation event
  window.addEventListener("scroll", getScrollFraction);
  // Move event
  window.addEventListener("mousemove", setTouchPosition);
  window.addEventListener("mouseout", clearTouchPosition);
  window.addEventListener("mouseleave", clearTouchPosition);
  // Click event
  window.addEventListener("click", handleClick);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchend", handleTouchEnd);

  const handleResize = (width, height) => {
    const dpr = Math.min(window.devicePixelRatio, 4);

    // Update camera first
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update renderer and canvas
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(dpr);

    // Update effect composer
    composter.setSize(width, height);
    fxaaPass.material.uniforms["resolution"].value.set(1 / width, 1 / height);
  };

  const debouncedResize = debounce(handleResize, 100);

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      let { width, height } = entry.contentRect;
      if (settings.debounce) {
        debouncedResize(width, height);
      } else {
        handleResize(width, height);
      }
    }
  });
  resizeObserver.observe(canvas);
  window.addEventListener("resize", () => {
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    if (settings.debounce) {
      debouncedResize(width, height);
    } else {
      handleResize(width, height);
    }
  });
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
  composter.render(scene, camera);
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
  touchStartPosition.x = touchPosition.x;
  touchStartPosition.y = touchPosition.y;
}

function handleTouchEnd() {
  const touchEndTime = Date.now();
  if (
    touchEndTime - touchStartTime < 200 &&
    Math.abs(touchStartPosition.x - touchPosition.x) < 0.01 &&
    Math.abs(touchStartPosition.y - touchPosition.y) < 0.01
  ) {
    handleClick();
  }
  clearTouchPosition();
}

function handleClick() {
  if (intersectedObject) {
    switch (intersectedObject.name) {
      case "bunny002_1":
        changeHTMLContent("Bunny Body");
        break;
      case "bunny002_2":
        changeHTMLContent("Bunny Head");
        break;
      case "bunny002_3":
        changeHTMLContent("Bunny Eye");
        break;
      default:
        changeHTMLContent("HTML Content");
        break;
    }
  } else {
    changeHTMLContent("HTML Content");
  }
}

function changeHTMLContent(content) {
  if (htmlContent) {
    for (let i = htmlContent.children.length - 1; i >= 0; i--) {
      htmlContent.children[i].innerHTML = content;
    }
  }
}

function getCanvasRelativePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) * canvas.width) / rect.width,
    y: ((event.clientY - rect.top) * canvas.height) / rect.height,
  };
}

function setTouchPosition(event) {
  const pos = getCanvasRelativePosition(event);
  touchPosition.x = (pos.x / canvas.width) * 2 - 1;
  touchPosition.y = (pos.y / canvas.height) * -2 + 1;
}

function clearTouchPosition() {
  touchPosition.x = -100000;
  touchPosition.y = -100000;
}

function touchSelector() {
  raycaster.setFromCamera(touchPosition, camera);
  if (bunny) {
    const intersects = raycaster.intersectObjects(
      bunny.children[0].children[0].children,
      true,
    );
    if (intersects.length > 0) {
      if (intersectedObject !== intersects[0].object) {
        intersectedObject = intersects[0].object;
        document.body.style.cursor = "pointer";
      }
    } else {
      if (intersectedObject !== null) {
        intersectedObject = null;
        document.body.style.cursor = "default";
      }
    }
  }
}

init();

function debounce(func, wait) {
  let timeout;
  let lastRun = 0;

  return (...args) => {
    const now = Date.now();

    // Clear any existing timeout
    clearTimeout(timeout);

    // If we're still within the wait period, just set up next call
    if (now - lastRun < wait) {
      timeout = setTimeout(() => {
        lastRun = Date.now();
        func(...args);
      }, wait);
      return;
    }

    // If we're outside the wait period, execute immediately
    lastRun = now;
    func(...args);
  };
}