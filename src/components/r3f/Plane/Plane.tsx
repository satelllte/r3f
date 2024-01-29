'use client';
import {useEffect, useRef} from 'react';
import {useControls} from 'leva';
import {DoubleSide} from 'three';
import {hexToVec3} from '@/utils/colors';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader1 from './shaders/fragment.glsl';
import fragmentShader2 from './shaders/fragment2.glsl';

export function Plane() {
  const {
    shader: _shader,
    wireframe,
    color,
    radius,
    segmentsX: _segmentsX,
    segmentsY: _segmentsY,
  } = useControls({
    shader: {
      value: 1,
      min: 1,
      max: 2,
      step: 1,
    },
    wireframe: {
      value: false,
    },
    color: {
      value: colorDefault,
    },
    radius: {
      value: radiusDefault,
      min: 0.0,
      max: 1.0,
      step: 0.01,
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
  const shader = Math.round(_shader);
  const segmentsX = Math.round(_segmentsX);
  const segmentsY = Math.round(_segmentsY);

  const shaderMaterialRef = useRef<React.ElementRef<'shaderMaterial'>>(null);

  useEffect(() => {
    const shaderMaterial = shaderMaterialRef.current;
    if (!shaderMaterial) return;

    shaderMaterial.uniforms.uColor.value = hexToVec3(color);
    shaderMaterial.uniforms.uRadius.value = radius;
  }, [color, radius]);

  return (
    <mesh>
      <planeGeometry args={[1, 1, segmentsX, segmentsY]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        key={shader}
        uniforms={uniforms}
        wireframe={wireframe}
        wireframeLinewidth={4}
        side={DoubleSide}
        vertexShader={vertexShader}
        fragmentShader={shader === 1 ? fragmentShader1 : fragmentShader2}
      />
    </mesh>
  );
}

const colorDefault = '#00bb99';
const radiusDefault = 0.25;

const uniforms = {
  uColor: {value: colorDefault},
  uRadius: {value: radiusDefault},
};
