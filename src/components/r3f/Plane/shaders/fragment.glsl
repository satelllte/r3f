varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform vec3 uColor;

#define colorBlack vec3(0.0)

void main() {
    float blendX = step(0.95, 1.0 - abs(vUv.x - 0.5));
    float blendY = step(0.95, 1.0 - abs(vUv.y - 0.5));

    gl_FragColor =
        vec4(mix(colorBlack, uColor, min(blendX + blendY, 1.0)), 1.0);
}
