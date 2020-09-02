import { HslBase } from './lib/entrypoints/hsl.js';
export type { HSL } from './lib/types';

/**
 * A color picker custom element that uses HSL object format.
 *
 * @element color-picker-hsl
 *
 * @prop {HSL} color - Selected color in HSL object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class ColorPickerHsl extends HslBase {}

customElements.define('color-picker-hsl', ColorPickerHsl);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-hsl': ColorPickerHsl;
  }
}
