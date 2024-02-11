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
    color,
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
      value: 24,
      min: 3,
      max: 72,
      step: 1,
    },
    tubularSegments: {
      value: 64,
      min: 3,
      max: 192,
      step: 1,
    },
    color: {
      value: colorDefault,
    },
    wireframe: {
      value: true,
    },
    normals: {
      value: false,
    },
    normalsColor: {
      value: '#aa2299',
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

    material.uniforms.uColor.value = hexToVec3(color);
  }, [color]);

  useFrame((_, deltaTime) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotateX(deltaTime * (Math.PI / 4.0));
  });

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

const colorDefault = '#7697c5';

const uniforms = {
  uTime: {value: 0.0},
  uColor: {value: hexToVec3(colorDefault)},
};
