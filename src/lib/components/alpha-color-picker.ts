import { ColorPicker, $render } from './color-picker.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import type { AnyColor, HsvaColor } from '../types';
import type { Alpha } from './alpha.js';
import './alpha.js';

const tpl = createTemplate(
  '<vc-alpha part="alpha" exportparts="pointer: alpha-pointer"></vc-alpha>'
);

const $a = Symbol('a');

export abstract class AlphaColorPicker<C extends AnyColor> extends ColorPicker<C> {
  private [$a]!: Alpha;

  constructor() {
    super();
    this[$a] = createRoot(this, tpl).lastElementChild as Alpha;
  }

  protected [$render](hsva: HsvaColor): void {
    super[$render](hsva);
    this[$a].hsva = hsva;
  }
}
