import { hexToRgb } from './hexToRgb.js';
import { rgbToHsv } from './rgbToHsv.js';
import type { HSV } from '../types';

export const hexToHsv = (hex: string): HSV => rgbToHsv(hexToRgb(hex));
