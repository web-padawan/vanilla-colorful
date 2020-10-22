import { Interactive, Interaction } from './interactive.js';
import { hsvaToHslString } from '../utils/convert.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import { clamp, round } from '../utils/math.js';
import styles from '../styles/saturation.js';
import type { HsvaColor } from '../types';

const template = createTemplate(`<style>${styles}</style>`);

export class Saturation extends Interactive {
  constructor() {
    super();
    createRoot(this, template);
    this.setAttribute('aria-label', 'Color');
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
    return true;
  }

  get hsva(): HsvaColor {
    return this._hsva;
  }

  set hsva(hsva: HsvaColor) {
    this._hsva = hsva;
    this.style.backgroundColor = hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 });
    this.setStyles({
      top: `${100 - hsva.v}%`,
      left: `${hsva.s}%`,
      color: hsvaToHslString(hsva)
    });
    this.setAttribute(
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

customElements.define('vc-saturation', Saturation);
