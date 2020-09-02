import { HexBase } from './lib/entrypoints/hex.js';

/**
 * A color picker custom element that uses HEX format.
 *
 * @element color-picker-hex
 *
 * @prop {string} color - Selected color in HEX format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class ColorPickerHex extends HexBase {}

customElements.define('color-picker-hex', ColorPickerHex);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-hex': ColorPickerHex;
  }
}
