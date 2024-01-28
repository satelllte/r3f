varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float uTime;
uniform float uPulseFrequency;

#define PI 3.1415926538

float sin01(float x);

void main() {
    float pulse = pow(sin01(uTime * 2.0 * PI * uPulseFrequency), 4.0);
    vec3 _position = position;
    _position += normal * -0.1 * pulse;

    vPosition = _position;
    vNormal = normal;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(_position, 1.0);
}

float sin01(float x) { return 0.5 * sin(x) + 0.5; }
