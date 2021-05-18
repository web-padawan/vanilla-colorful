import { ColorPicker, $render } from './color-picker.js';
import type { AnyColor, HsvaColor } from '../types';
import { Alpha } from './alpha.js';
import './alpha.js';

const $a = Symbol('a');

export abstract class AlphaColorPicker<C extends AnyColor> extends ColorPicker<C> {
  private [$a]!: Alpha;

  constructor() {
    super();
    this[$a] = new Alpha(this);
  }

  protected [$render](hsva: HsvaColor): void {
    super[$render](hsva);
    this[$a].hsva = hsva;
  }
}
