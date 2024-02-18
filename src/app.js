import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Building } from "./objects";

import {
  initCamera,
  handleKeyboardInput,
  handleKeyboardRelease,
  playerCamera,
} from "./utils/helpers";

// Init Canvas, Scene, Renderer, Camera..
const canvas = document.querySelector("#app");
const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export function initScene(assets) {
  // Set up your scene, camera, renderer, lights, etc.
  console.log("Initializing scene: ", assets);

  initCamera(camera);
  addObjectsToScene(scene, assets);
  addLightsToScene(scene);
  addHelpersToScene(scene);

  // Controls for viewing the scene
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  document.addEventListener("keydown", handleKeyboardInput);
  document.addEventListener("keyup", handleKeyboardRelease);

  playerCamera(camera, scene, renderer);
}

export function animate() {
  requestAnimationFrame(animate);
  // Update your scene
  renderer.render(scene, camera);
}

const addObjectsToScene = (scene, assets) => {
  // Floor Plane
  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejs.org/manual/examples/resources/images/checker.png"
    );

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshStandardMaterial({
      color: "#333",
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  console.log("Assets: ", assets);
  console.log("asset model: ", assets.models.get("building_01"));

  // Building 1
  const building1 = new Building(
    assets.models.get("building_01")?.data,
    assets.textures.get("building_01")?.data
  );

  building1.model.scene.scale.set(0.04, 0.04, 0.04);
  building1.model.scene.position.set(-1, 0, 0.5);
  scene.add(building1.model.scene);

  // Building 2
  const building2 = new Building(
    assets.models.get("building_02")?.data,
    assets.textures.get("building_02")?.data
  );

  building2.model.scene.scale.set(0.04, 0.04, 0.04);
  building2.model.scene.position.set(3.5, 0, 0.5);
  scene.add(building2.model.scene);
};

const addLightsToScene = (scene) => {
  // Lights
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Create a sphere mesh to represent the light position
    const lightSphereGeometry = new THREE.SphereGeometry(0.1);
    const lightSphereMaterial = new THREE.MeshBasicMaterial({ color: color });
    const lightSphereMesh = new THREE.Mesh(
      lightSphereGeometry,
      lightSphereMaterial
    );
    lightSphereMesh.position.copy(light.position);
    scene.add(lightSphereMesh);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-3, 5, -4);
    scene.add(light);

    // Create a sphere mesh to represent the light position
    const lightSphereGeometry = new THREE.SphereGeometry(0.1);
    const lightSphereMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    const lightSphereMesh = new THREE.Mesh(
      lightSphereGeometry,
      lightSphereMaterial
    );
    lightSphereMesh.position.copy(light.position);
    scene.add(lightSphereMesh);
  }
};

const addHelpersToScene = (scene) => {
  // Add coordinate helper overlays
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxesHelper(5);
  scene.add(axisHelper);
};
