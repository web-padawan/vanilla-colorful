import { Interactive, Interaction } from './interactive.js';
import { PointerMixin } from './pointer-mixin.js';
import { hueStyles } from '../styles.js';
import { hsvToHslString } from '../utils/convert.js';

export class ColorHue extends PointerMixin(Interactive, hueStyles) {
  set hue(h: number) {
    this.setPointer({
      left: `${(h / 360) * 100}%`,
      backgroundColor: hsvToHslString({ h, s: 100, v: 100 })
    });
  }

  onMove({ left }: Interaction): void {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { h: 360 * left } }));
  }
}

customElements.define('color-hue', ColorHue);
