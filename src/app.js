import * as THREE from "three";

export function createScene(scene) {
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

  //   const building1Texture = new MeshPhongMaterial({
  //     map: this.getTexture("building_1"),
  //     specular: 0xffffff,
  //     specularMap: this.getTexture("building_1_rough"),
  //     envMap: this.getTexture("env_night"),
  //     emissive: new Color("hsl(" + Math.random() * 360 + ", 100%, 95%)"),
  //     emissiveMap: this.getTexture("building_1_em"),
  //     emissiveIntensity: this.buildingWindowsEmissiveIntensity,
  //     bumpMap: this.getTexture("building_1"),
  //     bumpScale: 5,
  //   });
}

export function createLights(scene, THREE) {
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
}
