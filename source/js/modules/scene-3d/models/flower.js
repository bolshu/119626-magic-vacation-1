import ModelExtrudedSVG from './model-extruded-svg';

export default class ModelFlower extends ModelExtrudedSVG {
  constructor(shape) {
    super(shape);

    this.depth = 4;
    this.cap = 2;

    this.materialParams = {color: this.getColor(`additionalPurple`)};
    this.material = this.getMaterial(`basic`, this.materialParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addFlower();
  }

  addFlower() {
    const mesh = this.get3DModel(this.material);

    this.add(mesh);
  }
}
