'use client';

import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Environment} from '@react-three/drei';
import {
  DepthOfField,
  EffectComposer,
  Vignette,
} from '@react-three/postprocessing';
import {randFloatSpread} from 'three/src/math/MathUtils.js';
import {useConst} from '@/hooks/useConst';
import {Can} from './Can';

export function Cans() {
  return (
    <>
      <Environment preset='dawn' />
      <CansSceneBody />
      <EffectComposer>
        <DepthOfField focusDistance={0.2} bokehScale={4} />
        <Vignette offset={0.01} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

export function CansSceneBody() {
  const count = 25;
  const cans = useConst(() => initCansKeys(count));
  return (
    <>
      {cans.map((key) => (
        <CanAnimated key={key} />
      ))}
    </>
  );
}

const initCansKeys = (count: number): number[] => {
  const cans: number[] = [];
  for (let i = 0; i < count; i++) {
    cans.push(i);
  }

  return cans;
};

function CanAnimated() {
  const canRef = useRef<React.ElementRef<typeof Can>>(null);

  const {amplitude, speed, timeShift, position, rotation, rotationSpeed} =
    useConst(initCanConfig);

  useFrame(({clock}, dt) => {
    const can = canRef.current;
    if (!can) return;

    const time = clock.getElapsedTime();

    can.position.set(
      can.position.x,
      Math.sin(timeShift + time * speed) * amplitude,
      can.position.z,
    );

    can.rotation.set(
      can.rotation.x + dt * rotationSpeed[0],
      can.rotation.y + dt * rotationSpeed[1],
      can.rotation.z + dt * rotationSpeed[2],
    );
  });

  return (
    <Can
      ref={canRef}
      position={position}
      // @ts-expect-error [number, number, number] is not assignable to Euler | undefined
      rotation={rotation}
    />
  );
}

const initCanConfig = () => {
  const r = randFloatSpread;
  const amplitude = 2.0 + r(2.0);
  return {
    amplitude,
    speed: 0.12 + r(0.1),
    timeShift: 0.0 + r(20.0),
    position: [r(5), r(amplitude), r(5)],
    rotation: [r(Math.PI * 2), r(Math.PI * 2), r(Math.PI * 2)],
    rotationSpeed: [r(1.0), r(1.0), r(1.0)],
  } as const;
};
