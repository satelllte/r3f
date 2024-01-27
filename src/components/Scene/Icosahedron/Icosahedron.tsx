import {useEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {useControls} from 'leva';
import {hexToVec3} from '@/utils/colors';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Icosahedron() {
  const {detail, wireframe, pulseSpeed, color1, color2} = useControls({
    detail: {
      value: 2,
      min: 1,
      max: 20,
      step: 1,
    },
    wireframe: {
      value: false,
    },
    pulseSpeed: {
      value: pulseSpeedDefault,
      min: 0.5,
      max: 30.0,
      step: 0.1,
    },
    color1: {
      value: color1Default,
    },
    color2: {
      value: color2Default,
    },
  });
  const detailRounded = Math.round(detail);

  const shaderMaterialRef = useRef<React.ElementRef<'shaderMaterial'>>(null);

  useEffect(() => {
    const shaderMaterial = shaderMaterialRef.current;
    if (!shaderMaterial) return;

    shaderMaterial.uniforms.uPulseSpeed.value = pulseSpeed;
    shaderMaterial.uniforms.uColor1.value = hexToVec3(color1);
    shaderMaterial.uniforms.uColor2.value = hexToVec3(color2);
  }, [pulseSpeed, color1, color2]);

  useFrame(({clock}) => {
    const shaderMaterial = shaderMaterialRef.current;
    if (!shaderMaterial) return;

    shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh>
      <icosahedronGeometry args={[1, detailRounded]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        wireframe={wireframe}
        wireframeLinewidth={4}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

const color1Default = '#00bb99';
const color2Default = '#00001f';
const pulseSpeedDefault = 4.0;

const uniforms = {
  uTime: {value: 0},
  uPulseSpeed: {value: pulseSpeedDefault},
  uColor1: {value: hexToVec3(color1Default)},
  uColor2: {value: hexToVec3(color2Default)},
};
