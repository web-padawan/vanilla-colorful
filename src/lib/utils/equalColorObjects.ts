import { HSL, HSV, RGB } from '../types';

export const equalColorObjects = (first: HSL | HSV | RGB, second: HSL | HSV | RGB): boolean => {
  if (first === second) return true;

  for (const prop in first) {
    if (first[prop] !== second[prop]) return false;
  }

  return true;
};
