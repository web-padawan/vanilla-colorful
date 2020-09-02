import { RgbBase } from './lib/entrypoints/rgb.js';
export type { RGB } from './lib/types';

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
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class ColorPickerRgb extends RgbBase {}

customElements.define('color-picker-rgb', ColorPickerRgb);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-rgb': ColorPickerRgb;
  }
}
