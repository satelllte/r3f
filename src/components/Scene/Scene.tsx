'use client';
import {useEffect, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera} from '@react-three/drei';
import {Icosahedron} from './Icosahedron';

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
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.5, 4]} />
      <OrbitControls
        enablePan={false}
        enableDamping={false}
        minDistance={2}
        maxDistance={10}
        camera={cameraRef.current ?? undefined}
      />
      <ambientLight />
      <Icosahedron />
    </>
  );
}
