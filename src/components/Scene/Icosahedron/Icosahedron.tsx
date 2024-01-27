import {useEffect, useRef} from 'react';
import {useControls} from 'leva';
import {hexToVec3} from '@/utils/colors';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Icosahedron() {
  const {detail, wireframe, color1, color2} = useControls({
    detail: {
      value: 2,
      min: 1,
      max: 20,
      step: 1,
    },
    wireframe: {
      value: false,
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

    shaderMaterial.uniforms.uColor1.value = hexToVec3(color1);
    shaderMaterial.uniforms.uColor2.value = hexToVec3(color2);
  }, [color1, color2]);

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

const uniforms = {
  uColor1: {value: hexToVec3(color1Default)},
  uColor2: {value: hexToVec3(color2Default)},
};
