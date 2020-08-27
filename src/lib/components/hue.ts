import { Interactive, Interaction } from './interactive.js';
import { PointerMixin } from './pointer-mixin.js';
import { hueStyles } from '../styles.js';
import { hsvToHslString } from '../utils/hsvToHslString.js';

export class ColorHue extends PointerMixin(Interactive, hueStyles) {
  onMove({ left }: Interaction): void {
    const h = 360 * left;
    this.setProperties({
      left: `${(h / 360) * 100}%`,
      backgroundColor: hsvToHslString({ h, s: 100, v: 100 })
    });
    this.dispatchEvent(new CustomEvent('hue-changed', { bubbles: true, detail: { h } }));
  }
}

customElements.define('color-hue', ColorHue);
