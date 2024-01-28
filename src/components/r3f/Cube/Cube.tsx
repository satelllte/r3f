'use client';
import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Cube() {
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);
  const shaderMaterialRef = useRef<React.ElementRef<'shaderMaterial'>>(null);

  useFrame(({clock}) => {
    const shaderMaterial = shaderMaterialRef.current;
    if (!shaderMaterial) return;

    shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1, 4, 4, 4]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        wireframe
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

const uniforms = {
  uTime: {value: 0},
};
