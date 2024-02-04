let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let lookUp = false;
let lookDown = false;
let lookLeft = false;
let lookRight = false;

export function handleKeyboardInput(event) {
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

export function handleKeyboardRelease(event) {
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

export function playerCamera(camera, scene, renderer) {
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
    camera.position.x -= Math.sin(camera.rotation.y + Math.PI / 2) * moveSpeed;
    camera.position.z -= Math.cos(camera.rotation.y + Math.PI / 2) * moveSpeed;
  }
  if (moveRight) {
    camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * moveSpeed;
    camera.position.z += Math.cos(camera.rotation.y + Math.PI / 2) * moveSpeed;
  }

  if (lookUp) {
    camera.rotation.x += lookSpeed;
  }

  if (lookDown) {
    camera.rotation.x -= lookSpeed;
  }

  requestAnimationFrame(() => playerCamera(camera, scene, renderer));
  renderer.render(scene, camera);
}

export function initCamera(camera) {
  camera.position.z = 5;
  camera.position.x = -1;
  camera.position.y = 1;
}
