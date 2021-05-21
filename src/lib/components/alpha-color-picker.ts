import { ColorPicker, $css, $parts } from './color-picker.js';
import type { AnyColor } from '../types';
import { Alpha } from './alpha.js';
import alphaCss from '../styles/alpha.js';

export abstract class AlphaColorPicker<C extends AnyColor> extends ColorPicker<C> {
  protected get [$css](): string[] {
    return [...super[$css], alphaCss];
  }

  constructor() {
    super();
    this[$parts] = [...this[$parts], new Alpha(this.shadowRoot as ShadowRoot)];
  }
}
