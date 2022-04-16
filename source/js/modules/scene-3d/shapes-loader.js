import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";

const SVG_IMG_FOLDER = `./img/module-6/svg-forms`;

const SVG_SHAPES = {
  flamingo: {
    src: `${SVG_IMG_FOLDER}/flamingo.svg`,
    paths: null,
  },
  snowflake: {
    src: `${SVG_IMG_FOLDER}/snowflake.svg`,
    paths: null,
  },
  question: {
    src: `${SVG_IMG_FOLDER}/question.svg`,
    paths: null,
  },
  leaf1: {
    src: `${SVG_IMG_FOLDER}/leaf.svg`,
    paths: null,
  },
  leaf2: {
    src: `${SVG_IMG_FOLDER}/leaf.svg`,
    paths: null,
  },
  keyhole: {
    src: `${SVG_IMG_FOLDER}/keyhole.svg`,
    paths: null,
  },
  flower: {
    src: `${SVG_IMG_FOLDER}/flower.svg`,
    paths: null,
  },
};

export default class ShapesLoader {
  constructor() {
    this.loader = new SVGLoader();
  }

  async getShape(key) {
    if (!SVG_SHAPES[key]) {
      throw new Error(`Wrong key! Check ShapesLoader.getShape argument`);
    }

    if (!SVG_SHAPES[key].paths) {
      await this.loadShape(key);
    }

    return SVG_SHAPES[key];
  }

  loadShape(key) {
    return new Promise((resolve, reject) => {
      this.loader.load(
          // resource URL
          SVG_SHAPES[key].src,
          // called when the resource is loaded
          async function (data) {
            SVG_SHAPES[key].paths = data.paths;
            resolve();
          },
          // called when loading is in progresses
          function (xhr) {
          // eslint-disable-next-line no-console
            console.log(key + ` ` + (xhr.loaded / xhr.total * 100) + `% loaded`);
          },
          // called when loading has errors
          function (error) {
          // eslint-disable-next-line no-console
            console.log(`An error happened`, error);
            reject();
          }
      );
    });
  }
}
