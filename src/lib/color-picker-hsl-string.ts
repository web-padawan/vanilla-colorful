import type { ColorModel } from './types';
import { ColorPicker } from './components/color-picker.js';
import { hslStringToHsv } from './utils/hslStringToHsv.js';
import { hsvToHslString } from './utils/hsvToHslString.js';
import { equalColorString } from './utils/equalColorString.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'hsl(0, 0%, 0%)',
  toHsv: hslStringToHsv,
  fromHsv: hsvToHslString,
  equal: equalColorString,
  toAttr: (color) => color,
  fromAttr: (color) => color,
  reflect: true
};

export class ColorPickerHslString extends ColorPicker<string> {
  get colorModel(): ColorModel<string> {
    return colorModel;
  }
}

customElements.define('color-picker-hsl-string', ColorPickerHslString);
