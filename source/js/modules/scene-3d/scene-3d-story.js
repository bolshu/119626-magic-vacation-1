import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; // TODO: remove. for devs only
import Animation from '../animation';
import Scene3D from "./scene-3d";
import StoryScene1 from "./scenes/story-scene-1";
import StoryScene2 from "./scenes/story-scene-2";
import StoryScene3 from "./scenes/story-scene-3";
import StoryScene4 from "./scenes/story-scene-4";

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

    this.sceneYAngle = 45;

    this.setAnimations();
  }

  setAnimations() {
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

  start() {
    this.setSceneBackground(0);

    this.scene.add(this.getScene1());
    // this.scene.add(this.getScene2());
    // this.scene.add(this.getScene3());
    // this.scene.add(this.getScene4());

    this.controls = new OrbitControls(this.camera, this.renderer.domElement); // TODO: remove. for devs only

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

  getScene1() {
    const story = new StoryScene1();

    story.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle));

    return story;
  }

  getScene2() {
    const story = new StoryScene2();

    story.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle + 90));

    return story;
  }

  getScene3() {
    const story = new StoryScene3();

    story.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle + 180));

    return story;
  }

  getScene4() {
    const story = new StoryScene4();

    story.rotateY(THREE.MathUtils.degToRad(this.sceneYAngle + 270));

    return story;
  }
}
