import { RgbBase } from './lib/entrypoints/rgb.js';
export type { RgbColor } from './lib/types';

/**
 * A color picker custom element that uses RGB object format.
 *
 * @element rgb-color-picker
 *
 * @prop {RgbColor} color - Selected color in RGB object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class RgbColorPicker extends RgbBase {}

customElements.define('rgb-color-picker', RgbColorPicker);

declare global {
  interface HTMLElementTagNameMap {
    'rgb-color-picker': RgbColorPicker;
  }
}
