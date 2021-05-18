import { ColorPicker, $render } from './color-picker.js';
import type { AnyColor, HsvaColor } from '../types';
import { AlphaController } from './alpha.js';
import './alpha.js';

const $a = Symbol('a');

export abstract class AlphaColorPicker<C extends AnyColor> extends ColorPicker<C> {
  private [$a]!: AlphaController;

  constructor() {
    super();
    this[$a] = new AlphaController(this);
  }

  protected [$render](hsva: HsvaColor): void {
    super[$render](hsva);
    this[$a].hsva = hsva;
  }
}
