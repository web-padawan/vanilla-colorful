import { Interactive, Interaction } from './interactive.js';
import { hsvaToHslString } from '../utils/convert.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import styles from '../styles/hue.js';

const template = createTemplate(`<style>${styles}</style>`);

export class Hue extends Interactive {
  constructor() {
    super();
    createRoot(this, template);
  }

  connectedCallback(): void {
    if (this.hasOwnProperty('hue')) {
      const value = this.hue;
      delete this['hue' as keyof this];
      this.hue = value;
    }
  }

  set hue(h: number) {
    this.setStyles({
      left: `${(h / 360) * 100}%`,
      color: hsvaToHslString({ h, s: 100, v: 100, a: 1 })
    });
  }

  getMove(interaction: Interaction): Record<string, number> {
    return { h: 360 * interaction.left };
  }
}

customElements.define('vc-hue', Hue);
