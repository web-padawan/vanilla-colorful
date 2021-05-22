import { ColorPicker, Sliders, $css, $sliders } from './color-picker.js';
import type { AnyColor } from '../types';
import { Alpha } from './alpha.js';
import alphaCss from '../styles/alpha.js';

export abstract class AlphaColorPicker<C extends AnyColor> extends ColorPicker<C> {
  protected get [$css](): string[] {
    return [...super[$css], alphaCss];
  }

  protected get [$sliders](): Sliders {
    return [...super[$sliders], Alpha];
  }
}
