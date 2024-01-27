export const hexToVec3 = (hexString: string): [number, number, number] => {
  const hexNumber = Number(`0x${hexString.replace('#', '')}`);
  const r = (hexNumber >> 16) / 255; // eslint-disable-line no-bitwise
  const g = ((hexNumber >> 8) & 0xff) / 255; // eslint-disable-line no-bitwise
  const b = (hexNumber & 0xff) / 255; // eslint-disable-line no-bitwise
  return [r, g, b];
};
