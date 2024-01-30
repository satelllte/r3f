'use client';

export function Cans() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1, 4, 4, 4]} />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}
