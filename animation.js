// animation.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- Basic Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// --- Model Loading ---
const loader = new GLTFLoader();
let model; // Mixer aur animation ki ab zaroorat nahi

loader.load(
    'image/neonheart.glb', // ✔️ Ab yeh path sahi hai
    function (gltf) {
        model = gltf.scene;
        model.scale.set(1.8, 1.8, 1.8);
        model.position.y = -2;
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error('An error happened while loading the model:', error);
    }
);

// --- Scroll-based Control ---
function updateOnScroll() {
    if (!model) return; // Agar model load na hua ho to kuch na karein

    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // --- 1. Move the heart from bottom to top ---
    model.position.y = -2 + scrollPercent * 4;
    
    // --- 2. Rotate the heart on scroll ---
    model.rotation.y = scrollPercent * Math.PI * 2; // Poora 360 degree ghumayega
    
    // --- 3. (Optional) Change background color ---
    const pink = new THREE.Color("#f3e7e9");
    const purple = new THREE.Color("#d8c7ff");
    const blue = new THREE.Color("#e3eeff");
    
    let currentColor = new THREE.Color();
    if (scrollPercent < 0.5) {
        currentColor.lerpColors(pink, purple, scrollPercent * 2);
    } else {
        currentColor.lerpColors(purple, blue, (scrollPercent - 0.5) * 2);
    }
    
    document.body.style.setProperty('--color-one', `#${currentColor.getHexString()}`);
}

window.addEventListener('scroll', updateOnScroll);

// --- Render Loop ---
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// --- Handle window resizing ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});