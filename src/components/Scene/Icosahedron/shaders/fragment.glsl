varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

const vec3 COLOR_1 = vec3(0.0, 0.733, 0.6);
const vec3 COLOR_2 = vec3(0.0, 0.0, 0.124);

void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - dot(viewDirection, vNormal);

    gl_FragColor = vec4(mix(COLOR_1, COLOR_2, fresnel), 1.0);
}
