import type { ColorModel } from './lib/types';
import { ColorPicker } from './lib/components/color-picker.js';
import { hslStringToHsv, hsvToHslString } from './lib/utils/convert.js';
import { equalColorString } from './lib/utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'hsl(0, 0%, 0%)',
  toHsv: hslStringToHsv,
  fromHsv: hsvToHslString,
  equal: equalColorString,
  fromAttr: (color) => color
};

/**
 * A color picker custom element that uses HSL string format.
 *
 * @element color-picker-hsl-string
 *
 * @prop {string} color - Selected color in HSL string format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class ColorPickerHslString extends ColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}

customElements.define('color-picker-hsl-string', ColorPickerHslString);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-hsl-string': ColorPickerHslString;
  }
}
