import * as THREE from 'three';
import ModelSnowman from '../models/snowman';
import ModelRoad from '../models/road';

export default class StoryScene3 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman();
    this.addRoad();
  }

  addSnowman() {
    const model = new ModelSnowman();

    model.position.set(-150, -250, 150);
    model.rotateY(THREE.MathUtils.degToRad(-45));

    this.add(model);
  }

  addRoad() {
    const model = new ModelRoad();

    model.scale.set(0.5, 0.5, 1);
    model.rotateY(THREE.MathUtils.degToRad(-45));
    model.position.set(0, 50, 0);

    this.add(model);
  }
}
