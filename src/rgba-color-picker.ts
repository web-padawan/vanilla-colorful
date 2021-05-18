import { RgbaBase } from './lib/entrypoints/rgba.js';
export type { RgbaColor } from './lib/types';

/**
 * A color picker custom element that uses RGBA object format.
 *
 * @element rgba-color-picker
 *
 * @prop {RgbaColor} color - Selected color in RGBA object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart alpha - An alpha selector container.
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 * @csspart alpha-pointer - An alpha pointer element.
 * @csspart alpha-gradient - An alpha gradient element.
 */
export class RgbaColorPicker extends RgbaBase {}

customElements.define('rgba-color-picker', RgbaColorPicker);

declare global {
  interface HTMLElementTagNameMap {
    'rgba-color-picker': RgbaColorPicker;
  }
}
