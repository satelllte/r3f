varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform vec3 uColor;
uniform float uRadius;

#define colorBlack vec3(0.0)

void main() {
    float blend = 1.0 - step(uRadius, length(vUv - 0.5));

    gl_FragColor = vec4(mix(colorBlack, uColor, blend), 1.0);
}
