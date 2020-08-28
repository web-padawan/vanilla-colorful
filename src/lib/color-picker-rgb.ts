import type { ColorModel, RGB } from './types';
import { ColorPicker } from './components/color-picker.js';
import { hsvToRgb, rgbToHsv } from './utils/convert.js';
import { equalColorObjects } from './utils/compare.js';

const colorModel: ColorModel<RGB> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsv: rgbToHsv,
  fromHsv: hsvToRgb,
  equal: equalColorObjects,
  toAttr: (color) => JSON.stringify(color),
  fromAttr: (color) => JSON.parse(color),
  reflect: false
};

export class ColorPickerRgb extends ColorPicker<RGB> {
  get colorModel(): ColorModel<RGB> {
    return colorModel;
  }
}

customElements.define('color-picker-rgb', ColorPickerRgb);
