import type { ColorModel, RgbColor } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { hsvToRgb, rgbToHsv } from '../utils/convert.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<RgbColor> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsv: rgbToHsv,
  fromHsv: hsvToRgb,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export class RgbBase extends ColorPicker<RgbColor> {
  protected get colorModel(): ColorModel<RgbColor> {
    return colorModel;
  }
}
