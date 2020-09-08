import { equalColorObjects } from '../utils/compare.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import type { AnyColor, ColorModel, HsvColor } from '../types';
import type { Hue } from './hue.js';
import type { Saturation } from './saturation.js';
import './hue.js';
import './saturation.js';
import styles from '../styles/color-picker.js';

const tpl = createTemplate(`
<style>${styles}</style>
<vc-saturation part="saturation" exportparts="pointer: saturation-pointer"></vc-saturation>
<vc-hue part="hue" exportparts="pointer: hue-pointer"></vc-hue>
`);

export abstract class ColorPicker<C extends AnyColor> extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color'];
  }

  protected abstract get colorModel(): ColorModel<C>;

  private _h!: Hue;

  private _s!: Saturation;

  private _hsv!: HsvColor;

  private _color!: C;

  get color(): C {
    return this._color;
  }

  set color(newColor: C) {
    if (!this._isSame(newColor)) {
      const newHsv = this.colorModel.toHsv(newColor);
      this._render(newHsv);
      this._change(newColor, newHsv);
    }
  }

  constructor() {
    super();
    const root = createRoot(this, tpl);
    root.addEventListener('move', this);
    this._s = root.children[1] as Saturation;
    this._h = root.children[2] as Hue;
  }

  connectedCallback(): void {
    // A user may set a property on an _instance_ of an element,
    // before its prototype has been connected to this class.
    // If so, we need to run it through the proper class setter.
    if (this.hasOwnProperty('color')) {
      const value = this.color;
      delete this['color' as keyof this];
      this.color = value;
    } else if (!this.color) {
      this.color = this.colorModel.defaultColor;
    }
  }

  attributeChangedCallback(_attr: string, _oldVal: string, newVal: string): void {
    const color = this.colorModel.fromAttr(newVal);
    if (!this._isSame(color)) {
      this.color = color;
    }
  }

  handleEvent(event: CustomEvent): void {
    // Merge the current HSV color object with updated params.
    const newHsv = Object.assign({}, this._hsv, event.detail);
    this._render(newHsv);
    let newColor;
    if (
      !equalColorObjects(newHsv, this._hsv) &&
      !this._isSame((newColor = this.colorModel.fromHsv(newHsv)))
    ) {
      this._change(newColor, newHsv);
    }
  }

  private _isSame(color: C): boolean {
    return this.color && this.colorModel.equal(color, this.color);
  }

  private _render(hsv: HsvColor): void {
    this._s.hsv = hsv;
    this._h.hue = hsv.h;
  }

  private _change(color: C, hsv: HsvColor): void {
    this._color = color;
    this._hsv = hsv;
    this.dispatchEvent(new CustomEvent('color-changed', { detail: { value: color } }));
  }
}
