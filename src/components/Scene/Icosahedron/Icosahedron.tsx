import {useControls} from 'leva';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Icosahedron() {
  const {detail, wireframe} = useControls({
    detail: {
      value: 2,
      min: 1,
      max: 20,
      step: 1,
    },
    wireframe: {
      value: false,
    },
  });
  const detailRounded = Math.round(detail);

  return (
    <mesh>
      <icosahedronGeometry args={[1, detailRounded]} />
      <shaderMaterial
        wireframe={wireframe}
        wireframeLinewidth={4}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
