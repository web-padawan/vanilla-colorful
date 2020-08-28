import type { ColorModel } from './types';
import { ColorPicker } from './components/color-picker.js';
import { rgbStringToHsv } from './utils/rgbStringToHsv.js';
import { hsvToRgbString } from './utils/hsvToRgbString.js';
import { equalColorString } from './utils/equalColorString.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'rgb(0, 0, 0)',
  toHsv: rgbStringToHsv,
  fromHsv: hsvToRgbString,
  equal: equalColorString,
  toAttr: (color) => color,
  fromAttr: (color) => color,
  reflect: true
};

export class ColorPickerRgbString extends ColorPicker<string> {
  get colorModel(): ColorModel<string> {
    return colorModel;
  }
}

customElements.define('color-picker-rgb-string', ColorPickerRgbString);
