import { HexInputBase } from './lib/entrypoints/hex-input.js';

/**
 * A color picker custom element that uses HEX format.
 *
 * @element hex-input
 *
 * @prop {string} color - Color in HEX format.
 *
 * @fires color-changed - Event fired when color is changed.
 */
export class HexInput extends HexInputBase {}

customElements.define('hex-input', HexInput);

declare global {
  interface HTMLElementTagNameMap {
    'hex-input': HexInput;
  }
}
