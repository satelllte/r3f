varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float uTime;
uniform float uPulseFrequency;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - dot(viewDirection, vNormal);

    gl_FragColor = vec4(mix(uColor1, uColor2, fresnel), 1.0);
}
