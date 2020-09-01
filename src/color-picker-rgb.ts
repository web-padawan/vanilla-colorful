import type { ColorModel, RGB } from './lib/types';
import { ColorPicker } from './lib/components/color-picker.js';
import { hsvToRgb, rgbToHsv } from './lib/utils/convert.js';
import { equalColorObjects } from './lib/utils/compare.js';

export { RGB };

const colorModel: ColorModel<RGB> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsv: rgbToHsv,
  fromHsv: hsvToRgb,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

/**
 * A color picker custom element that uses RGB object format.
 *
 * @element color-picker-rgb
 *
 * @prop {RGB} color - Selected color in RGB object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart pointer - A draggable pointer element.
 */
export class ColorPickerRgb extends ColorPicker<RGB> {
  protected get colorModel(): ColorModel<RGB> {
    return colorModel;
  }
}

customElements.define('color-picker-rgb', ColorPickerRgb);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-rgb': ColorPickerRgb;
  }
}
