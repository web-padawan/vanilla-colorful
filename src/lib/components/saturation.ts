import { Interactive, Interaction } from './interactive.js';
import { PointerMixin } from './pointer-mixin.js';
import { saturationStyles } from '../styles.js';
import { hsvToHslString } from '../utils/hsvToHslString.js';

export class ColorSaturation extends PointerMixin(Interactive, saturationStyles) {
  private _h!: number;

  get hue(): number {
    return this._h;
  }

  set hue(h: number) {
    this._h = h;
    this.style.setProperty('--s-bg', hsvToHslString({ h, s: 100, v: 100 }));
  }

  onMove({ left, top }: Interaction): void {
    const s = left * 100,
      v = 100 - top * 100;
    this.setProperties({
      top: `${100 - v}%`,
      left: `${s}%`,
      backgroundColor: hsvToHslString({ h: this.hue, s, v })
    });
    this.dispatchEvent(new CustomEvent('saturation-changed', { bubbles: true, detail: { s, v } }));
  }
}

customElements.define('color-saturation', ColorSaturation);
