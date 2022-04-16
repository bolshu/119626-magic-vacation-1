import * as THREE from 'three';
import ModelSaturn from "../models/saturn";

export default class StoryScene4 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
  }

  addSaturn() {
    const model = new ModelSaturn({
      mainColor: `shadowedDominantRed`,
      additionalColor: `shadowedBrightPurple`,
    });
    model.position.set(250, 80, 100);

    this.add(model);
  }
}
