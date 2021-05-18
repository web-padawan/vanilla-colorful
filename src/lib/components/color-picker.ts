import { equalColorObjects } from '../utils/compare.js';
import { createTemplate, createRoot } from '../utils/dom.js';
import type { AnyColor, ColorModel, HsvaColor } from '../types';
import { Hue } from './hue.js';
import { Saturation } from './saturation.js';
import './hue.js';
import './saturation.js';
import styles from '../styles/color-picker.js';
import interactiveStyles from '../styles/interactive.js';

const template = createTemplate(`<style>${styles}${interactiveStyles}</style>`);

const $h = Symbol('h');
const $s = Symbol('s');
const $isSame = Symbol('same');
const $color = Symbol('color');
const $hsva = Symbol('hsva');
const $change = Symbol('change');

export const $render = Symbol('render');

export abstract class ColorPicker<C extends AnyColor> extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color'];
  }

  protected abstract get colorModel(): ColorModel<C>;

  private [$h]!: Hue;

  private [$s]!: Saturation;

  private [$hsva]!: HsvaColor;

  private [$color]!: C;

  get color(): C {
    return this[$color];
  }

  set color(newColor: C) {
    if (!this[$isSame](newColor)) {
      const newHsva = this.colorModel.toHsva(newColor);
      this[$render](newHsva);
      this[$change](newColor, newHsva);
    }
  }

  constructor() {
    super();
    const root = createRoot(this, template);
    root.addEventListener('move', this);
    this[$s] = new Saturation(this);
    this[$h] = new Hue(this);
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
    const newHsva = Object.assign({}, this[$hsva], event.detail);
    this[$render](newHsva);
    let newColor;
    if (
      !equalColorObjects(newHsva, this[$hsva]) &&
      !this[$isSame]((newColor = this.colorModel.fromHsva(newHsva)))
    ) {
      this[$change](newColor, newHsva);
    }
  }

  private [$isSame](color: C): boolean {
    return this.color && this.colorModel.equal(color, this.color);
  }

  protected [$render](hsva: HsvaColor): void {
    this[$s].hsva = hsva;
    this[$h].hue = hsva.h;
  }

  private [$change](color: C, hsva: HsvaColor): void {
    this[$color] = color;
    this[$hsva] = hsva;
    this.dispatchEvent(
      new CustomEvent('color-changed', { bubbles: true, detail: { value: color } })
    );
  }
}
