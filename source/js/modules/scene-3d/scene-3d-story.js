import * as THREE from 'three';
import Animation from '../animation';
import Scene3D from "./scene-3d";
import StoryScene1 from "./scenes/story-scene-1";
import StoryScene2 from "./scenes/story-scene-2";
import StoryScene3 from "./scenes/story-scene-3";
import StoryScene4 from "./scenes/story-scene-4";
import StorySuitcase from "./scenes/story-suitcase";

const SCENE_IMG_FOLDER = `./img/module-5/scenes-textures`;

const SCENE_BGS = [
  {
    src: `${SCENE_IMG_FOLDER}/scene-1.png`, // #a0ceff
    texture: null,
  },
  {
    src: `${SCENE_IMG_FOLDER}/scene-2.png`, // #3e72ee
    texture: null,
    shouldRenderBubbles: true,
  },
  {
    src: `${SCENE_IMG_FOLDER}/scene-3.png`, // #5f458c
    texture: null,
  },
  {
    src: `${SCENE_IMG_FOLDER}/scene-4.png`, // #a67ee5
    texture: null,
  },
];

export default class Scene3DStory extends Scene3D {
  constructor() {
    const canvas = document.getElementById(`story-scene`);

    super({canvas});

    this.sceneYAngle = -45;
  }

  addBubblesAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgressHue = {value: progress};
        }
      },
      duration: 2000,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgressBubble1 = {value: progress};
        }
      },
      duration: 1300,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgressBubble2 = {value: progress};
        }
      },
      duration: 1200,
      delay: 700,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        if (this.material) {
          this.material.uniforms.uProgressBubble3 = {value: progress};
        }
      },
      duration: 1100,
      delay: 1200,
    }));
  }

  addAnimations() {
    this.addBubblesAnimations();
  }

  async start() {
    this.addAnimations();
    this.setSceneBackground(0);

    // this.addSuitcase();
    await this.addScene1();
    // this.scene.add(this.getScene2());
    // this.scene.add(this.getScene3());
    // this.scene.add(this.getScene4());

    super.start();
  }

  setSceneBackground(slideCount) {
    if (SCENE_BGS[slideCount].texture) {
      this.updateBackground(SCENE_BGS[slideCount]);
    } else {
      this.textureLoader.load(SCENE_BGS[slideCount].src, (texture) => {
        SCENE_BGS[slideCount].texture = texture;

        this.updateBackground(SCENE_BGS[slideCount]);
      });
    }

    if (slideCount === 1) {
      super.startAnimation();
    } else {
      super.stopAnimation();
    }
  }

  renderScene() {
    this.controls.update(); // TODO: remove. for devs only

    super.renderScene();
  }

  async addScene1() {
    const group = new StoryScene1();

    await group.addAnimations(this.animations);
    group.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle));

    this.scene.add(group);
  }

  getScene2() {
    const group = new StoryScene2();

    group.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle + 90));

    return group;
  }

  getScene3() {
    const group = new StoryScene3();

    group.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle + 180));

    return group;
  }

  getScene4() {
    const group = new StoryScene4();

    group.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle + 270));

    return group;
  }

  addSuitcase() {
    const group = new StorySuitcase(this);

    group.addAnimations(this.animations);
    group.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle));

    this.scene.add(group);
  }
}
