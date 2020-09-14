import { ColorPicker } from './color-picker.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import type { AnyColor, HsvaColor } from '../types';
import type { Alpha } from './alpha.js';
import './alpha.js';

const tpl = createTemplate(
  '<vc-alpha part="alpha" exportparts="pointer: alpha-pointer"></vc-alpha>'
);

export abstract class AlphaColorPicker<C extends AnyColor> extends ColorPicker<C> {
  private _a!: Alpha;

  constructor() {
    super();
    this._a = createRoot(this, tpl).lastElementChild as Alpha;
  }

  protected _render(hsva: HsvaColor): void {
    super._render(hsva);
    this._a.hsva = hsva;
  }
}
