'use client';
import {useControls} from 'leva';

export function Torus() {
  const {
    radialSegments: _radialSegments,
    tubularSegments: _tubularSegments,
    color,
    wireframe,
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
  });
  const radialSegments = Math.round(_radialSegments);
  const tubularSegments = Math.round(_tubularSegments);

  return (
    <mesh>
      <torusGeometry
        args={[undefined, undefined, radialSegments, tubularSegments]}
      />
      <meshStandardMaterial wireframe={wireframe} color={color} />
    </mesh>
  );
}
