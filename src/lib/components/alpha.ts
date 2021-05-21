import { Slider, Interaction } from './slider.js';
import { hsvaToHslaString } from '../utils/convert.js';
import { createTemplate } from '../utils/dom.js';
import { clamp, round } from '../utils/math.js';
import styles from '../styles/alpha.js';
import type { HsvaColor } from '../types';

const template = createTemplate(`
<style>${styles}</style>
<div role="slider" part="alpha" aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"><div part="alpha-pointer"></div></div><span part="gradient"></span>
`);

export class Alpha extends Slider {
  private gradient!: CSSStyleDeclaration;

  private _hsva!: HsvaColor;

  constructor(host: HTMLElement) {
    super(host);
    this.gradient = (this.node.nextElementSibling as HTMLElement).style;
  }

  get xy(): boolean {
    return false;
  }

  update(hsva: HsvaColor): void {
    this._hsva = hsva;
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

  getTemplate(): HTMLTemplateElement {
    return template;
  }

  getPart(): string {
    return 'alpha';
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Alpha always fit into [0, 1] range
    return { a: key ? clamp(this._hsva.a + interaction.left) : interaction.left };
  }
}
