import {useState} from 'react';

export const useConst = <T>(initFn: () => T) => {
  const [value] = useState(initFn); // eslint-disable-line react/hook-use-state
  return value;
};
