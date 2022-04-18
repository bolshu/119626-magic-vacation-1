import * as THREE from 'three';

export default class Material extends THREE.ShaderMaterial {
  constructor(params) {
    super({
      uniforms: {
        uColorBase: {
          value: params.colorBase,
        },
        uColorAdditional: {
          value: params.colorAdditional,
        },
      },
      vertexShader: params.vertexShader,
      fragmentShader: params.fragmentShader,
    });
  }
}
