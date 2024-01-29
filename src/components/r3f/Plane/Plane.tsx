'use client';
import {useEffect, useRef} from 'react';
import {useControls} from 'leva';
import {DoubleSide} from 'three';
import {hexToVec3} from '@/utils/colors';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Plane() {
  const {
    wireframe,
    color,
    segmentsX: _segmentsX,
    segmentsY: _segmentsY,
  } = useControls({
    wireframe: {
      value: false,
    },
    color: {
      value: colorDefault,
    },
    segmentsX: {
      value: 1,
      min: 1,
      max: 20,
      step: 1,
    },
    segmentsY: {
      value: 1,
      min: 1,
      max: 20,
      step: 1,
    },
  });
  const segmentsX = Math.round(_segmentsX);
  const segmentsY = Math.round(_segmentsY);

  const shaderMaterialRef = useRef<React.ElementRef<'shaderMaterial'>>(null);

  useEffect(() => {
    const shaderMaterial = shaderMaterialRef.current;
    if (!shaderMaterial) return;

    shaderMaterial.uniforms.uColor.value = hexToVec3(color);
  }, [color]);

  return (
    <mesh>
      <planeGeometry args={[1, 1, segmentsX, segmentsY]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        uniforms={uniforms}
        wireframe={wireframe}
        wireframeLinewidth={4}
        side={DoubleSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

const colorDefault = '#00bb99';

const uniforms = {
  uColor: {value: colorDefault},
};
