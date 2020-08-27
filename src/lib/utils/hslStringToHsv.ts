import { hslToHsv } from './hslToHsv.js';
import type { HSV } from '../types';

const matcher = /hsl\((\d+(?:\.\d+)*),\s*(\d+(?:\.\d+)*)%?,\s*(\d+(?:\.\d+)*)%?\)/;

export const hslStringToHsv = (string: string): HSV => {
  const match = matcher.exec(string);

  return hslToHsv({
    h: Number(match ? match[1] : 0),
    s: Number(match ? match[2] : 0),
    l: Number(match ? match[3] : 0)
  });
};
