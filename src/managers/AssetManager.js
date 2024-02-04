import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

class AssetManager {
  constructor() {
    this.assetManager = new THREE.LoadingManager();

    this.assetManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      // Update loading progress
      console.log(`Loaded ${itemsLoaded} of ${itemsTotal} files.`);
    };

    this.assetManager.onError = (url) => {
      console.log("There was an error loading " + url);
    };
  }

  async loadAssets() {
    console.log("Loading assets");
    // For textures
    const textureLoader = new THREE.TextureLoader(this.assetManager);
    const myTexture = await new Promise((resolve, reject) => {
      textureLoader.load(
        "assets/textures/building_02.jpg",
        (texture) => {
          console.log("Loaded gltf texture");
          resolve(texture);
        },
        undefined,
        reject
      );
    });

    // For models
    const gltfLoader = new GLTFLoader(this.assetManager);
    const gltf = await new Promise((resolve, reject) => {
      gltfLoader.load(
        "assets/models/s_01_01.gltf",
        (gltf) => {
          console.log("Loaded gltf model");
          resolve(gltf);
        },
        undefined,
        reject
      );
    });

    // Return the loaded assets
    return { texture: myTexture, model: gltf };
  }
}

export default AssetManager;
