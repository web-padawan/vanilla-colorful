import { Slider, Interaction } from './slider.js';
import { hsvaToHslString } from '../utils/convert.js';
import { createTemplate } from '../utils/dom.js';
import { clamp, round } from '../utils/math.js';
import styles from '../styles/saturation.js';
import type { HsvaColor } from '../types';

const template = createTemplate(`
<style>${styles}</style>
<div role="slider" part="saturation" aria-label="Color"><div part="saturation-pointer"></div></div>
`);

export class Saturation extends Slider {
  private _hsva!: HsvaColor;

  get xy(): boolean {
    return true;
  }

  update(hsva: HsvaColor): void {
    this._hsva = hsva;
    this.node.style.backgroundColor = hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 });
    this.setStyles({
      top: `${100 - hsva.v}%`,
      left: `${hsva.s}%`,
      color: hsvaToHslString(hsva)
    });
    this.node.setAttribute(
      'aria-valuetext',
      `Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`
    );
  }

  getTemplate(): HTMLTemplateElement {
    return template;
  }

  getPart(): string {
    return 'saturation';
  }

  getMove(interaction: Interaction, key?: boolean): Record<string, number> {
    // Saturation and brightness always fit into [0, 100] range
    return {
      s: key ? clamp(this._hsva.s + interaction.left * 100, 0, 100) : interaction.left * 100,
      v: key
        ? clamp(this._hsva.v - interaction.top * 100, 0, 100)
        : Math.round(100 - interaction.top * 100)
    };
  }
}
