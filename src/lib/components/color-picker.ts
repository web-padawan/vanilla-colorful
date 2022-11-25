import { equalColorObjects } from '../utils/compare.js';
import { fire, render } from '../utils/dom.js';
import type { AnyColor, ColorModel, HsvaColor } from '../types';
import { Hue } from './hue.js';
import { Saturation } from './saturation.js';
import type { Slider } from './slider.js';
import css from '../styles/color-picker.js';
import hueCss from '../styles/hue.js';
import saturationCss from '../styles/saturation.js';

const $isSame = Symbol('same');
const $color = Symbol('color');
const $hsva = Symbol('hsva');
const $update = Symbol('update');
const $parts = Symbol('parts');

export const $css = Symbol('css');
export const $sliders = Symbol('sliders');

export type Sliders = Array<new (root: ShadowRoot) => Slider>;

export abstract class ColorPicker<C extends AnyColor> extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color'];
  }

  protected get [$css](): string[] {
    return [css, hueCss, saturationCss];
  }

  protected get [$sliders](): Sliders {
    return [Saturation, Hue];
  }

  protected abstract get colorModel(): ColorModel<C>;

  private declare [$hsva]: HsvaColor;

  private declare [$color]: C;

  private declare [$parts]: Slider[];

  get color(): C {
    return this[$color];
  }

  set color(newColor: C) {
    if (!this[$isSame](newColor)) {
      const newHsva = this.colorModel.toHsva(newColor);
      this[$update](newHsva);
      this[$color] = newColor;
    }
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    render(root, `<style>${this[$css].join('')}</style>`);
    root.addEventListener('move', this);
    this[$parts] = this[$sliders].map((slider) => new slider(root));
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
    if (!this[$isSame](color)) {
      this.color = color;
    }
  }

  handleEvent(event: CustomEvent): void {
    // Merge the current HSV color object with updated params.
    const oldHsva = this[$hsva];
    const newHsva = { ...oldHsva, ...event.detail };
    this[$update](newHsva);
    let newColor;
    if (
      !equalColorObjects(newHsva, oldHsva) &&
      !this[$isSame]((newColor = this.colorModel.fromHsva(newHsva)))
    ) {
      this[$color] = newColor;
      fire(this, 'color-changed', { value: newColor });
    }
  }

  private [$isSame](color: C): boolean {
    return this.color && this.colorModel.equal(color, this.color);
  }

  private [$update](hsva: HsvaColor): void {
    this[$hsva] = hsva;
    this[$parts].forEach((part) => part.update(hsva));
  }
}
