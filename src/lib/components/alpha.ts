import { Slider, Interaction } from './slider.js';
import { hsvaToHslaString } from '../utils/convert.js';
import { createTemplate } from '../utils/dom.js';
import { clamp, round } from '../utils/math.js';
import styles from '../styles/alpha.js';
import type { HsvaColor } from '../types';

const template = createTemplate(`
<style>${styles}</style>
<div role="slider" part="alpha" aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"><div id="gradient"><div part="alpha-pointer"></div></div></div>
`);

export class Alpha extends Slider {
  private gradient!: HTMLElement;

  private _hsva!: HsvaColor;

  constructor(host: HTMLElement) {
    super(host);
    this.gradient = this.node.querySelector('#gradient') as HTMLElement;
  }

  get xy(): boolean {
    return false;
  }

  get hsva(): HsvaColor {
    return this._hsva;
  }

  set hsva(hsva: HsvaColor) {
    this._hsva = hsva;
    const colorFrom = hsvaToHslaString({ ...hsva, a: 0 });
    const colorTo = hsvaToHslaString({ ...hsva, a: 1 });
    const value = hsva.a * 100;

    this.gradient.style.backgroundImage = `linear-gradient(to right, ${colorFrom}, ${colorTo}`;
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

  getNode(root: ShadowRoot): HTMLElement {
    return root.querySelector('[part=alpha]') as HTMLElement;
  }

  getPointer(root: ShadowRoot): HTMLElement {
    return root.querySelector('[part=alpha-pointer]') as HTMLElement;
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Alpha always fit into [0, 1] range
    return { a: key ? clamp(this.hsva.a + interaction.left) : interaction.left };
  }
}
