import { Interactive, Interaction } from './interactive.js';
import { PointerMixin } from './pointer-mixin.js';
import { saturationStyles } from '../styles.js';
import { hsvToHslString } from '../utils/convert.js';
import type { HSV } from '../types';

export class ColorSaturation extends PointerMixin(Interactive, saturationStyles) {
  setHsv({ h, s, v }: HSV): void {
    this.style.backgroundColor = hsvToHslString({ h, s: 100, v: 100 });
    this.setPointer({
      top: `${100 - v}%`,
      left: `${s}%`,
      backgroundColor: hsvToHslString({ h, s, v })
    });
  }

  onMove({ left, top }: Interaction): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        detail: { s: left * 100, v: Math.round(100 - top * 100) }
      })
    );
  }
}

customElements.define('color-saturation', ColorSaturation);
