import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import {
  camera,
  playerCamera,
  initCamera,
  handleKeyboardInput,
  handleKeyboardRelease,
} from "./src/helpers.js";
import { createScene, createLights } from "./src/app.js";

import { Cube, Sphere } from "./src/objects";

function main() {
  // Init Scene, Renderer, Camera..
  const scene = new THREE.Scene();
  const canvas = document.querySelector("#app");

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  initCamera(camera);
  createScene(scene, THREE);
  createLights(scene, THREE);

  // Add coordinate helper overlays
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxesHelper(5);
  scene.add(axisHelper);

  // Controls for viewing the scene
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  // const cube1 = new Cube("red", { x: 1, y: 4, z: 1 }, { x: 0, y: 2, z: -10 });
  // const sphere1 = new Sphere("blue", 1);

  // scene.add(cube1.mesh);
  // scene.add(sphere1.mesh);
  // renderer.render(scene, camera);

  // MESHES

  // function handleMouseMove(event) {
  //   const moveDistance = 0.01;
  //   if (event.movementX) camera.rotation.y -= event.movementX * moveDistance;
  //   if (event.movementY) camera.rotation.x -= event.movementY * moveDistance;
  //   renderer.render(scene, camera); // Render the scene with updated camera rotation
  // }

  // document.addEventListener("mousemove", handleMouseMove);

  document.addEventListener("keydown", handleKeyboardInput);
  document.addEventListener("keyup", handleKeyboardRelease);

  playerCamera(camera, scene, renderer);
  // renderer.render(scene, camera); // Render the scene with updated camera position
}

main();
