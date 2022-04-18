varying vec2 vUv;

uniform vec3 uColorBase;
uniform vec3 uColorAdditional;

void main() {
	float stripes = 7.0 * vUv.x;
	float rounded = floor(stripes);

	if (mod(rounded, 2.0) == 1.0) {
		gl_FragColor = vec4(uColorAdditional, 1.0);
	}	else{
		gl_FragColor = vec4(uColorBase, 1.0);
	}
}
