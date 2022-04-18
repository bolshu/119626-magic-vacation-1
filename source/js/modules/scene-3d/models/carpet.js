import * as THREE from "three";
import vertexShader from '../../../shaders/vertex-shader-lambert.glsl';
import fragmentShader from '../../../shaders/fragment-shader-carpet.glsl';
import Material from "../materials/material";
import Model from "./model";


export default class ModelCarpet extends Model {
  constructor({
    colorBase,
    colorAdditional,
  }) {
    super();

    this.degStart = 16;
    this.degEnd = 74;

    this.constructChildren(colorBase, colorAdditional);
  }

  constructChildren(colorBase, colorAdditional) {
    this.addCarpet(colorBase, colorAdditional);
  }

  addCarpet(colorBase, colorAdditional) {
    const points = this.getLathePoints(180, 3, 763);
    const start = THREE.MathUtils.degToRad(this.degStart);
    const length = this.getDegLength(this.degStart, this.degEnd);

    const geometry = new THREE.LatheGeometry(points, 50, start, length);
    const material = new Material({
      vertexShader: vertexShader.sourceCode,
      fragmentShader: fragmentShader.sourceCode,
      colorBase: this.getColor(colorBase),
      colorAdditional: this.getColor(colorAdditional),
    });
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
