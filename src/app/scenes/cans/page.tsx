import {Scene} from '@/components/r3f/Scene';
import {Cans} from '@/components/r3f/Cans';

export default function () {
  return (
    <Scene cameraFar={40}>
      <Cans />
    </Scene>
  );
}
