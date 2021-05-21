import { ColorPicker, $parts } from './color-picker.js';
import type { AnyColor } from '../types';
import { Alpha } from './alpha.js';

export abstract class AlphaColorPicker<C extends AnyColor> extends ColorPicker<C> {
  constructor() {
    super();
    this[$parts] = [...this[$parts], new Alpha(this)];
  }
}
