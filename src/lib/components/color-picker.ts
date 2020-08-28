import { colorPickerStyles } from '../styles.js';
import './hue.js';
import './saturation.js';
import { equalColorObjects } from '../utils/equalColorObjects.js';
import type { ColorSaturation } from './saturation.js';
import type { HSV, AnyColor, ColorModel } from '../types';
import { ColorHue } from './hue.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>${colorPickerStyles}</style>
  <color-saturation part="saturation" exportparts="pointer"></color-saturation>
  <color-hue part="hue" exportparts="pointer"></color-hue>
`;

export abstract class ColorPicker<C extends AnyColor> extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color'];
  }

  abstract get colorModel(): ColorModel<C>;

  private $!: { h: ColorHue; s: ColorSaturation };

  private _hsv!: HSV;

  private _color!: C;

  private get hsv(): HSV {
    return this._hsv;
  }

  private set hsv(hsv: HSV) {
    this._hsv = hsv;
    this.$.s.hsv = hsv;
    this.$.h.hue = hsv.h;
  }

  get color(): C {
    return this._color;
  }

  set color(color: C) {
    if (!this._color || !this.colorModel.equal(color, this._color)) {
      this._setProps(color, this.colorModel.toHsv(color));
    }
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    root.addEventListener('change', this);

    this.$ = {
      h: root.children[2] as ColorHue,
      s: root.children[1] as ColorSaturation
    };
  }

  connectedCallback(): void {
    const attr = this.getAttribute('color');
    this.color = attr ? this.colorModel.fromAttr(attr) : this.colorModel.defaultColor;
  }

  attributeChangedCallback(_attr: string, _oldVal: string, newVal: string): void {
    const color = this.colorModel.fromAttr(newVal);
    if (this.color !== color) {
      this.color = color;
    }
  }

  handleEvent({ detail }: CustomEvent): void {
    // Merge the current HSV color object with updated params.
    const hsv = Object.assign({}, this.hsv, detail);
    if (!equalColorObjects(hsv, this.hsv)) {
      this._setProps(this.colorModel.fromHsv(hsv), hsv);
    }
  }

  protected _setProps(color: C, hsv: HSV): void {
    this.hsv = hsv;
    this._color = color;
    const { reflect, toAttr } = this.colorModel;
    const attr = toAttr(color);
    if (reflect && this.getAttribute('color') !== attr) this.setAttribute('color', attr);
    this.dispatchEvent(new CustomEvent('color-changed', { detail: { value: color } }));
  }
}
