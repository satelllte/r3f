'use client';
import {useHelper} from '@react-three/drei';
import {useControls} from 'leva';
import {useRef} from 'react';
import {VertexNormalsHelper} from 'three/examples/jsm/Addons.js';

export function Torus() {
  const {
    radialSegments: _radialSegments,
    tubularSegments: _tubularSegments,
    color,
    wireframe,
    normals,
    normalsColor,
  } = useControls({
    radialSegments: {
      value: 12,
      min: 3,
      max: 36,
      step: 1,
    },
    tubularSegments: {
      value: 48,
      min: 3,
      max: 96,
      step: 1,
    },
    color: {
      value: '#7697c5',
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

  // @ts-expect-error Argument of type 'RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>' is not assignable to parameter of type 'MutableRefObject<Object3D<Object3DEventMap>> | Falsy'
  useHelper(normals && meshRef, VertexNormalsHelper, 0.1, normalsColor);

  return (
    <mesh ref={meshRef}>
      <torusGeometry
        args={[undefined, undefined, radialSegments, tubularSegments]}
      />
      <meshStandardMaterial wireframe={wireframe} color={color} />
    </mesh>
  );
}
