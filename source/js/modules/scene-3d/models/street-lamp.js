import * as THREE from 'three';
import Model from './model';

export default class ModelStreetLamp extends Model {
  constructor() {
    super();

    this.materialMainParams = {color: this.getColor(`blue`)};
    this.materialMain = this.getMaterial(`soft`, this.materialMainParams);

    this.materialAdditionalParams = {color: this.getColor(`lightBlue`)};
    this.materialAdditional = this.getMaterial(`soft`, this.materialAdditionalParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addLamp();
    this.addPillar();
    this.addBase();
  }

  addLamp() {
    const lampTopGeometry = new THREE.CylinderGeometry(45, 57, 6, 4);
    const lampTopMesh = new THREE.Mesh(lampTopGeometry, this.materialMain);

    lampTopMesh.position.set(0, 433, 0);
    lampTopMesh.castShadow = true;

    this.add(lampTopMesh);

    const lampMidGeometry = new THREE.CylinderGeometry(42, 34, 60, 4);
    const lampMidMesh = new THREE.Mesh(lampMidGeometry, this.materialAdditional);

    lampMidMesh.position.set(0, 400, 0);
    lampMidMesh.castShadow = true;

    this.add(lampMidMesh);

    const lampBottomGeometry = new THREE.CylinderGeometry(37, 37, 4, 4);
    const lampBottomMesh = new THREE.Mesh(lampBottomGeometry, this.materialMain);

    lampBottomMesh.position.set(0, 368, 0);
    lampBottomMesh.castShadow = true;

    this.add(lampBottomMesh);
  }

  addPillar() {
    const geometry = new THREE.CylinderGeometry(7, 7, 230, 16);
    const mesh = new THREE.Mesh(geometry, this.materialMain);

    mesh.position.set(0, 251, 0);
    mesh.castShadow = true;

    this.add(mesh);
  }

  addBase() {
    const baseTopGeometry = new THREE.SphereGeometry(16, 32, 32);
    const baseTopMesh = new THREE.Mesh(baseTopGeometry, this.materialMain);

    baseTopMesh.position.set(0, 120, 0);
    baseTopMesh.castShadow = true;

    this.add(baseTopMesh);

    const baseBottomGeometry = new THREE.CylinderGeometry(16, 16, 120, 16);
    const baseBottomMesh = new THREE.Mesh(baseBottomGeometry, this.materialMain);

    baseBottomMesh.position.set(0, 60, 0);
    baseBottomMesh.castShadow = true;

    this.add(baseBottomMesh);
  }
}
