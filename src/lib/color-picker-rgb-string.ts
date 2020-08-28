import type { ColorModel } from './types';
import { ColorPicker } from './components/color-picker.js';
import { hsvToRgbString, rgbStringToHsv } from './utils/convert.js';
import { equalColorString } from './utils/compare.js';

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
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}

customElements.define('color-picker-rgb-string', ColorPickerRgbString);
