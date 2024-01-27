'use client';
import {useEffect, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment, OrbitControls, PerspectiveCamera} from '@react-three/drei';
import {Cube} from './Cube';

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
