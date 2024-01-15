'use client';
import {useEffect, useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {Environment, OrbitControls, PerspectiveCamera} from '@react-three/drei';
import {lerp} from 'three/src/math/MathUtils.js';
import vertexShader from './shaders/cube.vert';
import fragmentShader from './shaders/cube.frag';

export function Scene() {
  return (
    <Canvas>
      <SceneBody />
    </Canvas>
  );
}

function SceneBody() {
  const cameraRef = useRef<React.ElementRef<typeof PerspectiveCamera>>(null);
  const [inOrbitControlsInteraction, setInOrbitControlsInteraction] =
    useState<boolean>(false);

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
        onStart={() => {
          setInOrbitControlsInteraction(true);
        }}
        onEnd={() => {
          setInOrbitControlsInteraction(false);
        }}
      />
      <ambientLight />
      <Cube rotationDisabled={inOrbitControlsInteraction} />
    </>
  );
}

function Cube({rotationDisabled}: {readonly rotationDisabled: boolean}) {
  const speed = 1.25;
  const transitionSpeed = 2.5;
  const currentSpeedRef = useRef<number>(rotationDisabled ? 0 : speed);
  const targetSpeedRef = useRef<number>(rotationDisabled ? 0 : speed);
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);

  useEffect(() => {
    targetSpeedRef.current = rotationDisabled ? 0 : speed;
  }, [rotationDisabled]);

  useFrame((_, deltaTime) => {
    currentSpeedRef.current = lerp(
      currentSpeedRef.current,
      targetSpeedRef.current,
      deltaTime * transitionSpeed,
    );
  });

  useFrame((_, deltaTime) => {
    const currentSpeed = currentSpeedRef.current;
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y += deltaTime * currentSpeed;
  });

  return (
    <mesh ref={meshRef} rotation={[0, 45, 0]}>
      <boxGeometry />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
