import { Interactive, Interaction } from './interactive.js';
import { hsvaToHslaString } from '../utils/convert.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import { clamp, round } from '../utils/math.js';
import styles from '../styles/alpha.js';
import type { HsvaColor } from '../types';

const template = createTemplate(`<style>${styles}</style><div id="gradient"></div>`);

export class Alpha extends Interactive {
  private gradient!: HTMLElement;

  constructor() {
    super();
    this.gradient = createRoot(this, template).querySelector('#gradient') as HTMLElement;
    this.setAttribute('aria-label', 'Alpha');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '1');
  }

  connectedCallback(): void {
    if (this.hasOwnProperty('hsva')) {
      const value = this.hsva;
      delete this['hsva' as keyof this];
      this.hsva = value;
    }
  }

  private _hsva!: HsvaColor;

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
      top: '50%',
      left: `${value}%`,
      color: hsvaToHslaString(hsva)
    });
    const v = round(value);
    this.setAttribute('aria-valuenow', `${v}`);
    this.setAttribute('aria-valuetext', `${v}%`);
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Alpha always fit into [0, 1] range
    return { a: key ? clamp(this.hsva.a + interaction.left) : interaction.left };
  }
}

customElements.define('vc-alpha', Alpha);
