import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { Cube, Sphere } from "./src/objects";

function main() {
  // Init Scene, Renderer, Camera..
  const scene = new THREE.Scene();
  const canvas = document.querySelector("#app");
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  function initCamera() {
    camera.position.z = 5;
    camera.position.x = -1;
    camera.position.y = 1;
  }

  initCamera();

  // Add coordinate helper overlays
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxesHelper(5);
  scene.add(axisHelper);

  // Controls for viewing the scene

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  // Lights
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(3, 2, 4);
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

  // const cube1 = new Cube("red", { x: 1, y: 4, z: 1 }, { x: 0, y: 2, z: -10 });
  // const sphere1 = new Sphere("blue", 1);

  // scene.add(cube1.mesh);
  // scene.add(sphere1.mesh);
  // renderer.render(scene, camera);

  // MESHES

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

  // Cube
  {
    const cubeSize = 2;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  // Sphere
  {
    const sphereRadius = 1;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  // function handleMouseMove(event) {
  //   const moveDistance = 0.01;
  //   if (event.movementX) camera.rotation.y -= event.movementX * moveDistance;
  //   if (event.movementY) camera.rotation.x -= event.movementY * moveDistance;
  //   renderer.render(scene, camera); // Render the scene with updated camera rotation
  // }

  // document.addEventListener("mousemove", handleMouseMove);

  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;
  let lookUp = false;
  let lookDown = false;
  let lookLeft = false;
  let lookRight = false;

  function handleKeyboardInput(event) {
    switch (event.key) {
      case "w":
        moveForward = true;
        break;
      case "s":
        moveBackward = true;
        break;
      case "q":
        lookUp = true;
        break;
      case "e":
        lookDown = true;
        break;
      case "a": // Look left
        lookLeft = true;
        break;
      case "d": // Look right
        lookRight = true;
        break;
      case "z":
        moveLeft = true;
        break;
      case "c":
        moveRight = true;
        break;
    }
  }

  function handleKeyboardRelease(event) {
    switch (event.key) {
      case "w":
        moveForward = false;
        break;
      case "s":
        moveBackward = false;
        break;
      case "a":
        lookLeft = false;
        break;
      case "d":
        lookRight = false;
        break;
      case "q":
        lookUp = false;
        break;
      case "e":
        lookDown = false;
        break;
      case "z":
        moveLeft = false;
        break;
      case "c":
        moveRight = false;
        break;
    }
  }

  document.addEventListener("keydown", handleKeyboardInput);
  document.addEventListener("keyup", handleKeyboardRelease);

  function playerCamera() {
    const moveSpeed = 0.1;
    const lookSpeed = 0.01;

    if (moveForward) {
      camera.position.x -= Math.sin(camera.rotation.y) * moveSpeed;
      camera.position.z -= Math.cos(camera.rotation.y) * moveSpeed;
    }
    if (moveBackward) {
      camera.position.x += Math.sin(camera.rotation.y) * moveSpeed;
      camera.position.z += Math.cos(camera.rotation.y) * moveSpeed;
    }

    if (lookLeft) {
      camera.rotation.y += lookSpeed;
    }

    if (lookRight) {
      camera.rotation.y -= lookSpeed;
    }

    if (moveLeft) {
      camera.position.x -=
        Math.sin(camera.rotation.y + Math.PI / 2) * moveSpeed;
      camera.position.z -=
        Math.cos(camera.rotation.y + Math.PI / 2) * moveSpeed;
    }
    if (moveRight) {
      camera.position.x +=
        Math.sin(camera.rotation.y + Math.PI / 2) * moveSpeed;
      camera.position.z +=
        Math.cos(camera.rotation.y + Math.PI / 2) * moveSpeed;
    }

    if (lookUp) {
      camera.rotation.x += lookSpeed;
    }

    if (lookDown) {
      camera.rotation.x -= lookSpeed;
    }

    renderer.render(scene, camera); // Render the scene with updated camera position

    requestAnimationFrame(playerCamera);
  }

  playerCamera();
}

main();
