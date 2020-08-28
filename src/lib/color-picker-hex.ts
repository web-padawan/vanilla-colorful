import type { ColorModel } from './types';
import { ColorPicker } from './components/color-picker.js';
import { hexToHsv } from './utils/hexToHsv.js';
import { hsvToHex } from './utils/hsvToHex.js';
import { equalHex } from './utils/equalHex.js';

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
  get colorModel(): ColorModel<string> {
    return colorModel;
  }
}

customElements.define('color-picker-hex', ColorPickerHex);
