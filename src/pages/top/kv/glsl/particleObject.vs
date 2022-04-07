precision mediump float;
precision mediump int;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec3 triangleCenter;
attribute vec3 random;

uniform float time;

// varying vec3 vPosition;
varying vec3 vNoise;

const float duration = 8.0;

// #pragma glslify: PI = require('./lib/PI.glsl')
float PI = 3.1415926535897932384626433832795;
float HALF_PI = 1.5707963267948966;
// #pragma glslify: rotateVec3 = require('./lib/rotateVec3.glsl')
vec3 rotateVec3(vec3 p, float angle, vec3 axis) {
  vec3 a = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float r = 1.0 - c;
  mat3 m = mat3(
    a.x * a.x * r + c,
    a.y * a.x * r + a.z * s,
    a.z * a.x * r - a.y * s,
    a.x * a.y * r - a.z * s,
    a.y * a.y * r + c,
    a.z * a.y * r + a.x * s,
    a.x * a.z * r + a.y * s,
    a.y * a.z * r - a.x * s,
    a.z * a.z * r + c
  );
  return m * p;
}
// #pragma glslify: easeOutSine = require('glsl-easings/sine-out');
float easeOutSine(float t) {
  return sin(t * HALF_PI);
}
// #pragma glslify: easeOutCubic = require('glsl-easings/cubic-out');
float easeOutCubic(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}

// 範囲を設定し直す
float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
	if (clamp == true) {
		if (value < inputMin) return outputMin;
		if (value > inputMax) return outputMax;
	}
	float p = (outputMax - outputMin) / (inputMax - inputMin);
	return ((value - inputMin) * p) + outputMin;
}

float getRad(float scale, float offset) {
	return map(mod(time * scale + offset, PI * 2.0), 0.0, PI * 2.0, -PI, PI, true);
}

void main() {
	float t = clamp(time, 0.0, 1.0);
	float p = easeOutSine(t);
	float outp = easeOutCubic(t);

	vec3 pos = position - (position - normalize(position) * 3.0) * p;
	// はじめは展開しておく
	if (t < 0.3) {
		float threshold = map(0.3 - t, 0.0, 0.3, 0.0, 1.0, true);
		float z = map(pos.z, -250.0, 250.0, 0.0, 100.0, true) * threshold;
		if (pos.x < -100.0) {
			pos.x -= z;
		} else if (pos.x > 100.0) {
			pos.x += z;
		}
		if (pos.y < -100.0) {
			pos.y -= z;
		} else if (pos.y > 100.0 ) {
			pos.y += z;
		}
	}

	float rad1 = getRad(10.0, random.x * 10.0);
	float rad2 = getRad(10.0, random.y * 10.0);
	// pos = rotateVec3(pos, p * rad1, vec3(1.0, 0, 0));
	// pos = rotateVec3(pos, p * rad2, vec3(0, 1.0, 0));
	pos += (p * sin(getRad(5.0, random.z * 10.0)) * 70.0 * normalize(pos));

	vec3 noise = vec3(t * random.x, t * random.y, t * random.z);
	vNoise = noise;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}