import ModelExtrudedSVG from './model-extruded-svg';

export default class ModelLeaf2 extends ModelExtrudedSVG {
  constructor(shape) {
    super(shape);

    this.depth = 3;
    this.cap = 2;

    this.materialParams = {color: this.getColor(`green`)};
    this.material = this.getMaterial(`basic`, this.materialParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addLeaf2();
  }

  addLeaf2() {
    const mesh = this.get3DModel(this.material);

    this.add(mesh);
  }
}
