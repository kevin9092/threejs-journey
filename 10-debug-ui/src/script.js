import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { Pane } from "tweakpane";

/*
 * Tweakpane
 */
const PARAMS = {
    level: 0,
    name: "Sketch",
    active: true,
};

// Create a pane
const pane = new Pane({
    title: "Parameters",
});
pane.hidden = true;

// Slider
// pane.addInput(PARAMS, "size", {
//     min: 10,
//     max: 100,
//     step: 1,
// });

// // Dropdown
// pane.addInput(PARAMS, "weight", {
//     options: {
//         Normal: 400,
//         Bold: 700,
//     },
// });

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
const meshFolder = pane.addFolder({ title: "Mesh Position" });
meshFolder.addInput(mesh.position, "x", {
    label: "X",
    min: 0,
    max: 100,
    step: 1,
});
meshFolder.addInput(mesh.position, "y", {
    label: "Y",
    min: 0,
    max: 100,
    step: 1,
});
meshFolder.addInput(mesh.position, "z", {
    label: "Z",
    min: 0,
    max: 100,
    step: 1,
});

const btn = meshFolder.addButton({
    title: "Submit",
    label: "Spin", // optional
});

btn.on("click", () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
});

const meshFolder2 = pane.addFolder({ title: "Mesh Attributes" });
meshFolder2.addInput(mesh, "visible", {
    label: "Mesh Visibility",
});
meshFolder2.addInput(material, "wireframe", {
    label: "Mesh Wireframe",
});
meshFolder2.addInput(material, "color", {
    label: "Mesh Color",
    color: { type: "float" },
});

window.addEventListener("keydown", (event) => {
    if (event.key === "h") {
        pane.hidden = !pane.hidden; 
    }
});

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
