precision mediump float;
attribute vec2 aVertexPosition;
attribute vec2 aUvs;
attribute vec3 aColor;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec3 vColor;

void main() {
	// aColor.r = 0;
    vColor = aColor;
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

}