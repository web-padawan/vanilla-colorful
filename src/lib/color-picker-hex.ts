import type { ColorModel } from './types';
import { ColorPicker } from './components/color-picker.js';
import { hexToHsv, hsvToHex } from './utils/convert.js';
import { equalHex } from './utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: '#000',
  toHsv: hexToHsv,
  fromHsv: hsvToHex,
  equal: equalHex,
  toAttr: (color) => color,
  fromAttr: (color) => color,
  reflect: true
};

export class ColorPickerHex extends ColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}

customElements.define('color-picker-hex', ColorPickerHex);
