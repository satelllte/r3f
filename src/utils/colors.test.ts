import {describe, expect, it} from 'vitest';
import {hexToVec3} from './colors';

describe('colors', () => {
  describe('hexToVec3', () => {
    it('works', () => {
      expect(hexToVec3('#000000')).toEqual([0, 0, 0]);
      expect(hexToVec3('#3366CC')).toEqual([0.2, 0.4, 0.8]);
      expect(hexToVec3('#FFFFFF')).toEqual([1, 1, 1]);
    });
  });
});
