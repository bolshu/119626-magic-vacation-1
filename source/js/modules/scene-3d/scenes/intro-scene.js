import * as THREE from 'three';
import ShapesLoader from "../shapes-loader";
import ModelsLoader from "../models-loader";
import ModelKeyhole from '../models/keyhole';
import ModelFlamingo from '../models/flamingo';
import ModelSnowflake from '../models/snowflake';
import ModelQuestion from '../models/question';
import ModelLeaf1 from '../models/leaf-1';

export default class IntroScene extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();

    this.constructChildren();
  }

  constructChildren() {
    this.addQuestion();
    this.addFlamingo();
    this.addSnowflake();
    this.addLeaf();
    this.addKeyhole();

    this.addSuitcase();
    this.addWatermelon();
    this.addAirplane();
  }

  async addQuestion() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`question`);
    const model = new ModelQuestion(shape);

    model.position.set(0, 0, 20);
    model.rotateX(THREE.MathUtils.degToRad(-220));
    model.scale.set(2, 2, 2);

    this.add(model);
  }

  async addFlamingo() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flamingo`);
    const model = new ModelFlamingo(shape);

    model.position.set(-250, 200, 50);
    model.rotateX(THREE.MathUtils.degToRad(-215));
    model.rotateY(THREE.MathUtils.degToRad(-205));
    model.scale.set(2, 2, 1);

    this.add(model);
  }

  async addSnowflake() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`snowflake`);
    const model = new ModelSnowflake(shape);

    model.position.set(-200, 0, 40);
    model.rotateX(THREE.MathUtils.degToRad(-15));
    model.rotateY(THREE.MathUtils.degToRad(25));

    this.add(model);
  }

  async addLeaf() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf1`);
    const model = new ModelLeaf1(shape);

    model.position.set(200, 100, 70);
    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(0));

    this.add(model);
  }

  async addKeyhole() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`keyhole`);
    const model = new ModelKeyhole(shape);

    model.position.set(-1000, 1000, 0);
    model.rotateX(THREE.MathUtils.degToRad(180));

    this.add(model);
  }

  async addSuitcase() {
    const modelName = `suitcase`;

    const callback = (mesh) => {
      mesh.name = modelName;
      mesh.position.set(-100, -200, 50);
      mesh.rotateY(THREE.MathUtils.degToRad(15));
      mesh.rotateX(THREE.MathUtils.degToRad(45));

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }

  async addWatermelon() {
    const modelName = `watermelon`;

    const callback = (mesh) => {
      mesh.name = modelName;
      mesh.position.set(150, -100, 150);

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }

  async addAirplane() {
    const modelName = `airplane`;
    const material = new THREE.MeshLambertMaterial({color: `white`});

    const callback = (mesh) => {
      mesh.name = modelName;
      mesh.position.set(-250, -100, 150);
      mesh.rotateZ(THREE.MathUtils.degToRad(25));

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, material, callback);
  }
}
