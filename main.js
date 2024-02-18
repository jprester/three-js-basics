import AssetManager from "./src/managers/AssetManager.js";
import { initScene, animate } from "./src/app.js";

const assetManager = new AssetManager();

document.getElementById("loading").style.display = "block";

try {
  const assets = await assetManager.loadAssets();

  document.getElementById("loading").style.display = "none";
  initScene(assets);
  animate();
} catch (error) {
  console.error("Error loading assets:", error);
}
