import type { ColorModel, HsvColor } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<HsvColor> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  toHsv: (hsv) => hsv,
  fromHsv: (hsv) => hsv,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export class HsvBase extends ColorPicker<HsvColor> {
  protected get colorModel(): ColorModel<HsvColor> {
    return colorModel;
  }
}
