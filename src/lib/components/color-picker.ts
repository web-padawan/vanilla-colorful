import { equalColorObjects } from '../utils/compare.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import type { ColorSaturation } from './saturation.js';
import type { HSV, AnyColor, ColorModel } from '../types';
import './hue.js';
import './saturation.js';
import { ColorHue } from './hue.js';
import styles from '../styles/color-picker.js';

const tpl = createTemplate(`
<style>${styles}</style>
<color-saturation part="saturation" exportparts="pointer"></color-saturation>
<color-hue part="hue" exportparts="pointer"></color-hue>
`);

const $color = Symbol('color');
const $hsv = Symbol('hsv');

export abstract class ColorPicker<C extends AnyColor> extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color'];
  }

  protected abstract get colorModel(): ColorModel<C>;

  private $!: { h: ColorHue; s: ColorSaturation };

  private [$hsv]!: HSV;

  private [$color]!: C;

  private _ready!: Promise<void[]>;

  private get hsv(): HSV {
    return this[$hsv];
  }

  private set hsv(hsv: HSV) {
    this[$hsv] = hsv;
    // Wait for custom elements to upgrade before setting properties.
    // Otherwise these would shadow the accessors and break.
    this._ready.then(() => {
      this.$.s.hsv = hsv;
      this.$.h.hue = hsv.h;
    });
  }

  get color(): C {
    return this[$color];
  }

  set color(color: C) {
    if (!this[$color] || !this.colorModel.equal(color, this[$color])) {
      this._setProps(color, this.colorModel.toHsv(color));
    }
  }

  constructor() {
    super();
    const root = createRoot(this, tpl);
    root.addEventListener('move', this);

    this._ready = Promise.all([
      customElements.whenDefined('color-hue'),
      customElements.whenDefined('color-saturation')
    ]);

    this.$ = {
      h: root.children[2] as ColorHue,
      s: root.children[1] as ColorSaturation
    };
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
      const attr = this.getAttribute('color');
      this.color = attr ? this.colorModel.fromAttr(attr) : this.colorModel.defaultColor;
    }
  }

  attributeChangedCallback(_attr: string, _oldVal: string, newVal: string): void {
    const color = this.colorModel.fromAttr(newVal);
    if (this.color !== color) {
      this.color = color;
    }
  }

  handleEvent(event: CustomEvent): void {
    // Merge the current HSV color object with updated params.
    const hsv = Object.assign({}, this.hsv, event.detail);
    if (!equalColorObjects(hsv, this.hsv)) {
      this._setProps(this.colorModel.fromHsv(hsv), hsv);
    }
  }

  private _setProps(color: C, hsv: HSV): void {
    this.hsv = hsv;
    this[$color] = color;
    this.dispatchEvent(new CustomEvent('color-changed', { detail: { value: color } }));
  }
}
