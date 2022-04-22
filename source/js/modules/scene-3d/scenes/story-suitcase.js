import * as THREE from 'three';
import ModelsLoader from '../models-loader';

export default class StorySuitcase extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();

    this.constructChildren();
  }

  constructChildren() {
    this.addSuitcase();
  }

  async addSuitcase() {
    const callback = (mesh) => {
      this.add(mesh);
    };

    await this.modelsLoader.getModel(`suitcase`, null, callback);
  }
}
