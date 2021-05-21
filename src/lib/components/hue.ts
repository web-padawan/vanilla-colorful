import { Slider, Interaction } from './slider.js';
import { hsvaToHslString } from '../utils/convert.js';
import { clamp, round } from '../utils/math.js';
import type { HsvaColor } from '../types';

export class Hue extends Slider {
  private h!: number;

  constructor(root: ShadowRoot) {
    super(
      root,
      '<div role="slider" part="hue" aria-label="Hue" aria-valuemin="0" aria-valuemax="360"><div part="hue-pointer"></div></div>',
      'hue',
      false
    );
  }

  update({ h }: HsvaColor): void {
    this.h = h;
    this.setStyles({
      left: `${(h / 360) * 100}%`,
      color: hsvaToHslString({ h, s: 100, v: 100, a: 1 })
    });
    this.node.setAttribute('aria-valuenow', `${round(h)}`);
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    return { h: key ? clamp(this.h + interaction.left * 360, 0, 360) : 360 * interaction.left };
  }
}
