precision mediump float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform vec2 uvRate;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying vec2 vUv2;

// #pragma glslify: map = require('../../lib/map.glsl')
float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
  if(clamp == true) {
    if(value < inputMin) return outputMin;
    if(value > inputMax) return outputMax;
  }

  float p = (outputMax - outputMin) / (inputMax - inputMin);
  return ((value - inputMin) * p) + outputMin;
}

void main() {
	vUv = uv;
	vUv2 = uv - 0.5;
	vUv2 *= uvRate;
	vUv2 += 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}