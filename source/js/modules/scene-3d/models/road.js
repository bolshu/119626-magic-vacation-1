import * as THREE from "three";
import vertexShader from '../../../shaders/vertex-shader-lambert.glsl';
import fragmentShader from '../../../shaders/fragment-shader-road.glsl';
import Material from "../materials/material";
import Model from "./model";


export default class ModelRoad extends Model {
  constructor() {
    super();

    this.degStart = 0;
    this.degEnd = 90;

    this.constructChildren();
  }

  constructChildren() {
    this.addRoad();
  }

  addRoad() {
    const points = this.getLathePoints(160, 3, 732);
    const start = THREE.MathUtils.degToRad(this.degStart);
    const length = this.getDegLength(this.degStart, this.degEnd);

    const geometry = new THREE.LatheGeometry(points, 50, start, length);
    const material = new Material({
      vertexShader: vertexShader.sourceCode,
      fragmentShader: fragmentShader.sourceCode,
      colorBase: this.getColor(`grey`),
      colorAdditional: this.getColor(`white`),
    });
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }
}
