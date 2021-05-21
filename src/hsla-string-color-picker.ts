import { HslaStringBase } from './lib/entrypoints/hsla-string.js';

/**
 * A color picker custom element that uses HSLA string format.
 *
 * @element hsla-string-color-picker
 *
 * @prop {string} color - Selected color in HSLA string format.
 * @attr {string} color - Selected color in HSLA string format.
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
export class HslaStringColorPicker extends HslaStringBase {}

customElements.define('hsla-string-color-picker', HslaStringColorPicker);

declare global {
  interface HTMLElementTagNameMap {
    'hsla-string-color-picker': HslaStringColorPicker;
  }
}
