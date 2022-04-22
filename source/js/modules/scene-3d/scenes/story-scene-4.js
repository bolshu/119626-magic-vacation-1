import * as THREE from 'three';
import ModelSaturn from "../models/saturn";
import ModelCarpet from "../models/carpet";
import ModelFloor from '../models/floor';
import Model from '../models/model';
import ModelsLoader from '../models-loader';

export default class StoryScene4 extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();

    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
    this.addCarpet();
    this.addFloor();
    this.addStatic();
    this.addWall();
    this.addSonya();
  }

  addSaturn() {
    const model = new ModelSaturn({
      colorBase: `shadowedDominantRed`,
      colorAdditional: `shadowedBrightPurple`,
    });
    model.position.set(300, 500, 200);

    this.add(model);
  }

  addCarpet() {
    const model = new ModelCarpet({
      colorBase: `shadowedLightPurple`,
      colorAdditional: `shadowedAdditionalPurple`,
    });

    this.add(model);
  }

  addFloor() {
    const model = new ModelFloor({
      colorBase: `shadowedDarkPurple`,
    });

    model.rotateX(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  async addStatic() {
    const modelName = `scene4Static`;

    const callback = (mesh) => {
      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }

  async addWall() {
    const modelName = `wall`;
    const model = new Model();
    const material = model.getMaterial(`basic`, {color: model.getColor(`shadowedPurple`), side: THREE.DoubleSide});

    const callback = (mesh) => {
      mesh.name = modelName;

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, material, callback);
  }

  async addSonya() {
    const modelName = `sonya`;

    const callback = (mesh) => {
      mesh.position.set(450, 140, 300);

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }
}
