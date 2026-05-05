<script>
import { onMount, onDestroy } from "svelte";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

let container;
/** @type {THREE.WebGLRenderer} */
let renderer;
/** @type {THREE.Scene} */
let scene;
/** @type {THREE.PerspectiveCamera} */
let camera;
/** @type {THREE.Mesh} */
let logoMesh;
/** @type {THREE.Mesh} */
let bgMesh;
let animationId;

// SVG path for the brand logo
const logoPath = `M81.6,29.6c-1.1-3.4-4.9-5-8.1-3.6-1.8.8-3,2.4-3.4,4.2-3.2-4.2-7.5-6.4-9.8-7.1-.7-.2-1.5,0-1.9.7l-1.2,2.1c-.4.7-.2,1.7.5,2.1,1.3.8,2.6,2.6,4.4,4.7-3.9-1.6-8-1-11.3,0-.5-3.6-1.6-7.4-4-9.5,3,.1,5.2,1.7,6.4,2.8.6.5,1.5.3,2-.3l1.5-2.2c.5-.6.5-1.4,0-2.1-1.5-1.9-5-5.5-11.1-6.7,1.6-1.2,2.6-3.2,2.4-5.4-.3-2.7-2.5-5-5.2-5.3-3.6-.4-6.6,2.4-6.6,5.9s1,3.7,2.4,4.8c-5.1,1.2-9.2,4.1-10.8,6-.5.6-.5,1.4-.1,2l1.4,2c.5.7,1.5.9,2.2.4,1.3-.8,3.3-1.9,6.4-1.9-2.2,2.1-3.5,5.7-4.2,9.3-3.1-1.1-6.9-1.7-10.9.3,1.6-2.2,3.5-3.7,4.7-4.5.6-.4.8-1.3.5-2l-1.3-2.6c-.4-.7-1.2-1-1.9-.8-2.3.7-7,2.7-10.3,7.9-.5-1.9-2-3.6-4.1-4.2-2.7-.8-5.5.5-6.8,2.9-1.7,3.2-.2,7,3.1,8.3,1.8.7,3.8.5,5.3-.5-.7,5.2,1.4,10.2,2.5,12.4.3.7,1.1,1,1.8.8l2.4-.6c.8-.2,1.3-1,1.2-1.9-.3-1.5-.7-4.1-.4-6.8,1.4,3.4,5.3,6.3,8.9,8.4.8.5,1.9.3,2.5-.5l.2-.2c.3-.4.3-.9,0-1.3l-4.8-6.6c0,0-.2-.2-.3-.4l-.8-1.2c-.6-.8,0-1.8,1-1.7l1.9.2c.3,0,.7,0,1.1,0l6.9.8c.5,0,.9-.2,1.1-.6l4.1-9.2c.4-.9,1.6-.9,2,0l4,9.2c.2.4.6.7,1.1.6l10-1c.9,0,1.5,1,1,1.7l-6,8.1c-.3.4-.3.9,0,1.3l.4.6c.6.8,1.6,1,2.4.6,3.9-2,8.4-5.1,9.7-9,.4,2.7.2,5.1,0,6.5,0,.8.3,1.5,1.1,1.7l2.8.9c.7.2,1.5,0,1.9-.8,1.1-2.1,3-6.8,1.6-12.9,1.7,1,4,1.1,5.9,0,2.4-1.4,3.6-4.3,2.7-6.9h-.1Z`;

// Simple 2D noise function for clouds
function noise(x, y) {
  return Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
}

function generateCloudTexture(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let n = 0;
      let scale = 1;
      let amp = 1;
      let total = 0;
      for (let o = 0; o < 5; o++) {
        n += noise((x * scale) / size, (y * scale) / size) * amp;
        total += amp;
        scale *= 2;
        amp *= 0.5;
      }
      n /= total;
      const c = Math.floor(180 + n * 75); // light blueish clouds
      const i = (y * size + x) * 4;
      imageData.data[i] = c;
      imageData.data[i + 1] = c;
      imageData.data[i + 2] = 255;
      imageData.data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// Generate a simple environment map for metallic reflections
function generateEnvMap() {
  // Use a simple cube render target with a gradient for fake reflections
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, size);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.5, "#e0e0ff");
  gradient.addColorStop(1, "#b0b0c0");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.needsUpdate = true;
  return texture;
}

onMount(() => {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = null;

  const width = container.clientWidth;
  const height = container.clientHeight;
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 80);

  // Brighter Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  directionalLight.position.set(0, 0, 100);
  scene.add(directionalLight);
  const fillLight = new THREE.PointLight(0xffffff, 1.5, 200);
  fillLight.position.set(50, 50, 80);
  scene.add(fillLight);

  // Cloudy background plane
  const bgGeometry = new THREE.PlaneGeometry(120, 80);
  const bgMaterial = new THREE.MeshBasicMaterial({
    map: generateCloudTexture(),
    depthWrite: false,
  });
  bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  bgMesh.position.z = -10;
  scene.add(bgMesh);

  // SVG to Shape
  const loader = new SVGLoader();
  const svgData = loader.parse(
    `<svg viewBox='0 0 84.7 54.5'><path d='${logoPath}'/></svg>`
  );
  const shapes = svgData.paths[0].toShapes(true);

  // Extrude settings for metallic look
  const extrudeSettings = {
    depth: 2.2,
    bevelEnabled: true,
    bevelThickness: 0.7,
    bevelSize: 0.7,
    bevelSegments: 4,
  };

  const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
  geometry.center();
  geometry.scale(-0.6, 0.6, 0.6);

  // Metallic material with bright color and strong reflections
  const envMap = generateEnvMap();
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.04,
    clearcoat: 1,
    clearcoatRoughness: 0.01,
    reflectivity: 1,
    envMap: envMap,
    envMapIntensity: 2,
  });

  logoMesh = new THREE.Mesh(geometry, material);
  scene.add(logoMesh);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate);
    logoMesh.rotation.y += 0.01;
    logoMesh.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener("resize", onResize);

  onDestroy(() => {
    cancelAnimationFrame(animationId);
    renderer.dispose();
    window.removeEventListener("resize", onResize);
  });
});
</script>

<div
  bind:this={container}
  style="width:100%;height:100%;min-height:300px;min-width:300px;"
/>

<style>
div {
  background: transparent;
  box-shadow: 0 4px 32px #0003;
  overflow: hidden;
}
</style>
