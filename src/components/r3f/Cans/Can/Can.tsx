'use client';

type R3FVector3 = [number, number, number]; // eslint-disable-line @typescript-eslint/naming-convention

export function Can({position}: {readonly position: R3FVector3}) {
  return (
    <mesh position={position}>
      <boxGeometry />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}
