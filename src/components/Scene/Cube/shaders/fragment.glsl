uniform float uTime;
varying vec3 vPosition;
varying vec2 vUv;

void main() { gl_FragColor = vec4(0, 0.5, vUv.x, 1.0); }
