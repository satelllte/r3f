'use client';
import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';

export function Torus() {
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);
  return (
    <mesh ref={meshRef}>
      <torusGeometry />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}
