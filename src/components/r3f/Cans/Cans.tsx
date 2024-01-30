'use client';

import {Environment} from '@react-three/drei';
import {Can} from './Can';

export function Cans() {
  return (
    <>
      <Environment preset='dawn' />
      <Can position={[0, 0, 0]} />
      <Can position={[-1.25, 0, 0]} />
      <Can position={[1.25, 0, 0]} />
    </>
  );
}
