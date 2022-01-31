precision mediump float;

uniform float resolutionX;
uniform float resolutionY;
uniform float value;
uniform float vertical;
uniform float horizon;
uniform float color1_Red;
uniform float color1_Green;
uniform float color1_Blue;
uniform float color2_Red;
uniform float color2_Green;
uniform float color2_Blue;
varying vec3 vColor;

float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp) {
  if(clamp == true) {
    if(value < inputMin) return outputMin;
    if(value > inputMax) return outputMax;
  }

  float p = (outputMax - outputMin) / (inputMax - inputMin);
  return ((value - inputMin) * p) + outputMin;
}

void main() {
	vec2 resolution = vec2(resolutionX, resolutionY);
	vec2 st = gl_FragCoord.xy / resolution;
	st *= value;
	float stepX = step(0.5, fract(st.x)) * horizon;
	float stepY = step(0.5, fract(st.y)) * vertical;
	float color2value = step(1.0, abs(stepX - stepY));
	float color1value = 1.0 - color2value;

	float c1_Red = map(color1_Red, 0.0, 255.0, 0.0, 1.0, true);
	float c1_Green = map(color1_Green, 0.0, 255.0, 0.0, 1.0, true);
	float c1_Blue = map(color1_Blue, 0.0, 255.0, 0.0, 1.0, true);
	float c2_Red = map(color2_Red, 0.0, 255.0, 0.0, 1.0, true);
	float c2_Green = map(color2_Green, 0.0, 255.0, 0.0, 1.0, true);
	float c2_Blue = map(color2_Blue, 0.0, 255.0, 0.0, 1.0, true);

	vec3 color1 = vec3(c1_Red, c1_Green, c1_Blue);
	vec3 color2 = vec3(c2_Red, c2_Green, c2_Blue);
	color1 *= color1value;
	color2 *= color2value;

	vec3 color = color1 + color2;
	gl_FragColor = vec4(color, 1.0);
}