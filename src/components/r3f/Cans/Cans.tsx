'use client';

import {Can} from './Can';

export function Cans() {
  return (
    <>
      <Can position={[0, 0, 0]} />
      <Can position={[-1.25, 0, 0]} />
      <Can position={[1.25, 0, 0]} />
    </>
  );
}
