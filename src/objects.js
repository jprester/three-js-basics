import * as THREE from "three";

export class Cube {
  constructor(
    color = 0x00ff00,
    size = { x: 1, y: 1, z: 1 },
    position = { x: 0, y: 0, z: 0 }
  ) {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshPhongMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;
  }

  changeColor(color) {
    this.mesh.material.color.setHex(color);
  }

  changePosition(position) {
    this.mesh.position.x = position;
  }
}

export class Sphere {
  constructor(color = 0x00ff00, size = 1) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = -3;
    this.mesh.position.y = 1;
    this.mesh.position.z = -5;
  }

  changeColor(color) {
    this.mesh.material.color.setHex(color);
  }

  changePosition(position) {
    this.mesh.position.x = position;
  }
}

export class Rectangle {
  constructor(color = 0x00ff00, size = { x: 1, y: 1 }) {
    const geometry = new THREE.PlaneGeometry(size.x, size.y);
    const material = new THREE.MeshPhongMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = -3;
    this.mesh.position.y = 10;
    this.mesh.position.z = 12;
  }

  changeColor(color) {
    this.mesh.material.color.setHex(color);
  }

  changePosition(position) {
    this.mesh.position.x = position;
  }
}

export class Building {
  constructor(model, textures = {}, options = {}) {
    this.model = model;
    // this.model.computeBoundsTree();
    this.textures = textures;

    const buildingTexture = this.textures.texture;

    buildingTexture.wrapS = THREE.RepeatWrapping;
    buildingTexture.wrapT = THREE.RepeatWrapping;
    buildingTexture.anisotropy = options?.anisotropy || 8;

    const buildingTextureRough = this.textures.rough;

    buildingTextureRough.wrapS = THREE.RepeatWrapping;
    buildingTextureRough.wrapT = THREE.RepeatWrapping;
    buildingTextureRough.anisotropy = options?.anisotropy || 8;

    const buildingTextureEm = this.textures.em;

    buildingTextureEm.wrapS = THREE.RepeatWrapping;
    buildingTextureEm.wrapT = THREE.RepeatWrapping;
    buildingTextureEm.anisotropy = options?.anisotropy || 8;

    const buildingTextureSpec = this.textures.spec;

    buildingTextureSpec.wrapS = THREE.RepeatWrapping;
    buildingTextureSpec.wrapT = THREE.RepeatWrapping;
    buildingTextureSpec.anisotropy = options?.anisotropy || 8;

    const buildingMesh = new THREE.Mesh(
      this.model,
      new THREE.MeshPhongMaterial({
        map: buildingTexture,
        specular: options?.specular || 0xffffff,
        specularMap: buildingTextureRough,
        envMap: this.textures.env,
        emissive:
          options.emissiveColor ||
          new THREE.Color("hsl(" + Math.random() * 360 + ", 100%, 95%)"),
        emissiveMap: buildingTextureEm,
        emissiveIntensity: options.emissiveIntensity || 1.5,
        bumpMap: buildingTexture,
        bumpScale: 5,
      })
    );

    return buildingMesh;
  }

  changePosition(
    positionx = this.model.scene.position.x,
    positiony = this.model.scene.position.y,
    positionz = this.model.scene.position.z
  ) {
    this.model.scene.position.x = positionx;
    this.model.scene.position.y = positiony;
    this.model.scene.position.z = positionz;
  }

  changeScale(scalex, scaley, scalez) {
    this.model.scale.x = scalex;
    this.model.scale.y = scaley;
    this.model.scale.z = scalez;
  }
}
