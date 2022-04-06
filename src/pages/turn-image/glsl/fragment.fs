precision mediump float;

uniform sampler2D texture[2];
// uniform sampler2D texture1;
// uniform sampler2D texture2;
uniform vec2 pixels;

uniform float slideProgress;
varying vec2 vUv;
varying vec2 vUv2;

// #pragma glslify: map = require('../../lib/map.glsl');
float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
  if(clamp == true) {
    if(value < inputMin) return outputMin;
    if(value > inputMax) return outputMax;
  }

  float p = (outputMax - outputMin) / (inputMax - inputMin);
  return ((value - inputMin) * p) + outputMin;
}

// #pragma glslify: toHill = require('../../lib/toHill.glsl');
float toHill(float value) {
	value = clamp(value, 0.0, 1.0);
	return mix(value, 1.0 - value, step(0.5, value));
}

// #pragma glslify: easeInOutExpo = require('glsl-easings/exponential-in-out');
float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0
    ? t
    : t < 0.5
      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

void main() {
	vec2 uv = gl_FragCoord.xy / pixels.xy;
	// 0~1で動くProgressを設定
	float slideProgress = clamp(slideProgress, 0.0, 1.0);

	slideProgress = exponentialInOut(slideProgress);

	// progressの整数・小数を分離
	float c = step(1.0, floor(slideProgress));
	float p = fract(slideProgress);

	// 画像切り替わりベースの係数
	float mixProgress = p * 7.0 - uv.y * 2.0 + uv.x - 2.0;
	mixProgress = clamp(mixProgress, 0.0, 1.0);

	// 動いている時のみ歪む係数を作成
	float x = sin(mixProgress + uv.x * 5.0) * 0.1;
	// float x = sin(slideProgress + uv.x * 5.0) * 0.1;
	vec2 translateValue = toHill(p) * p * vec2(0, x);


	// 現在画像の歪み
	vec2 uv1 = vUv2 + translateValue + slideProgress * vec2(-0.1, 0.3);

	// 次画像の歪み
	vec2 uv2 = vUv2 + translateValue + (slideProgress - 1.0) * vec2(-0.1, 0.3);

	vec4 texture1 = texture2D(texture[0], uv1);
	vec4 texture2 = texture2D(texture[1], uv2);

	// 画像同士の混ざり方の係数
	gl_FragColor = vec4(mix(texture1, texture2, clamp(c + mixProgress, 0.0, 1.0)));

	vec2 wUv = vUv;
	vec2 m = vec2(gl_FragCoord.x, gl_FragCoord.y);
	vec2 n = normalize(m);

	// gl_FragColor = vec4(wUv.x, wUv.y, 0.0, 1.0);
	// gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
	// gl_FragColor = vec4(n.x, n.y, 0.0, 1.0);


	// float progress =  clamp((slideProgress * 1.5) + (vUv.y * 1.0), 0.0, 1.0);
	// float s = abs(slideProgress);
	// vec4 texture1 = texture2D(texture[0], vec2(vUv.x, vUv.y - s));
	// vec4 texture2 = texture2D(texture[1], vec2(vUv.x, vUv.y - s + 1.0));
	// gl_FragColor = mix(texture1, texture2, s + vUv.y);
}