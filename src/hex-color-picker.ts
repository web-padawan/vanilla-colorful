import { HexBase } from './lib/entrypoints/hex.js';

/**
 * A color picker custom element that uses HEX format.
 *
 * @element hex-color-picker
 *
 * @prop {string} color - Selected color in HEX format.
 * @attr {string} color - Selected color in HEX format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class HexColorPicker extends HexBase {}

customElements.define('hex-color-picker', HexColorPicker);

declare global {
  interface HTMLElementTagNameMap {
    'hex-color-picker': HexColorPicker;
  }
}
