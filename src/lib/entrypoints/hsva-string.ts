import type { ColorModel } from '../types';
import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import { hsvaStringToHsva, hsvaToHsvaString } from '../utils/convert.js';
import { equalColorString } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'hsva(0, 0%, 0%, 1)',
  toHsva: hsvaStringToHsva,
  fromHsva: hsvaToHsvaString,
  equal: equalColorString,
  fromAttr: (color) => color
};

export class HsvaStringBase extends AlphaColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
