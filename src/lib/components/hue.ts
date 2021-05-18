import { Slider, Interaction } from './slider.js';
import { hsvaToHslString } from '../utils/convert.js';
import { createTemplate } from '../utils/dom.js';
import { clamp, round } from '../utils/math.js';
import styles from '../styles/hue.js';

const template = createTemplate(`
<style>${styles}</style>
<div role="slider" part="hue" aria-label="Hue" aria-valuemin="0" aria-valuemax="360"><div part="hue-pointer"></div></div>
`);

export class Hue extends Slider {
  private _h!: number;

  get xy(): boolean {
    return false;
  }

  get hue(): number {
    return this._h;
  }

  set hue(h: number) {
    this._h = h;
    this.setStyles({
      left: `${(h / 360) * 100}%`,
      color: hsvaToHslString({ h, s: 100, v: 100, a: 1 })
    });
    this.node.setAttribute('aria-valuenow', `${round(h)}`);
  }

  getTemplate(): HTMLTemplateElement {
    return template;
  }

  getPart(): string {
    return 'hue';
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    return { h: key ? clamp(this.hue + interaction.left * 360, 0, 360) : 360 * interaction.left };
  }
}
