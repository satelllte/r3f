'use client';
import {useEffect, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {Environment, OrbitControls, PerspectiveCamera} from '@react-three/drei';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Scene() {
  return (
    <Canvas>
      <SceneBody />
    </Canvas>
  );
}

function SceneBody() {
  const cameraRef = useRef<React.ElementRef<typeof PerspectiveCamera>>(null);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    camera.lookAt(0, 0, 0);
  }, []);

  return (
    <>
      <Environment preset='dawn' />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.5, 4]} />
      <OrbitControls
        enablePan={false}
        enableDamping={false}
        minDistance={2}
        maxDistance={10}
        camera={cameraRef.current ?? undefined}
      />
      <ambientLight />
      <Cube />
    </>
  );
}

function Cube() {
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);
  const shaderMaterialRef = useRef<React.ElementRef<'shaderMaterial'>>(null);

  useFrame(({clock}) => {
    const shaderMaterial = shaderMaterialRef.current;
    if (!shaderMaterial) return;

    shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0] /* [0, 45, 0] */}>
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
