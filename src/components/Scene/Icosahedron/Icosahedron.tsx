import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Icosahedron() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 2]} />
      <shaderMaterial
        wireframe
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
