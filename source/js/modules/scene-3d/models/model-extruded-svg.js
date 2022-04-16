import * as THREE from 'three';
import Model from './model';

export default class ModelExtrudedSVG extends Model {
  constructor(shape) {
    super();

    this.group = new THREE.Group();
    this.depth = shape.depth;
    this.cap = shape.cap;
    this.paths = shape.paths;
  }

  get3DModel(material) {
    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];
      const shapes = path.toShapes(false);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: this.depth,
          bevelThickness: this.cap
        });
        const mesh = new THREE.Mesh(geometry, material);

        this.group.add(mesh);
      }
    }

    return this.group;
  }
}
