import type { ColorModel, HSV } from './lib/types';
import { ColorPicker } from './lib/components/color-picker.js';
import { equalColorObjects } from './lib/utils/compare.js';

const colorModel: ColorModel<HSV> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  toHsv: (hsv) => hsv,
  fromHsv: (hsv) => hsv,
  equal: equalColorObjects,
  toAttr: (color) => JSON.stringify(color),
  fromAttr: (color) => JSON.parse(color),
  reflect: false
};

/**
 * A color picker custom element that uses HSV object format.
 *
 * @element color-picker-hsv
 *
 * @prop {string} color - Selected color in HSV object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart pointer - A draggable pointer element.
 */
export class ColorPickerHsv extends ColorPicker<HSV> {
  protected get colorModel(): ColorModel<HSV> {
    return colorModel;
  }
}

customElements.define('color-picker-hsv', ColorPickerHsv);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-hsv': ColorPickerHsv;
  }
}
