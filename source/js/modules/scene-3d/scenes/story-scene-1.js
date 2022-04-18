import * as THREE from 'three';
import ShapesLoader from "../shapes-loader";
import ModelSaturn from "../models/saturn";
import ModelFlower from "../models/flower";
import ModelCarpet from "../models/carpet";

export default class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addFlower();
    this.addSaturn();
    this.addCarpet();
  }

  async addFlower() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flower`);
    const model = new ModelFlower(shape);

    model.position.set(-100, 150, 50);
    model.rotateY(THREE.MathUtils.degToRad(-45));
    model.rotateX(THREE.MathUtils.degToRad(-180));

    this.add(model);
  }

  addSaturn() {
    const model = new ModelSaturn({
      colorBase: `dominantRed`,
      colorAdditional: `brightPurple`,
    });
    model.position.set(-250, 80, 100);

    this.add(model);
  }

  addCarpet() {
    const model = new ModelCarpet({
      colorBase: `lightPurple`,
      colorAdditional: `additionalPurple`,
    });

    model.position.set(0, -200, -250);
    model.rotateY(THREE.MathUtils.degToRad(-45));

    this.add(model);
  }
}
