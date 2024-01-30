'use client';
import {useEffect, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera, Stats} from '@react-three/drei';

export function Scene({
  children,
  cameraFar,
}: {
  readonly children: React.ReactNode;
  readonly cameraFar?: number;
}) {
  return (
    <Canvas>
      <Stats />
      <ambientLight />
      <color attach='background' args={['#080808']} />
      <Camera far={cameraFar} />
      {children}
    </Canvas>
  );
}

function Camera({far}: {readonly far?: number}) {
  const cameraRef = useRef<React.ElementRef<typeof PerspectiveCamera>>(null);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    camera.lookAt(0, 0, 0);
  }, []);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 2.5, 4]}
        far={far}
      />
      <OrbitControls
        enablePan={false}
        enableDamping={false}
        minDistance={2}
        maxDistance={10}
        camera={cameraRef.current ?? undefined}
      />
    </>
  );
}
