'use client';
import {useEffect, useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {Environment, OrbitControls, PerspectiveCamera} from '@react-three/drei';
import {lerp} from 'three/src/math/MathUtils.js';

export function Scene({isStatic = false}: {readonly isStatic?: boolean}) {
  return (
    <Canvas>
      <SceneBody isStatic={isStatic} />
    </Canvas>
  );
}

function SceneBody({isStatic}: {readonly isStatic: boolean}) {
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
      <Cube rotationDisabled={isStatic || inOrbitControlsInteraction} />
    </>
  );
}

function Cube({rotationDisabled}: {readonly rotationDisabled: boolean}) {
  const speed = 1.25;
  const transitionSpeed = 2.5;
  const targetSpeed = rotationDisabled ? 0 : speed;
  const currentSpeedRef = useRef<number>(0);
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);

  useFrame((_, deltaTime) => {
    currentSpeedRef.current = lerp(
      currentSpeedRef.current,
      targetSpeed,
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
      <meshStandardMaterial color='#1169b7' metalness={0.8} roughness={0.25} />
    </mesh>
  );
}
