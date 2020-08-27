import { hsvToHsl } from './hsvToHsl.js';
import type { HSV } from '../types';

export const hsvToHslString = (hsv: HSV): string => {
  const { h, s, l } = hsvToHsl(hsv);
  return `hsl(${h}, ${s}%, ${l}%)`;
};
