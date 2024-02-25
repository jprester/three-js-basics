import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Building } from "./objects";
import {
  initCamera,
  handleKeyboardInput,
  handleKeyboardRelease,
  playerCamera,
} from "./utils/helpers";
import { configOptions } from "./utils/config";

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
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export function initScene(assets) {
  // Set up your scene, camera, renderer, lights, etc.
  console.log("Initializing scene: ", assets);

  initCamera(camera);
  setupEnvironment(scene, assets);
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

const setupEnvironment = (scene, assets) => {
  // Set up environment
  const environmentTexture = assets.textures.get("environment_night").data;
  environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
  environmentTexture.magFilter = THREE.LinearFilter;

  const skyTexture = assets.textures.get("sky_night").data;
  skyTexture.colorSpace = THREE.SRGBColorSpace;
  skyTexture.mapping = THREE.EquirectangularReflectionMapping;
  skyTexture.magFilter = THREE.LinearFilter;

  scene.environment = environmentTexture;
  scene.background = skyTexture;

  // Fog
  scene.fog = new THREE.Fog(
    configOptions.night.fog.color,
    0,
    configOptions.night.fog.end
  );
};

const addObjectsToScene = (scene, assets) => {
  // Floor Plane
  {
    const planeSize = 90;

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

    const planeMat = new THREE.MeshPhongMaterial({
      map: assets.textures.get("ground").data,
      emissive: 0x0090ff,
      emissiveMap: assets.textures.get("ground_em").data,
      emissiveIntensity: 0.2,
      shininess: 0,
    });

    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  // Building 1
  const building1EmissiveColor = new THREE.Color(
    "hsl(" + Math.random() * 360 + ", 100%, 95%)"
  );
  const building1 = new Building(
    assets.models.get("building_01").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_01").data,
      rough: assets.textures.get("building_01_rough").data,
      em: assets.textures.get("building_01_em").data,
      spec: assets.textures.get("building_01_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
      emissiveColor: building1EmissiveColor,
    }
  );

  building1.scale.set(0.04, 0.04, 0.04);
  building1.position.set(18, 0, 2);
  scene.add(building1);

  // Building 2
  const building2EmissiveColor = new THREE.Color(
    "hsl(" + Math.random() * 360 + ", 100%, 95%)"
  );
  const building2 = new Building(
    assets.models.get("building_02").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_02").data,
      rough: assets.textures.get("building_02_rough").data,
      em: assets.textures.get("building_02_em").data,
      spec: assets.textures.get("building_02_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
      emissiveColor: building2EmissiveColor,
    }
  );

  building2.scale.set(0.04, 0.04, 0.04);
  building2.position.set(15, 0, 2);
  scene.add(building2);

  // Building 3
  const building3EmissiveColor = new THREE.Color(
    "hsl(" + Math.random() * 360 + ", 100%, 95%)"
  );
  const building3 = new Building(
    assets.models.get("building_03").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_03").data,
      rough: assets.textures.get("building_03_rough").data,
      em: assets.textures.get("building_03_em").data,
      spec: assets.textures.get("building_03_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
      emissiveColor: building3EmissiveColor,
    }
  );

  building3.scale.set(0.04, 0.04, 0.04);
  building3.position.set(12, 0, 2);
  scene.add(building3);

  // Building 4
  const building4EmissiveColor = new THREE.Color(
    "hsl(" + Math.random() * 360 + ", 100%, 95%)"
  );
  const building4 = new Building(
    assets.models.get("building_04").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_04").data,
      rough: assets.textures.get("building_04_rough").data,
      em: assets.textures.get("building_04_em").data,
      spec: assets.textures.get("building_04_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
      emissiveColor: building4EmissiveColor,
    }
  );

  building4.scale.set(0.04, 0.04, 0.04);
  building4.position.set(9, 0, 2);
  scene.add(building4);

  // Building 5
  const building5EmissiveColor = new THREE.Color(
    "hsl(" + Math.random() * 360 + ", 100%, 95%)"
  );
  const building5 = new Building(
    assets.models.get("building_05").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_05").data,
      rough: assets.textures.get("building_05_rough").data,
      em: assets.textures.get("building_05_em").data,
      spec: assets.textures.get("building_05_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
      emissiveColor: building5EmissiveColor,
      emissiveIntensity: 2.5,
    }
  );

  building5.scale.set(0.04, 0.04, 0.04);
  building5.position.set(6, 0, 2);
  scene.add(building5);

  // Building 6
  const building6EmissiveColor = new THREE.Color(
    "hsl(" + Math.random() * 360 + ", 100%, 95%)"
  );
  const building6 = new Building(
    assets.models.get("building_06").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_06").data,
      rough: assets.textures.get("building_06_rough").data,
      em: assets.textures.get("building_06_em").data,
      spec: assets.textures.get("building_06_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
      emissiveColor: building6EmissiveColor,
      emissiveIntensity: 2.5,
    }
  );

  building6.scale.set(0.04, 0.04, 0.04);
  building6.position.set(3, 0, 2);
  scene.add(building6);

  // Building 6
  const building7 = new Building(
    assets.models.get("building_07").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_07").data,
      rough: assets.textures.get("building_07_rough").data,
      em: assets.textures.get("building_07_em").data,
      spec: assets.textures.get("building_07_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
    }
  );

  building7.scale.set(0.04, 0.04, 0.04);
  building7.position.set(0, 0, 2);
  scene.add(building7);

  // Building 8
  const building8 = new Building(
    assets.models.get("building_08").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_08").data,
      rough: assets.textures.get("building_08_rough").data,
      em: assets.textures.get("building_08_em").data,
      spec: assets.textures.get("building_08_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
    }
  );

  building8.scale.set(0.04, 0.04, 0.04);
  building8.position.set(-3, 0, 2);
  scene.add(building8);

  // Building 9
  const building9 = new Building(
    assets.models.get("building_09").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_09").data,
      rough: assets.textures.get("building_09_rough").data,
      em: assets.textures.get("building_09_em").data,
      spec: assets.textures.get("building_09_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
    }
  );

  building9.scale.set(0.04, 0.04, 0.04);
  building9.position.set(-6, 0, 2);
  scene.add(building9);

  // Building 10
  const building10 = new Building(
    assets.models.get("building_10").data.scene.children[0].geometry,
    {
      texture: assets.textures.get("building_10").data,
      rough: assets.textures.get("building_10_rough").data,
      em: assets.textures.get("building_10_em").data,
      spec: assets.textures.get("building_10_spec").data,
      env: assets.textures.get("environment_night").data,
    },
    {
      anisotropy: 8,
      specular: 0xffffff,
    }
  );

  building10.scale.set(0.04, 0.04, 0.04);
  building10.position.set(-9, 0, 2);
  scene.add(building10);
};

const addLightsToScene = (scene) => {
  // Lights
  {
    // const color = 0xffffff;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-19, 12, 18);
    // scene.add(light);
    // Create a sphere mesh to represent the light position
    // const lightSphereGeometry = new THREE.SphereGeometry(0.1);
    // const lightSphereMaterial = new THREE.MeshBasicMaterial({ color: color });
    // const lightSphereMesh = new THREE.Mesh(
    //   lightSphereGeometry,
    //   lightSphereMaterial
    // );
    // lightSphereMesh.position.copy(light.position);
    // scene.add(lightSphereMesh);
  }

  {
    const color = 0xffffff;
    const intensity = 0.4;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-13, 5, -4);
    scene.add(light);

    // Create a sphere mesh to represent the light position
    // const lightSphereGeometry = new THREE.SphereGeometry(0.1);
    // const lightSphereMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    // const lightSphereMesh = new THREE.Mesh(
    //   lightSphereGeometry,
    //   lightSphereMaterial
    // );
    // lightSphereMesh.position.copy(light.position);
    // scene.add(lightSphereMesh);

    const light_sun = new THREE.DirectionalLight(
      configOptions.night.sun.color,
      configOptions.night.sun.intensity
    );
    light_sun.castShadow = false;
    light_sun.position.x = configOptions.night.sun.x;
    light_sun.position.y = configOptions.night.sun.y;
    light_sun.position.z = configOptions.night.sun.z;
    scene.add(light_sun);
    scene.add(light_sun.target);
  }

  const light_ambient = new THREE.AmbientLight(
    configOptions.night.ambient.color,
    configOptions.night.ambient.intensity
  );
  scene.add(light_ambient);
};

const addHelpersToScene = (scene) => {
  // Add coordinate helper overlays
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxesHelper(5);
  scene.add(axisHelper);
};
