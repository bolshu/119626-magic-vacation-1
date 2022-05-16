import * as THREE from 'three';
import ShapesLoader from "../shapes-loader";
import ModelSaturn from "../models/saturn";
import ModelFlower from "../models/flower";
import ModelCarpet from "../models/carpet";
import ModelFloor from "../models/floor";
import Model from "../models/model";
import ModelsLoader from "../models-loader";
import _ from '../../timing-functions';
import Animation from '../../animation';

export default class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();
    this.objects = {};
    this.animationClip = [];

    this.constructChildren();
    this.setAnimations();
  }

  async addFlower() {
    const loader = new ShapesLoader();
    const shape = await loader.getShape(`flower`);
    const model = new ModelFlower({
      shape,
      castShadow: true,
    });

    model.position.set(57, 420, 100);
    model.rotateX(THREE.MathUtils.degToRad(180));
    model.rotateY(THREE.MathUtils.degToRad(90));

    this.add(model);
  }

  addSaturn() {
    const model = new ModelSaturn({
      colorBase: `dominantRed`,
      colorAdditional: `brightPurple`,
      castShadow: true,
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

    await this.modelsLoader.getModel({
      key: `scene1Static`,
      material: null,
      castShadow: true,
      receiveShadow: true,
      callback,
    });
  }

  async addWall() {
    const model = new Model();
    const material = model.getMaterial(`soft`, {color: model.getColor(`purple`), side: THREE.DoubleSide});

    const callback = (mesh) => {
      this.add(mesh);
    };

    await this.modelsLoader.getModel({
      key: `wall`,
      material,
      receiveShadow: true,
      callback,
    });
  }

  addDogTailAnimations() {

    this.animationClip.push(new Animation({
      func: (t) => {
        // TODO: implement
        this.objects.dogTail.position.y = this.objects.dogTail.position.y * t + 200;
      },
      duration: `infinite`,
      easing: _.easeInCubic,
    }));
  }

  async addDog() {
    const callback = (mesh) => {
      mesh.position.set(470, 0, 470);
      mesh.rotateY(THREE.MathUtils.degToRad(60));
      mesh.castShadow = true;

      this.objects.dogTail = mesh.getObjectByName(`Tail`);

      this.add(mesh);
      this.addDogTailAnimations();
    };

    await this.modelsLoader.getModel({
      key: `dog`,
      material: null,
      castShadow: true,
      callback,
    });
  }

  async constructChildren() {
    // this.addFlower();
    // this.addSaturn();
    // this.addCarpet();
    // this.addFloor();
    // this.addStatic();
    // this.addWall();
    await this.addDog();
  }

  setAnimations() {
    this.addDogTailAnimations();
  }

  addAnimations(mixer) {
    console.log(`add anim`, this.animationClip);
    this.animationClip.forEach((track) => {
      mixer.push(track);
    });
  }
}
