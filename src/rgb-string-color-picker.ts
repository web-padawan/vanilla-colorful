import { RgbStringBase } from './lib/entrypoints/rgb-string.js';

/**
 * A color picker custom element that uses RGB string format.
 *
 * @element rgb-string-color-picker
 *
 * @prop {string} color - Selected color in RGB string format.
 * @attr {string} color - Selected color in RGB string format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class RgbStringColorPicker extends RgbStringBase {}

customElements.define('rgb-string-color-picker', RgbStringColorPicker);

declare global {
  interface HTMLElementTagNameMap {
    'rgb-string-color-picker': RgbStringColorPicker;
  }
}
