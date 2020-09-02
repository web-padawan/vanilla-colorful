import { RgbStringBase } from './lib/entrypoints/rgb-string.js';

/**
 * A color picker custom element that uses RGB string format.
 *
 * @element color-picker-rgb-string
 *
 * @prop {string} color - Selected color in RGB string format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class ColorPickerRgbString extends RgbStringBase {}

customElements.define('color-picker-rgb-string', ColorPickerRgbString);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-rgb-string': ColorPickerRgbString;
  }
}
