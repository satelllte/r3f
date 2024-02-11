varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vNoiseMultiplier;

uniform vec3 uColor;

#define colorBlack vec3(0.0)

void main() {
    gl_FragColor = vec4(mix(colorBlack, uColor, vNoiseMultiplier), 1.0);
}
