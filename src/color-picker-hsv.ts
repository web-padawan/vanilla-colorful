import { HsvBase } from './lib/entrypoints/hsv.js';
export type { HSV } from './lib/types';

/**
 * A color picker custom element that uses HSV object format.
 *
 * @element color-picker-hsv
 *
 * @prop {HSV} color - Selected color in HSV object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
export class ColorPickerHsv extends HsvBase {}

customElements.define('color-picker-hsv', ColorPickerHsv);

declare global {
  interface HTMLElementTagNameMap {
    'color-picker-hsv': ColorPickerHsv;
  }
}
