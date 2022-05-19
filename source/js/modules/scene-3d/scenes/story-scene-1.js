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

  addSaturnAnimations() {
    this.animationClip.push(new Animation({
      func: (t, details) => {
        const rotationAmplitude = 0.002;
        const positionAmplitude = 0.75;
        const period = 10000;

        this.objects.saturn.rotation.x = this.objects.saturn.rotation.x + rotationAmplitude * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
        this.objects.saturn.position.x = this.objects.saturn.position.x + positionAmplitude * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
      },
      duration: `infinite`,
    }));
  }

  addSaturnRingAnimations() {
    this.animationClip.push(new Animation({
      func: (t, details) => {
        const amplitude = 0.008;
        const period = 3000;

        this.objects.saturnRing.rotation.x = this.objects.saturnRing.rotation.x + amplitude * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
      },
      duration: `infinite`,
    }));
  }

  addSaturn() {
    const model = new ModelSaturn({
      colorBase: `dominantRed`,
      colorAdditional: `brightPurple`,
      castShadow: true,
    });

    model.position.set(300, 500, 200);

    this.add(model);

    const ring = model.getObjectByName(`SaturnRing`);

    this.objects.saturn = model;
    this.objects.saturnRing = ring;
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
      func: (t, details) => {
        const amplitude = 0.3;
        const period = 500;

        this.objects.dogTail.rotation.x = this.objects.dogTail.rotation.x + amplitude * Math.sin(2 * Math.PI * (details.currentTime - details.startTime) / period);
      },
      duration: `infinite`,
      easing: _.easeInCubic,
    }));
  }

  async addDog() {
    const callback = async (mesh) => {
      mesh.position.set(470, 0, 470);
      mesh.rotateY(THREE.MathUtils.degToRad(60));
      mesh.castShadow = true;

      this.objects.dogTail = mesh.getObjectByName(`Tail`);

      await this.add(mesh);
      await this.addDogTailAnimations();
    };

    await this.modelsLoader.getModel({
      key: `dog`,
      material: null,
      castShadow: true,
      callback,
    });
  }

  async constructChildren() {
    this.addFlower();
    this.addSaturn();
    this.addCarpet();
    this.addFloor();
    this.addStatic();
    this.addWall();
    await this.addDog();
  }

  setAnimations() {
    this.addDogTailAnimations();
    this.addSaturnAnimations();
    this.addSaturnRingAnimations();
  }

  addAnimations(mixer) {
    this.animationClip.forEach((track) => {
      mixer.push(track);
    });
  }
}
