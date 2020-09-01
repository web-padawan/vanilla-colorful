import type { ColorModel } from './lib/types';
import { ColorPicker } from './lib/components/color-picker.js';
import { hexToHsv, hsvToHex } from './lib/utils/convert.js';
import { equalHex } from './lib/utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: '#000',
  toHsv: hexToHsv,
  fromHsv: hsvToHex,
  equal: equalHex,
  fromAttr: (color) => color
};

/**
 * A color picker custom element that uses HEX format.
 *
 * @element color-picker-hex
 *
 * @prop {string} color - Selected color in HEX format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart pointer - A draggable pointer element.
 */
export class ColorPickerHex extends ColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}

customElements.define('color-picker-hex', ColorPickerHex);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-hex': ColorPickerHex;
  }
}
