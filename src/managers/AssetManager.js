import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { MODELS, TEXTURES } from "../utils/constants";

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
    const gltfLoader = new GLTFLoader(this.assetManager);
    const textureLoader = new THREE.TextureLoader(this.assetManager);

    const modelPromises = MODELS.map((model) => {
      return new Promise((resolve, reject) => {
        return gltfLoader.load(
          model.path,
          (buildingModel) => {
            resolve({
              name: model.name,
              path: model.path,
              data: buildingModel,
            });
          },
          undefined,
          reject
        );
      });
    });

    const texturePromises = TEXTURES.map((texture) => {
      return new Promise((resolve, reject) => {
        return textureLoader.load(
          texture.path,
          (buildingTexture) => {
            resolve({
              name: texture.name,
              path: texture.path,
              data: buildingTexture,
            });
          },
          undefined,
          reject
        );
      });
    });

    const modelsResult = await Promise.all(modelPromises);
    const texturesResult = await Promise.all(texturePromises);

    const modelsMap = modelsResult.reduce((acc, model) => {
      acc.set(model.name, model);
      return acc;
    }, new Map());

    const texturesMap = texturesResult.reduce((acc, texture) => {
      acc.set(texture.name, texture);
      return acc;
    }, new Map());

    return { models: modelsMap, textures: texturesMap };
  }
}

export default AssetManager;
