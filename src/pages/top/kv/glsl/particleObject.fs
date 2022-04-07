precision mediump float;
precision mediump int;

uniform float time;

// varying vec3 vPosition;
varying vec3 vNoise;
// #pragma glslify: hsv2rgb = require('./lib/hsv2rgb.glsl')
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
	vec3 c = vec3(0.5 + vNoise.x, 0.15 + (vNoise.y * 0.1), 1.0);
	vec4 color = vec4(hsv2rgb(c), 1.0);
    gl_FragColor = color;
}