import * as THREE from 'three';
import ShapesLoader from "../shapes-loader";
import ModelStreetLamp from '../models/street-lamp';
import ModelPyramid from '../models/pyramid';
import ModelLeaf2 from '../models/leaf-2';
import ModelFloor from '../models/floor';
import Model from '../models/model';
import ModelsLoader from '../models-loader';

export default class StoryScene2 extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();

    this.constructChildren();
  }

  constructChildren() {
    this.addFloor();
    this.addStreetLamp();
    this.addPyramid();
    this.addLeaf1();
    this.addLeaf2();
    this.addFloor();
    this.addStatic();
    this.addWall();
  }

  addStreetLamp() {
    const model = new ModelStreetLamp();

    model.position.set(650, 0, 120);

    this.add(model);
  }

  addPyramid() {
    const model = new ModelPyramid();

    model.position.set(230, 140, 280);

    this.add(model);
  }

  async addLeaf1() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf2`);
    const model = new ModelLeaf2(shape);

    model.scale.set(2.7, 2.7, 1);
    model.position.set(100, 350, 400);
    model.rotateX(THREE.MathUtils.degToRad(-15));
    model.rotateY(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  async addLeaf2() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf2`);
    const model = new ModelLeaf2(shape);

    model.scale.set(1.5, 1.5, 1);
    model.position.set(100, 120, 500);
    model.rotateX(THREE.MathUtils.degToRad(25));
    model.rotateY(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  addFloor() {
    const model = new ModelFloor({
      colorBase: `brightBlue`,
    });

    model.rotateX(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  async addStatic() {
    const modelName = `scene2Static`;

    const callback = (mesh) => {
      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, null, callback);
  }

  async addWall() {
    const modelName = `wall`;
    const model = new Model();
    const material = model.getMaterial(`basic`, {color: model.getColor(`blue`), side: THREE.DoubleSide});

    const callback = (mesh) => {
      mesh.name = modelName;

      this.add(mesh);
    };

    await this.modelsLoader.getModel(modelName, material, callback);
  }
}
