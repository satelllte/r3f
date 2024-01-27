varying vec3 vNormal;
flat varying vec2 vUv;

void main() {
    gl_FragColor = vec4(mix(vec3(0.0, 0.733, 0.6), vec3(0.0, 0.0, 0.124), vUv.x), 1.0);
}
