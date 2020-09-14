import { Interactive, Interaction } from './interactive.js';
import { hsvaToHslString } from '../utils/convert.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import styles from '../styles/saturation.js';
import type { HsvaColor } from '../types';

const template = createTemplate(`<style>${styles}</style>`);

export class Saturation extends Interactive {
  constructor() {
    super();
    createRoot(this, template);
  }

  connectedCallback(): void {
    if (this.hasOwnProperty('hsva')) {
      const value = this.hsva;
      delete this['hsva' as keyof this];
      this.hsva = value;
    }
  }

  set hsva(hsva: HsvaColor) {
    this.style.backgroundColor = hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 });
    this.setStyles({
      top: `${100 - hsva.v}%`,
      left: `${hsva.s}%`,
      color: hsvaToHslString(hsva)
    });
  }

  getMove(interaction: Interaction): Record<string, number> {
    return { s: interaction.left * 100, v: Math.round(100 - interaction.top * 100) };
  }
}

customElements.define('vc-saturation', Saturation);
