import { Slider, Interaction } from './slider.js';
import { hsvaToHslString } from '../utils/convert.js';
import { clamp, round } from '../utils/math.js';
import type { HsvaColor } from '../types';

export class Saturation extends Slider {
  private hsva!: HsvaColor;

  constructor(root: ShadowRoot) {
    super(
      root,
      '<div role="slider" part="saturation" aria-label="Color"><div part="saturation-pointer"></div></div>',
      'saturation',
      true
    );
    this.nodes.push(this.el);
  }

  update(hsva: HsvaColor): void {
    this.hsva = hsva;
    this.style([
      {
        top: `${100 - hsva.v}%`,
        left: `${hsva.s}%`,
        color: hsvaToHslString(hsva)
      },
      {
        backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 })
      }
    ]);
    this.el.setAttribute(
      'aria-valuetext',
      `Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`
    );
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Saturation and brightness always fit into [0, 100] range
    return {
      s: key ? clamp(this.hsva.s + interaction.left * 100, 0, 100) : interaction.left * 100,
      v: key
        ? clamp(this.hsva.v - interaction.top * 100, 0, 100)
        : Math.round(100 - interaction.top * 100)
    };
  }
}
