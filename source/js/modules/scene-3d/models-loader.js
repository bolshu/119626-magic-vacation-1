import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const MODEL_FOLDER = `./img/module-6/models`;

const MODELS = {
  airplane: {
    path: `${MODEL_FOLDER}/airplane.obj`,
    model: null,
  },
  suitcase: {
    path: `${MODEL_FOLDER}/suitcase.gltf`,
    model: null,
  },
  watermelon: {
    path: `${MODEL_FOLDER}/watermelon.gltf`,
    model: null,
  },
  wall: {
    path: `${MODEL_FOLDER}/WallCornerUnit.obj`,
    model: null,
  },
  scene1Static: {
    path: `${MODEL_FOLDER}/scene1-static-output-1.gltf`,
    model: null,
  },
  scene2Static: {
    path: `${MODEL_FOLDER}/scene2-static-output-1.gltf`,
    model: null,
  },
  scene3Static: {
    path: `${MODEL_FOLDER}/scene3-static-output-1.gltf`,
    model: null,
  },
  scene4Static: {
    path: `${MODEL_FOLDER}/scene4-static-output-1.gltf`,
    model: null,
  },
};

export default class ModelsLoader {
  async loadObj(path, onComplete) {
    const loaderObj = new OBJLoader();

    await loaderObj.load(path, onComplete);
  }

  async loadGltf(path, onComplete) {
    const loaderGltf = new GLTFLoader();

    await loaderGltf.load(path, onComplete);
  }

  onComplete(obj3d, material, callback) {
    if (material) {
      obj3d.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
          // TODO: cast shadow here
          // child.castShadow = true;
        }
      });
    }

    if (typeof callback === `function`) {
      callback.call(null, obj3d);
    }
  }

  setModel(key, model) {
    if (!MODELS[key].model) {
      MODELS[key].model = model;
    }
  }

  async getModel(key, material, callback) {
    if (!key || !MODELS[key]) {
      throw new Error(`Wrong key! Check ModelsLoader.setModel argument`);
    }

    if (!MODELS[key].model) {
      await this.loadModel(key, material, callback);
    }

    return MODELS[key].model;
  }

  getFileExt(path) {
    const splittedPath = path.split(`/`);
    const filename = splittedPath.pop();

    return filename.split(`.`).pop();
  }

  async loadModel(key, material, callback) {
    const params = MODELS[key];

    if (!params) {
      return;
    }

    const onGltfComplete = (gltf) => {
      if (!gltf.scene) {
        return;
      }

      this.setModel(key, gltf.scene);
      this.onComplete(gltf.scene, material, callback);
    };

    const onObjectComplete = (obj) => {
      if (!obj) {
        return;
      }

      this.setModel(key, obj);
      this.onComplete(obj, material, callback);
    };

    if (this.getFileExt(params.path) === `gltf`) {
      await this.loadGltf(params.path, onGltfComplete);
    } else {
      await this.loadObj(params.path, onObjectComplete);
    }
  }
}
