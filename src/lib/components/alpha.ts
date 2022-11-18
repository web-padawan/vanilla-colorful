import { Slider, Offset } from './slider.js';
import { hsvaToHslaString } from '../utils/convert.js';
import { clamp, round } from '../utils/math.js';
import type { HsvaColor } from '../types';

export class Alpha extends Slider {
  declare hsva: HsvaColor;

  constructor(root: ShadowRoot) {
    super(root, 'alpha', 'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"', false);
  }

  update(hsva: HsvaColor): void {
    this.hsva = hsva;
    const colorFrom = hsvaToHslaString({ ...hsva, a: 0 });
    const colorTo = hsvaToHslaString({ ...hsva, a: 1 });
    const value = hsva.a * 100;

    this.style([
      {
        left: `${value}%`,
        color: hsvaToHslaString(hsva)
      },
      {
        '--gradient': `linear-gradient(45deg, ${colorFrom}, ${colorTo}`
      }
    ]);

    const v = round(value);
    this.el.setAttribute('aria-valuenow', `${v}`);
    this.el.setAttribute('aria-valuetext', `${v}%`);
  }

  getMove(offset: Offset, key?: boolean): Record<string, number> {
    // Alpha always fit into [0, 1] range
    return { a: key ? clamp(this.hsva.a + offset.x) : offset.x };
  }
}
