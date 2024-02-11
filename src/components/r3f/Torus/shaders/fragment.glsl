varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vNoiseMultiplier;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = dot(viewDirection, vNormal);

    float colorY = abs(vUv.y - 0.5) * 2.0;
    float colorMix = smoothstep(0.0, 1.0, fract(colorY * 12.0 - fresnel * 2.5));

    gl_FragColor = vec4(mix(uColor1, uColor2, colorMix), 0.5);
}
