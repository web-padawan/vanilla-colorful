import { Interactive, Interaction } from './interactive.js';
import { hsvToHslString } from '../utils/convert.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import styles from '../styles/saturation.js';
import type { HSV } from '../types';

const template = createTemplate(`<style>${styles}</style>`);

export class Saturation extends Interactive {
  constructor() {
    super();
    createRoot(this, template);
  }

  connectedCallback(): void {
    if (this.hasOwnProperty('hsv')) {
      const value = this.hsv;
      delete this['hsv' as keyof this];
      this.hsv = value;
    }
  }

  set hsv(hsv: HSV) {
    this.style.backgroundColor = hsvToHslString({ h: hsv.h, s: 100, v: 100 });
    this.setStyles({
      top: `${100 - hsv.v}%`,
      left: `${hsv.s}%`,
      'background-color': hsvToHslString(hsv)
    });
  }

  getMove(interaction: Interaction): Record<string, number> {
    return { s: interaction.left * 100, v: Math.round(100 - interaction.top * 100) };
  }
}

customElements.define('vc-saturation', Saturation);
