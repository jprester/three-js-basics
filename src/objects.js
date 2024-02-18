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
  constructor(model, texture) {
    this.model = model;
    this.texture = texture;

    this.model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = this.texture;
        child.material.needsUpdate = true;
      }
    });
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
