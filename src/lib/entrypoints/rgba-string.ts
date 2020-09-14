import type { ColorModel } from '../types';
import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import { rgbaStringToHsva, hsvaToRgbaString } from '../utils/convert.js';
import { equalColorString } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'rgba(0, 0, 0, 1)',
  toHsva: rgbaStringToHsva,
  fromHsva: hsvaToRgbaString,
  equal: equalColorString,
  fromAttr: (color) => color
};

export class RgbaStringBase extends AlphaColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
