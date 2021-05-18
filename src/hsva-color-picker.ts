import { HsvaBase } from './lib/entrypoints/hsva.js';
export type { HsvaColor } from './lib/types';

/**
 * A color picker custom element that uses HSVA object format.
 *
 * @element hsva-color-picker
 *
 * @prop {HsvaColor} color - Selected color in HSVA object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 * @csspart alpha-gradient - An alpha gradient element.
 */
export class HsvaColorPicker extends HsvaBase {}

customElements.define('hsva-color-picker', HsvaColorPicker);

declare global {
  interface HTMLElementTagNameMap {
    'hsva-color-picker': HsvaColorPicker;
  }
}
