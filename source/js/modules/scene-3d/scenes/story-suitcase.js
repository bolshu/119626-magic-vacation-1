import * as THREE from 'three';
import Animation from '../../animation';
import ModelsLoader from '../models-loader';

export default class StorySuitcase extends THREE.Group {
  constructor() {
    super();

    this.modelsLoader = new ModelsLoader();
  }

  addSuitcaseAnimations(scene) {
    const scale = 0.8;
    const multiplier = 0.1;

    const animations = [
      new Animation({
        func: (t) => {
          scene.objects.suitcase.position.y = scene.objects.suitcase.position.y - scene.objects.suitcase.position.y * t;
        },
        duration: 1500,
      }),
      new Animation({
        func: (t) => {
          scene.objects.suitcase.scale.set(scale + multiplier * t, scale - multiplier * t, scale + multiplier * t);
        },
        delay: 1000,
        duration: 200,
      }),
      new Animation({
        func: (t) => {
          scene.objects.suitcase.scale.set(
              scale + multiplier - multiplier * t,
              scale - multiplier + multiplier * t,
              scale + multiplier - multiplier * t,
          );
        },
        delay: 1200,
        duration: 200,
      }),
    ];

    animations.forEach((animation) => {
      scene.animations.push(animation);
    });
  }

  async addSuitcase() {
    const callback = (mesh) => {
      const scale = 0.8;

      this.add(mesh);
      this.position.set(-350, 100, 780);
      this.rotateY(THREE.MathUtils.degToRad(20));
      this.scale.set(scale, scale, scale);
    };

    await this.modelsLoader.getModel({
      key: `suitcase`,
      material: null,
      callback,
    });
  }

  constructChildren() {
    this.addSuitcase();
  }

  addAnimations(scene) {
    this.addSuitcaseAnimations(scene);
  }
}
