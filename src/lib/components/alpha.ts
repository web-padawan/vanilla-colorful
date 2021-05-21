import { Slider, Interaction } from './slider.js';
import { hsvaToHslaString } from '../utils/convert.js';
import { clamp, round } from '../utils/math.js';
import type { HsvaColor } from '../types';

export class Alpha extends Slider {
  private gradient!: CSSStyleDeclaration;

  private hsva!: HsvaColor;

  constructor(root: ShadowRoot) {
    super(
      root,
      '<div role="slider" part="alpha" aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"><div part="alpha-pointer"></div></div><span part="gradient"></span>',
      'alpha',
      false
    );
    this.gradient = (this.node.nextElementSibling as HTMLElement).style;
  }

  update(hsva: HsvaColor): void {
    this.hsva = hsva;
    const colorFrom = hsvaToHslaString({ ...hsva, a: 0 });
    const colorTo = hsvaToHslaString({ ...hsva, a: 1 });
    const value = hsva.a * 100;

    this.gradient.backgroundImage = `linear-gradient(to right, ${colorFrom}, ${colorTo}`;
    this.setStyles({
      left: `${value}%`,
      color: hsvaToHslaString(hsva)
    });
    const v = round(value);
    this.node.setAttribute('aria-valuenow', `${v}`);
    this.node.setAttribute('aria-valuetext', `${v}%`);
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Alpha always fit into [0, 1] range
    return { a: key ? clamp(this.hsva.a + interaction.left) : interaction.left };
  }
}
