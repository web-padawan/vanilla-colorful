import type { ColorModel, HSL } from './lib/types';
import { ColorPicker } from './lib/components/color-picker.js';
import { hslToHsv, hsvToHsl } from './lib/utils/convert.js';
import { equalColorObjects } from './lib/utils/compare.js';

export { HSL };

const colorModel: ColorModel<HSL> = {
  defaultColor: { h: 0, s: 0, l: 0 },
  toHsv: hslToHsv,
  fromHsv: hsvToHsl,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

/**
 * A color picker custom element that uses HSL object format.
 *
 * @element color-picker-hsl
 *
 * @prop {string} color - Selected color in HSL object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart pointer - A draggable pointer element.
 */
export class ColorPickerHsl extends ColorPicker<HSL> {
  protected get colorModel(): ColorModel<HSL> {
    return colorModel;
  }
}

customElements.define('color-picker-hsl', ColorPickerHsl);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-hsl': ColorPickerHsl;
  }
}
