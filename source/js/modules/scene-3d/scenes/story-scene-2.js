import * as THREE from 'three';
import ShapesLoader from "../shapes-loader";
import ModelStreetLamp from '../models/street-lamp';
import ModelPyramid from '../models/pyramid';
import ModelLeaf2 from '../models/leaf-2';

export default class StoryScene2 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addStreetLamp();
    this.addPyramid();
    this.addLeaf();
  }

  addStreetLamp() {
    const model = new ModelStreetLamp();
    model.position.set(200, -250, 0);

    this.add(model);
  }

  addPyramid() {
    const model = new ModelPyramid();
    model.position.set(0, -250, 0);

    this.add(model);
  }

  async addLeaf() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf2`);
    const model = new ModelLeaf2(shape);

    model.position.set(50, -100, 50);

    this.add(model);
  }
}
