import { Interactive, Interaction } from './interactive.js';
import { hsvaToHslaString } from '../utils/convert.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import styles from '../styles/alpha.js';
import type { HsvaColor } from '../types';

const template = createTemplate(`<style>${styles}</style><div id="gradient"></div>`);

export class Alpha extends Interactive {
  private gradient!: HTMLElement;

  constructor() {
    super();
    this.gradient = createRoot(this, template).querySelector('#gradient') as HTMLElement;
  }

  connectedCallback(): void {
    if (this.hasOwnProperty('hsva')) {
      const value = this.hsva;
      delete this['hsva' as keyof this];
      this.hsva = value;
    }
  }

  set hsva(hsva: HsvaColor) {
    const colorFrom = hsvaToHslaString({ ...hsva, a: 0 });
    const colorTo = hsvaToHslaString({ ...hsva, a: 1 });

    this.gradient.style.backgroundImage = `linear-gradient(to right, ${colorFrom}, ${colorTo}`;
    this.setStyles({
      top: '50%',
      left: `${hsva.a * 100}%`,
      color: hsvaToHslaString(hsva)
    });
  }

  getMove(interaction: Interaction): Record<string, number> {
    // Alpha always fit into [0, 1] range
    return { a: interaction.left };
  }
}

customElements.define('vc-alpha', Alpha);
