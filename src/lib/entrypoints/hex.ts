import type { ColorModel } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { hexToHsva, hsvaToHex } from '../utils/convert.js';
import { equalHex } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: '#000',
  toHsva: hexToHsva,
  fromHsva: hsvaToHex,
  equal: equalHex,
  fromAttr: (color) => color
};

export class HexBase extends ColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
