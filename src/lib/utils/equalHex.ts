import { equalColorObjects } from './equalColorObjects.js';
import { hexToRgb } from './hexToRgb.js';

export const equalHex = (first: string, second: string): boolean => {
  if (first.toLowerCase() === second.toLowerCase()) return true;

  return equalColorObjects(hexToRgb(first), hexToRgb(second));
};
