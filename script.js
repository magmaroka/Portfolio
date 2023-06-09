import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';

// Select the container for the scene
const container = document.getElementById('threeContainer');
const width = window.innerWidth; 
const height = window.innerHeight; 

console.log( screen.width)
// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Load the panoramic image and create a texture
const loader = new THREE.TextureLoader();
const texture = loader.load('images/webp/map2.webp');
// Create a spherical geometry and map the texture to it
const geometry = new THREE.SphereGeometry(500, 60, 40);

// Flip the geometry inside out
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
    map: texture
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set up the camera and controls
camera.position.set(0, 0, 0.1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

controls.enablePan = true;

let phoneWidth = 720;

if(window.innerWidth <= phoneWidth){
    controls.enabled = false;
}
controls.rotateSpeed = 0.4;
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

window.addEventListener('resize', onWindowResize, false);

// Animation loop
let lastTime = 0;
const rotationSpeed = 0.00008;

function animate(time) {
    const delta = time - lastTime;
    lastTime = time;
    onWindowResize();
    requestAnimationFrame(animate);
    sphere.rotation.y += rotationSpeed * delta;
    controls.update();
    renderer.render(scene, camera);
}

animate(0);