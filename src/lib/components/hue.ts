import { Interactive, Interaction } from './interactive.js';
import { hsvaToHslString } from '../utils/convert.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import { clamp } from '../utils/clamp.js';
import styles from '../styles/hue.js';

const template = createTemplate(`<style>${styles}</style>`);

export class Hue extends Interactive {
  constructor() {
    super();
    createRoot(this, template);
    this.setAttribute('aria-label', 'Hue');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '360');
  }

  connectedCallback(): void {
    if (this.hasOwnProperty('hue')) {
      const value = this.hue;
      delete this['hue' as keyof this];
      this.hue = value;
    }
  }

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
    this.setAttribute('aria-valuenow', `${Math.round(h)}`);
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    return { h: key ? clamp(this.hue + interaction.left * 360, 0, 360) : 360 * interaction.left };
  }
}

customElements.define('vc-hue', Hue);
