import AssetManager from "./src/managers/AssetManager.js";
import { initScene, animate } from "./src/app.js";

const assetManager = new AssetManager();

document.getElementById("loading").style.display = "block"; // Show loading screen

try {
  const assets = await assetManager.loadAssets(); // Load assets

  document.getElementById("loading").style.display = "none"; // Hide loading screen

  initScene(assets); // Initialize scene and the app
  animate();
} catch (error) {
  console.error("Error loading assets:", error);
}
