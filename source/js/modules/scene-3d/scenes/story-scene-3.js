import * as THREE from 'three';
import ModelSnowman from '../models/snowman';
import ModelRoad from '../models/road';
import ModelFloor from '../models/floor';
import Model from '../models/model';
import ModelsLoader from '../models-loader';

export default class StoryScene3 extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman();
    this.addRoad();
    this.addFloor();
    this.addStatic();
    this.addWall();
    this.addCompass();
  }

  addSnowman() {
    const model = new ModelSnowman();

    model.position.set(200, 50, 400);

    this.add(model);
  }

  addRoad() {
    const model = new ModelRoad();

    this.add(model);
  }

  addFloor() {
    const model = new ModelFloor({
      colorBase: `mountainBlue`,
    });

    model.rotateX(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  async addStatic() {
    const modelName = `scene3Static`;

    const callback = (mesh) => {
      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }

  async addWall() {
    const modelName = `wall`;
    const model = new Model();
    const material = model.getMaterial(`soft`, {color: model.getColor(`skyLightBlue`), side: THREE.DoubleSide});

    const callback = (mesh) => {
      mesh.name = modelName;

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, material, callback);
  }

  async addCompass() {
    const modelName = `compass`;

    const callback = (mesh) => {
      mesh.position.set(50, 0, 20);
      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }
}
