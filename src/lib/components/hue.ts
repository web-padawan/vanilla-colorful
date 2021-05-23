import { Slider, Offset } from './slider.js';
import { hsvaToHslString } from '../utils/convert.js';
import { clamp, round } from '../utils/math.js';
import type { HsvaColor } from '../types';

export class Hue extends Slider {
  private h!: number;

  constructor(root: ShadowRoot) {
    super(root, 'hue', 'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"', false);
  }

  update({ h }: HsvaColor): void {
    this.h = h;
    this.style([
      {
        left: `${(h / 360) * 100}%`,
        color: hsvaToHslString({ h, s: 100, v: 100, a: 1 })
      }
    ]);
    this.el.setAttribute('aria-valuenow', `${round(h)}`);
  }

  getMove(offset: Offset, key?: boolean): Record<string, number> {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    return { h: key ? clamp(this.h + offset.x * 360, 0, 360) : 360 * offset.x };
  }
}
