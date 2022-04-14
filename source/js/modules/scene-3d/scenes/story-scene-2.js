import * as THREE from 'three';
import ExtrudedSVG from '../extruded-svg';
import ModelStreetLamp from '../models/street-lamp';
import ModelPyramid from '../models/pyramid';
import ShapesLoader from "../shapes-loader";

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
    model.position.set(200, -250, 0); // TODO: change

    this.add(model);
  }

  addPyramid() {
    const model = new ModelPyramid();
    model.position.set(0, -250, 0); // TODO: change

    this.add(model);
  }

  async addLeaf() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`leaf2`);
    const model = new ExtrudedSVG(shape).get3DModel();

    model.position.set(50, -100, 50); // TODO: change

    this.add(model);
  }
}