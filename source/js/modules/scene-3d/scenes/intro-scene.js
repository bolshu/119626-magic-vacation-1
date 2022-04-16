import * as THREE from 'three';
import ModelExtrudedSVG from '../models/model-extruded-svg';
import ModelKeyhole from '../models/keyhole';
import ShapesLoader from "../shapes-loader";

export default class IntroScene extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addQuestion();
    this.addFlamingo();
    this.addSnowflake();
    this.addLeaf();
    this.addKeyhole();
  }

  async addQuestion() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`question`);
    const model = new ModelExtrudedSVG(shape).get3DModel();

    model.position.set(0, 0, 20);
    model.rotateX(THREE.MathUtils.degToRad(-220));
    model.scale.set(2, 2, 2);

    this.add(model);
  }

  async addFlamingo() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flamingo`);
    const model = new ModelExtrudedSVG(shape).get3DModel();

    model.position.set(-250, 200, 50);
    model.rotateX(THREE.MathUtils.degToRad(-215));
    model.rotateY(THREE.MathUtils.degToRad(-205));
    model.scale.set(2, 2, 1);

    this.add(model);
  }

  async addSnowflake() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`snowflake`);
    const model = new ModelExtrudedSVG(shape).get3DModel();

    model.position.set(-200, 0, 40);
    model.rotateX(THREE.MathUtils.degToRad(-15));
    model.rotateY(THREE.MathUtils.degToRad(25));

    this.add(model);
  }

  async addLeaf() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf1`);
    const model = new ModelExtrudedSVG(shape).get3DModel();

    model.position.set(200, 100, 70);
    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(0));

    this.add(model);
  }

  async addKeyhole() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`keyhole`);
    const model = new ModelKeyhole(shape);

    model.position.set(-1000, 1000, 20);
    model.rotateX(THREE.MathUtils.degToRad(180));

    this.add(model);
  }
}
