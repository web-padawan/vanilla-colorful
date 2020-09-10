import { HslStringBase } from './lib/entrypoints/hsl-string.js';

/**
 * A color picker custom element that uses HSL string format.
 *
 * @element hsl-string-color-picker
 *
 * @prop {string} color - Selected color in HSL string format.
 * @attr {string} color - Selected color in HSL string format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class HslStringColorPicker extends HslStringBase {}

customElements.define('hsl-string-color-picker', HslStringColorPicker);

declare global {
  interface HTMLElementTagNameMap {
    'hsl-string-color-picker': HslStringColorPicker;
  }
}
