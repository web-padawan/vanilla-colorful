import { rgbToHsv } from './rgbToHsv.js';
import type { HSV } from '../types';

const matcher = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;

export const rgbStringToHsv = (string: string): HSV => {
  const match = matcher.exec(string);

  return rgbToHsv({
    r: Number(match ? match[1] : 0),
    g: Number(match ? match[2] : 0),
    b: Number(match ? match[3] : 0)
  });
};
