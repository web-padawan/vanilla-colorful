import type { ColorModel, RGB } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { hsvToRgb, rgbToHsv } from '../utils/convert.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<RGB> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsv: rgbToHsv,
  fromHsv: hsvToRgb,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export class RgbBase extends ColorPicker<RGB> {
  protected get colorModel(): ColorModel<RGB> {
    return colorModel;
  }
}
