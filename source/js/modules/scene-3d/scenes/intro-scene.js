import * as THREE from 'three';
import ShapesLoader from "../shapes-loader";
import ModelsLoader from "../models-loader";
import ModelKeyhole from '../models/keyhole';
import ModelFlamingo from '../models/flamingo';
import ModelSnowflake from '../models/snowflake';
import ModelQuestion from '../models/question';
import ModelSaturn from '../models/saturn';
import ModelLeaf1 from '../models/leaf-1';
import Model from '../models/model';

const Z_POS = 200;

export default class IntroScene extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();

    this.constructChildren();
  }

  constructChildren() {
    this.addKeyhole();
    this.addQuestion();
    this.addFlamingo();
    this.addSnowflake();
    this.addLeaf();

    this.addSuitcase();
    this.addWatermelon();
    this.addAirplane();

    this.addSaturn();
  }

  async addQuestion() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`question`);
    const model = new ModelQuestion(shape);

    model.position.set(100, -250, Z_POS);

    model.rotateX(THREE.MathUtils.degToRad(140));
    model.rotateZ(THREE.MathUtils.degToRad(-20));

    this.add(model);
  }

  async addFlamingo() {
    const scale = 2;
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flamingo`);
    const model = new ModelFlamingo(shape);

    model.position.set(-400, 300, Z_POS);
    model.scale.set(scale, scale, scale);

    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(160));
    model.rotateZ(THREE.MathUtils.degToRad(15));

    this.add(model);
  }

  async addSnowflake() {
    const scale = 0.85;
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`snowflake`);
    const model = new ModelSnowflake(shape);

    model.position.set(-350, 0, Z_POS);
    model.scale.set(scale, scale, scale);

    model.rotateX(THREE.MathUtils.degToRad(-20));
    model.rotateY(THREE.MathUtils.degToRad(35));

    this.add(model);
  }

  async addLeaf() {
    const scale = 1.5;
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf1`);
    const model = new ModelLeaf1(shape);

    model.position.set(500, 300, Z_POS);
    model.scale.set(scale, scale, scale);

    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(55));
    model.rotateZ(THREE.MathUtils.degToRad(85));

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
    const scale = 0.4;
    const modelName = `suitcase`;

    const callback = (mesh) => {
      mesh.name = modelName;

      mesh.position.set(-50, -125, Z_POS);
      mesh.scale.set(scale, scale, scale);

      mesh.rotateX(THREE.MathUtils.degToRad(35));
      mesh.rotateY(THREE.MathUtils.degToRad(-140));
      mesh.rotateZ(THREE.MathUtils.degToRad(15));

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }

  async addWatermelon() {
    const scale = 1.5;
    const modelName = `watermelon`;

    const callback = (mesh) => {
      mesh.name = modelName;

      mesh.position.set(-600, -250, Z_POS);
      mesh.scale.set(scale, scale, scale);

      mesh.rotateZ(THREE.MathUtils.degToRad(140));

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }

  async addAirplane() {
    const scale = 1;
    const modelName = `airplane`;
    const model = new Model();
    const material = model.getMaterial(`soft`, {color: model.getColor(`white`)});

    const callback = (mesh) => {
      mesh.name = modelName;

      mesh.position.set(200, 100, Z_POS);
      mesh.scale.set(scale, scale, scale);

      mesh.rotateX(THREE.MathUtils.degToRad(55));
      mesh.rotateY(THREE.MathUtils.degToRad(140));

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, material, callback);
  }

  addSaturn() {
    const scale = 0.5;
    const model = new ModelSaturn({
      colorBase: `dominantRed`,
      colorAdditional: `brightPurple`,
      shouldRenderSattelite: false,
    });

    model.position.set(350, -100, Z_POS);
    model.scale.set(scale, scale, scale);

    this.add(model);
  }
}
