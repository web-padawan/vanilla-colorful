import { HslStringBase } from './lib/entrypoints/hsl-string.js';

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
export class ColorPickerHslString extends HslStringBase {}

customElements.define('color-picker-hsl-string', ColorPickerHslString);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-hsl-string': ColorPickerHslString;
  }
}
