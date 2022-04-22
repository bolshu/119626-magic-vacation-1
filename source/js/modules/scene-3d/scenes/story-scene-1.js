import * as THREE from 'three';
import ShapesLoader from "../shapes-loader";
import ModelSaturn from "../models/saturn";
import ModelFlower from "../models/flower";
import ModelCarpet from "../models/carpet";
import ModelFloor from "../models/floor";
import Model from "../models/model";
import ModelsLoader from "../models-loader";

export default class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();

    this.constructChildren();
  }

  constructChildren() {
    this.addFlower();
    this.addSaturn();
    this.addCarpet();
    this.addFloor();
    this.addStatic();
    this.addWall();
    this.addDog();
  }

  async addFlower() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flower`);
    const model = new ModelFlower(shape);

    model.position.set(57, 420, 100);
    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  addSaturn() {
    const model = new ModelSaturn({
      colorBase: `dominantRed`,
      colorAdditional: `brightPurple`,
    });

    model.position.set(300, 500, 200);

    this.add(model);
  }

  addCarpet() {
    const model = new ModelCarpet({
      colorBase: `lightPurple`,
      colorAdditional: `additionalPurple`,
    });

    model.position.set(0, 0, 0);

    this.add(model);
  }

  addFloor() {
    const model = new ModelFloor({
      colorBase: `darkPurple`,
    });

    model.rotateX(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  async addStatic() {
    const callback = (mesh) => {
      this.add(mesh);
    };

    await this.modelsLoader.getModel(`scene1Static`, null, callback);
  }

  async addWall() {
    const model = new Model();
    const material = model.getMaterial(`soft`, {color: model.getColor(`purple`), side: THREE.DoubleSide});

    const callback = (mesh) => {
      this.add(mesh);
    };

    await this.modelsLoader.getModel(`wall`, material, callback);
  }

  async addDog() {
    const callback = (mesh) => {
      mesh.position.set(470, 0, 470);
      mesh.rotateY(THREE.MathUtils.degToRad(60));
      this.add(mesh);
    };

    await this.modelsLoader.getModel(`dog`, null, callback);
  }
}
