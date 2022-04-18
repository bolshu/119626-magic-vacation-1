import * as THREE from 'three';
import ModelSaturn from "../models/saturn";
import ModelCarpet from "../models/carpet";

export default class StoryScene4 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
    this.addCarpet();
  }

  addSaturn() {
    const model = new ModelSaturn({
      colorBase: `shadowedDominantRed`,
      colorAdditional: `shadowedBrightPurple`,
    });
    model.position.set(250, 80, 100);

    this.add(model);
  }

  addCarpet() {
    const model = new ModelCarpet({
      colorBase: `shadowedLightPurple`,
      colorAdditional: `shadowedAdditionalPurple`,
    });

    model.position.set(0, -300, -250);
    model.rotateY(THREE.MathUtils.degToRad(-45));

    this.add(model);
  }
}
