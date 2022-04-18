import * as THREE from 'three';
import Model from './model';

export default class ModelSaturn extends Model {
  constructor({
    colorBase,
    colorAdditional,
  }) {
    super();
    this.radiusPlanet = 60;
    this.radiusSatelite = 10;
    this.radiusRingInner = 80;
    this.radiusRingOuter = 120;

    this.materialMainParams = {color: this.getColor(colorBase)};
    this.materialMain = this.getMaterial(`soft`, this.materialMainParams);

    this.materialAdditionalParams = {color: this.getColor(colorAdditional)};
    this.materialSatelite = this.getMaterial(`soft`, this.materialAdditionalParams);
    this.materialRing = this.getMaterial(`soft`, {
      ...this.materialAdditionalParams,
      side: THREE.DoubleSide,
    });

    this.materialRopeParams = {color: this.getColor(`metalGrey`)};
    this.materialRope = this.getMaterial(`soft`, this.materialRopeParams);

    this.constructChildren();
  }

  constructChildren() {
    this.addPlanet();
    this.addSatellite();
    this.addRope();
    this.addRing();
  }

  addPlanet() {
    const geometry = new THREE.SphereGeometry(this.radiusPlanet, 32, 32);
    const mesh = new THREE.Mesh(geometry, this.materialMain);

    this.add(mesh);
  }

  addSatellite() {
    const geometry = new THREE.SphereGeometry(this.radiusSatelite, 32, 32);
    const mesh = new THREE.Mesh(geometry, this.materialSatelite);
    const meshY = this.radiusPlanet * 2;

    mesh.position.set(0, meshY, 0);

    this.add(mesh);
  }

  addRope() {
    const geometry = new THREE.CylinderGeometry(1, 1, 1000, 8);
    const mesh = new THREE.Mesh(geometry, this.materialRope);
    const meshY = this.radiusPlanet + geometry.parameters.height / 2;

    mesh.position.set(0, meshY, 0);

    this.add(mesh);
  }

  addRing() {
    const points = this.getLathePoints(this.radiusRingOuter - this.radiusRingInner, 2, 80);
    const geometry = new THREE.LatheGeometry(points, 32);
    const mesh = new THREE.Mesh(geometry, this.materialRing);

    mesh.rotateX(THREE.MathUtils.degToRad(18));
    mesh.rotateZ(THREE.MathUtils.degToRad(10));

    this.add(mesh);
  }
}
