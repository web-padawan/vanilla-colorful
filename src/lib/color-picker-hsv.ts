import type { ColorModel, HSV } from './types';
import { ColorPicker } from './components/color-picker.js';
import { equalColorObjects } from './utils/compare.js';

const colorModel: ColorModel<HSV> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  toHsv: (hsv) => hsv,
  fromHsv: (hsv) => hsv,
  equal: equalColorObjects,
  toAttr: (color) => JSON.stringify(color),
  fromAttr: (color) => JSON.parse(color),
  reflect: false
};

export class ColorPickerHsv extends ColorPicker<HSV> {
  get colorModel(): ColorModel<HSV> {
    return colorModel;
  }
}

customElements.define('color-picker-hsv', ColorPickerHsv);
