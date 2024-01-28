'use client';
import {DoubleSide} from 'three';
import {useControls} from 'leva';

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
      value: '#00bb99',
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

  return (
    <mesh>
      <planeGeometry args={[1, 1, segmentsX, segmentsY]} />
      <meshStandardMaterial
        side={DoubleSide}
        wireframe={wireframe}
        wireframeLinewidth={4}
        color={color}
      />
    </mesh>
  );
}
