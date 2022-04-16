import ModelExtrudedSVG from './model-extruded-svg';

export default class ModelFlamingo extends ModelExtrudedSVG {
  constructor(shape) {
    super(shape);

    this.depth = 8;
    this.cap = 2;

    this.materialParams = {color: this.getColor(`lightDominantRed`)};
    this.material = this.getMaterial(`soft`, this.materialParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addFlamingo();
  }

  addFlamingo() {
    const mesh = this.get3DModel(this.material);

    this.add(mesh);
  }
}
