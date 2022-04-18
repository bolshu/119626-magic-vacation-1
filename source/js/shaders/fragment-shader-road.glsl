varying vec2 vUv;

uniform vec3 uColorBase;
uniform vec3 uColorAdditional;

void main() {
  float stripesY = 3.0 * vUv.y;
  float roundedY = floor(stripesY);

  float stripesX = 9.0 * vUv.x;
  float roundedX = floor(stripesX);

  if (
    mod(roundedY, 2.0) == 1.0 &&
    vUv.y < 0.6 && vUv.y > 0.4 &&
    mod(roundedX, 2.0) == 1.0
  ) {
    gl_FragColor = vec4(uColorAdditional, 1.0);
  } else {
    gl_FragColor = vec4(uColorBase, 1.0);
  }
}
