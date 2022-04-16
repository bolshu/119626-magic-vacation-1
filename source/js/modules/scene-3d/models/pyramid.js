import * as THREE from 'three';
import Model from './model';

export default class ModelPyramid extends Model {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    const geometry = new THREE.ConeGeometry(Math.hypot(250, 250) / 2, 280, 4);
    const materialParams = {color: this.getColor(`blue`)};
    const material = this.getMaterial(`soft`, materialParams);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 125, 0);

    this.add(mesh);
  }
}
