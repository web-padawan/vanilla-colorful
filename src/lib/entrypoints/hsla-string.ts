import type { ColorModel } from '../types';
import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import { hslaStringToHsva, hsvaToHslaString } from '../utils/convert.js';
import { equalColorString } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'hsla(0, 0%, 0%, 1)',
  toHsva: hslaStringToHsva,
  fromHsva: hsvaToHslaString,
  equal: equalColorString,
  fromAttr: (color) => color
};

export class HslaStringBase extends AlphaColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
