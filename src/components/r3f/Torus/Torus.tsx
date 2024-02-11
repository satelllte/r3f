'use client';
import {useControls} from 'leva';
import {useEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {useHelper} from '@react-three/drei';
import {VertexNormalsHelper} from 'three/examples/jsm/Addons.js';
import {hexToVec3} from '@/utils/colors';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Torus() {
  const {
    radius,
    tube,
    radialSegments: _radialSegments,
    tubularSegments: _tubularSegments,
    color1,
    color2,
    wireframe,
    normals,
    normalsColor,
  } = useControls({
    radius: {
      value: 1.0,
      min: 0.5,
      max: 1.5,
      step: 0.01,
    },
    tube: {
      value: 0.4,
      min: 0.1,
      max: 0.8,
      step: 0.01,
    },
    radialSegments: {
      value: 48,
      min: 3,
      max: 150,
      step: 1,
    },
    tubularSegments: {
      value: 92,
      min: 3,
      max: 380,
      step: 1,
    },
    color1: {
      value: color1Default,
    },
    color2: {
      value: color2Default,
    },
    wireframe: {
      value: false,
    },
    normals: {
      value: false,
    },
    normalsColor: {
      value: '#1e552f',
    },
  });
  const radialSegments = Math.round(_radialSegments);
  const tubularSegments = Math.round(_tubularSegments);

  const meshRef = useRef<React.ElementRef<'mesh'>>(null);
  const materialRef = useRef<React.ElementRef<'shaderMaterial'>>(null);

  // @ts-expect-error Argument of type 'RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>' is not assignable to parameter of type 'MutableRefObject<Object3D<Object3DEventMap>> | Falsy'
  useHelper(normals && meshRef, VertexNormalsHelper, 0.1, normalsColor);

  useFrame(({clock}) => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uTime.value = clock.getElapsedTime();
  });

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uColor1.value = hexToVec3(color1);
    material.uniforms.uColor2.value = hexToVec3(color2);
  }, [color1, color2]);

  return (
    <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2.0]}>
      <torusGeometry args={[radius, tube, radialSegments, tubularSegments]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={wireframe}
      />
    </mesh>
  );
}

const color1Default = '#1f0034';
const color2Default = '#a75491';

const uniforms = {
  uTime: {value: 0.0},
  uColor1: {value: hexToVec3(color1Default)},
  uColor2: {value: hexToVec3(color2Default)},
};
