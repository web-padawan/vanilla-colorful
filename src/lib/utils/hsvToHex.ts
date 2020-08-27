import { rgbToHex } from './rgbToHex.js';
import { hsvToRgb } from './hsvToRgb.js';
import type { HSV } from '../types';

export const hsvToHex = (hsv: HSV): string => rgbToHex(hsvToRgb(hsv));
