import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; // TODO: remove. for devs only
import Scene3D from "./scene-3d";
import IntroScene from "./scenes/intro-scene";

export default class Scene3DIntro extends Scene3D {
  constructor() {
    const canvas = document.getElementById(`intro-scene`);

    super({canvas});

    this.setAnimations();
  }

  setAnimations() {
    // TODO: implement
  }

  start() {
    this.scene.add(new IntroScene());

    this.controls = new OrbitControls(this.camera, this.renderer.domElement); // TODO: remove. for devs only

    super.start();
  }
}
