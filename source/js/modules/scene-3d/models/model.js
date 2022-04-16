import * as THREE from 'three';

const COLORS = {
  blue: `rgb(51, 113, 235)`,
  brightBlue: `rgb(47, 58, 201)`,
  lightBlue: `rgb(150, 176, 243)`,
  darkBlue: `rgb(12, 49, 112)`,
  skyLightBlue: `rgb(161, 200, 240)`,
  mountainBlue: `rgb(101, 152, 219)`,
  dominantRed: `rgb(255, 32, 66)`,
  lightDominantRed: `rgb(255, 105, 120)`,
  shadowedDominantRed: `rgb(124, 26, 48)`,
  purple: `rgb(163, 118, 235)`,
  brightPurple: `rgb(118, 76, 225)`,
  lightPurple: `rgb(194, 153, 225)`,
  additionalPurple: `rgb(119, 85, 189)`,
  darkPurple: `rgb(76, 49, 121)`,
  shadowedPurple: `rgb(75, 50, 116)`,
  shadowedBrightPurple: `rgb(56, 37, 108)`,
  shadowedLightPurple: `rgb(77, 53, 106)`,
  shadowedAdditionalPurple: `rgb(55, 38, 89)`,
  shadowedDarkPurple: `rgb(49, 42, 71)`,
  grey: `rgb(118, 125, 143)`,
  metalGrey: `rgb(126, 141, 164)`,
  orange: `rgb(230, 80, 0)`,
  green: `rgb(0, 210, 134)`,
  white: `rgb(255, 255, 255)`,
  snowColor: `rgb(182, 206, 240)`,
};

export default class Model extends THREE.Group {
  constructor() {
    super();
  }

  getLathePoints(borderWidth, height, radius) {
    const points = [];

    for (let i = radius; i <= radius + borderWidth; i++) {
      for (let j = 1; j <= height; j++) {
        points.push(new THREE.Vector2(i, j));
      }
    }

    return points;
  }

  getDegLength(degStart, degEnd) {
    return THREE.MathUtils.degToRad(degEnd - degStart);
  }

  getColor(key) {
    if (!key || !COLORS[key]) {
      // eslint-disable-next-line no-console
      console.error(`Wrong color. Check Model.getColor arg`);

      return COLORS.white;
    }

    return COLORS[key];
  }

  getMaterial(type, options) {
    if (type === `soft`) {
      return new THREE.MeshLambertMaterial({
        ...options,
      });
    }

    if (type === `basic`) {
      return new THREE.MeshPhongMaterial({
        roughness: 0.8,
        metalness: 0.5,
        ...options,
      });
    }

    if (type === `strong`) {
      return new THREE.MeshStandardMaterial({
        roughness: 0.7,
        metalness: 0.2,
        ...options
      });
    }

    // eslint-disable-next-line no-console
    console.error(`Wrong material type. Check Model.getMaterial type arg`);
    return new THREE.MeshBasicMaterial({color: this.getColor(`white`)});
  }
}
