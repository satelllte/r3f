varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float uTime;
uniform float uPulseSpeed;

float sin01(float x);
float heartbeat(float x);

void main() {
    float pulse = heartbeat(uTime * uPulseSpeed);
    vec3 _position = position;
    _position += normal * 0.05 * pulse;

    vPosition = _position;
    vNormal = normal;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(_position, 1.0);
}

float sin01(float x) { return 0.5 * sin(x) + 0.5; }

float heartbeat(float x) {
    float term1 = (sin(x * 4.0) + sin(x * 16.0) / 4.0) * 3.0;
    float term2 = -(floor(sin(x * 2.0)) + 0.1);
    float term3 = 1.0 - floor(mod(sin(x / 1.5), 2.0));
    return term1 * term2 * term3;
}
