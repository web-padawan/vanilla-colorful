import { Interactive, Interaction } from './interactive.js';
import { hsvToHslString } from '../utils/convert.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import styles from '../styles/hue.js';

const template = createTemplate(`<style>${styles}</style>`);

export class ColorHue extends Interactive {
  constructor() {
    super();
    createRoot(this, template);
  }

  set hue(h: number) {
    this.setStyles({
      left: `${(h / 360) * 100}%`,
      'background-color': hsvToHslString({ h, s: 100, v: 100 })
    });
  }

  getMove(interaction: Interaction): Record<string, number> {
    return { h: 360 * interaction.left };
  }
}

customElements.define('color-hue', ColorHue);
