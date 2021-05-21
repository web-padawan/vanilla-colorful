import { HsvaStringBase } from './lib/entrypoints/hsva-string.js';

/**
 * A color picker custom element that uses HSVA string format.
 *
 * @element hsva-string-color-picker
 *
 * @prop {string} color - Selected color in HSVA string format.
 * @attr {string} color - Selected color in HSVA string format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart alpha - An alpha selector container.
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 * @csspart alpha-pointer - An alpha pointer element.
 */
export class HsvaStringColorPicker extends HsvaStringBase {}

customElements.define('hsva-string-color-picker', HsvaStringColorPicker);

declare global {
  interface HTMLElementTagNameMap {
    'hsva-string-color-picker': HsvaStringColorPicker;
  }
}
