import ModelExtrudedSVG from './model-extruded-svg';

export default class ModelKeyhole extends ModelExtrudedSVG {
  constructor(shape) {
    super(shape);

    this.materialParams = {
      color: this.getColor(`darkPurple`),
      depth: 20,
      cap: 2,
    };
    this.material = this.getMaterial(`soft`, this.materialParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addKeyhole();
  }

  addKeyhole() {
    const mesh = this.get3DModel(this.material);

    this.add(mesh);
  }
}
