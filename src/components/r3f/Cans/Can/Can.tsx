/*
Auto-generated by: https://github.com/pmndrs/gltfjsx (but modified)
Command: bunx gltfjsx@6.2.16 ./public/models/can.glb --types --debug --transform 
*/
'use client';

import {forwardRef} from 'react';
import {useGLTF} from '@react-three/drei';
import {type GLTF} from 'three-stdlib';
import type {Mesh, MeshStandardMaterial} from 'three';

const path = '/models/can.glb';

// eslint-disable-next-line @typescript-eslint/naming-convention
type GLTFResult = GLTF & {
  nodes: {
    can_1: Mesh;
    can_2: Mesh;
  };
  materials: {
    texture: MeshStandardMaterial;
    metal: MeshStandardMaterial;
  };
};

type GroupProps = React.ComponentProps<'group'>;
type GroupPropsToExtend = Omit<GroupProps, 'dispose' | 'scale'>;
type CanProps = GroupPropsToExtend & {
  readonly scale?: number; // eslint-disable-line react/require-default-props
};

export const Can = forwardRef<React.ElementRef<'group'>, CanProps>(
  ({scale = 1, ...rest}, forwardedRef) => {
    const {nodes, materials} = useGLTF(path) as GLTFResult;
    return (
      <group ref={forwardedRef} scale={scale * 5.0} dispose={null} {...rest}>
        <mesh geometry={nodes.can_1.geometry} material={materials.texture} />
        <mesh geometry={nodes.can_2.geometry} material={materials.metal} />
      </group>
    );
  },
);

useGLTF.preload(path);