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
      mainColor: `dominantRed`,
      additionalColor: `brightPurple`,
    });
    model.position.set(-250, 80, 100);

    this.add(model);
  }

  addCarpet() {
    const model = new ModelCarpet();

    model.position.set(0, -50, 0);
    model.scale.set(0.5, 0.5, 1);
    model.rotateY(THREE.MathUtils.degToRad(-45));

    this.add(model);
  }
}
