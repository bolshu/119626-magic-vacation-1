import * as THREE from 'three';
import ModelExtrudedSVG from './model-extruded-svg';

export default class ModelKeyhole extends ModelExtrudedSVG {
  constructor(shape) {
    super(shape);

    this.depth = 20;
    this.cap = 2;

    this.materialMainParams = {color: this.getColor(`darkPurple`)};
    this.materialMain = this.getMaterial(`soft`, this.materialMainParams);

    this.materialAdditionalParams = {color: this.getColor(`purple`)};
    this.materialAdditional = this.getMaterial(`basic`, this.materialAdditionalParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addKeyhole();
    this.addKeyholeBg();
  }

  addKeyhole() {
    const mesh = this.get3DModel(this.materialMain);

    this.add(mesh);
  }

  addKeyholeBg() {
    const geometry = new THREE.BoxGeometry(1000, 1000, 1);
    const mesh = new THREE.Mesh(geometry, this.materialAdditional);

    mesh.position.set(1000, 1000, 200);

    this.add(mesh);
  }
}
