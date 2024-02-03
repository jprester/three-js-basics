import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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

  const textures = [];

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("assets/textures/building_01.jpg", () => {
    // Update any render or animation logic here if necessary
    console.log("Texture loaded");
    textures.push(texture);
    console.log("textures: ", textures);
  });
  const texture2 = textureLoader.load("assets/textures/building_02.jpg", () => {
    // Update any render or animation logic here if necessary
    console.log("Texture loaded");
    textures.push(texture);
    console.log("textures: ", textures);
  });

  const loader = new GLTFLoader();

  loader.load(
    "assets/models/s_01_01.gltf",
    (mesh) => {
      mesh.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
        }
      });
      console.log("gltf.scene: ", mesh.scene);
      mesh.scene.scale.set(0.03, 0.03, 0.03);
      mesh.scene.position.set(-2, 0, 0);
      scene.add(mesh.scene);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  loader.load(
    "assets/models/s_01_02.gltf",
    (mesh) => {
      mesh.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture2;
        }
      });
      console.log("gltf.scene: ", mesh.scene);
      mesh.scene.scale.set(0.03, 0.03, 0.03);
      mesh.scene.position.set(-4, 0, 3);
      scene.add(mesh.scene);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  // Add coordinate helper overlays
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxesHelper(5);
  scene.add(axisHelper);

  // Controls for viewing the scene
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  document.addEventListener("keydown", handleKeyboardInput);
  document.addEventListener("keyup", handleKeyboardRelease);

  playerCamera(camera, scene, renderer);
}

main();
