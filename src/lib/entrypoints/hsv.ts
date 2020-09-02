import type { ColorModel, HSV } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<HSV> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  toHsv: (hsv) => hsv,
  fromHsv: (hsv) => hsv,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export class HsvBase extends ColorPicker<HSV> {
  protected get colorModel(): ColorModel<HSV> {
    return colorModel;
  }
}
