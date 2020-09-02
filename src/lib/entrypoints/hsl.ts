import type { ColorModel, HSL } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { hslToHsv, hsvToHsl } from '../utils/convert.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<HSL> = {
  defaultColor: { h: 0, s: 0, l: 0 },
  toHsv: hslToHsv,
  fromHsv: hsvToHsl,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export class HslBase extends ColorPicker<HSL> {
  protected get colorModel(): ColorModel<HSL> {
    return colorModel;
  }
}
