import * as THREE from 'three';
import Model from './model';

export default class ModelSnowman extends Model {
  constructor() {
    super();

    this.materialMainParams = {color: this.getColor(`snowColor`)};
    this.materialMain = this.getMaterial(`strong`, this.materialMainParams);

    this.materialAdditionalParams = {color: this.getColor(`orange`)};
    this.materialAdditional = this.getMaterial(`strong`, this.materialAdditionalParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addHead();
    this.addBody();
    this.addCarrot();
  }

  addHead() {
    const geometry = new THREE.SphereGeometry(44, 32, 32);
    const mesh = new THREE.Mesh(geometry, this.materialMain);

    mesh.position.set(0, 173, 0);

    this.add(mesh);
  }

  addBody() {
    const geometry = new THREE.SphereGeometry(75, 32, 32);
    const mesh = new THREE.Mesh(geometry, this.materialMain);

    mesh.position.set(0, 65, 0);

    this.add(mesh);
  }

  addCarrot() {
    const geometry = new THREE.ConeGeometry(18, 75, 30);
    const mesh = new THREE.Mesh(geometry, this.materialAdditional);

    mesh.position.set(50, 173, 0);
    mesh.rotateZ(THREE.MathUtils.degToRad(-90));

    this.add(mesh);
  }
}
