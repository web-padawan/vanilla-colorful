import { hsvToRgb } from './hsvToRgb.js';
import type { HSV } from '../types';

export const hsvToRgbString = (hsv: HSV): string => {
  const { r, g, b } = hsvToRgb(hsv);
  return `rgb(${r}, ${g}, ${b})`;
};
