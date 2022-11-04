import type { ColorPickerEventListener, ColorPickerEventMap } from '../types';
import { validHex } from '../utils/validate.js';
import { tpl } from '../utils/dom.js';

const template = tpl('<slot><input part="input" spellcheck="false"></slot>');

// Escapes all non-hexadecimal characters including "#"
const escape = (hex: string, alpha: boolean) =>
  hex.replace(/([^0-9A-F]+)/gi, '').substring(0, alpha ? 8 : 6);

const $alpha = Symbol('alpha');
const $color = Symbol('color');
const $saved = Symbol('saved');
const $input = Symbol('saved');
const $update = Symbol('update');

export interface HexInputBase {
  addEventListener<T extends keyof ColorPickerEventMap<string>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<string>[T]>,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<T extends keyof ColorPickerEventMap<string>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<string>[T]>,
    options?: boolean | EventListenerOptions
  ): void;
}

export class HexInputBase extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['alpha', 'color'];
  }

  private declare [$color]: string;

  private declare [$alpha]: boolean;

  private declare [$saved]: string;

  private declare [$input]: HTMLInputElement;

  get color(): string {
    return this[$color];
  }

  set color(hex: string) {
    this[$color] = hex;
    this[$update](hex);
  }

  get alpha(): boolean {
    return this[$alpha];
  }

  set alpha(alpha: boolean) {
    this[$alpha] = alpha;
    this.toggleAttribute('alpha', alpha);

    // When alpha set to false, update color
    const color = this.color;
    if (color && !validHex(color, alpha)) {
      this.color = color.startsWith('#')
        ? color.substring(0, color.length === 5 ? 4 : 7)
        : color.substring(0, color.length === 4 ? 3 : 6);
    }
  }

  connectedCallback(): void {
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    const slot = root.firstElementChild as HTMLSlotElement;
    const setInput = () => {
      let input = this.querySelector('input');
      if (!input) {
        // remove all child node if no input found
        let c;
        while ((c = this.firstChild)) {
          c.remove();
        }
        input = slot.firstChild as HTMLInputElement;
      }
      input.addEventListener('input', this);
      input.addEventListener('blur', this);
      this[$input] = input;
    };
    slot.addEventListener('slotchange', setInput);
    setInput();

    // A user may set a property on an _instance_ of an element,
    // before its prototype has been connected to this class.
    // If so, we need to run it through the proper class setter.
    if (this.hasOwnProperty('alpha')) {
      const value = this.alpha;
      delete this['alpha' as keyof this];
      this.alpha = value;
    } else {
      this.alpha = this.hasAttribute('alpha');
    }

    if (this.hasOwnProperty('color')) {
      const value = this.color;
      delete this['color' as keyof this];
      this.color = value;
    } else if (this.color == null) {
      this.color = this.getAttribute('color') || '';
    } else if (this[$color]) {
      this[$update](this[$color]);
    }
  }

  handleEvent(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    switch (event.type) {
      case 'input':
        const hex = escape(value, this.alpha);
        this[$saved] = this.color;
        if (validHex(hex, this.alpha) || value === '') {
          this.color = hex;
          this.dispatchEvent(
            new CustomEvent('color-changed', {
              bubbles: true,
              detail: { value: hex ? '#' + hex : '' }
            })
          );
        }
        break;
      case 'blur':
        if (value && !validHex(value, this.alpha)) {
          this.color = this[$saved];
        }
    }
  }

  attributeChangedCallback(attr: string, _oldVal: string, newVal: string): void {
    if (attr === 'color' && this.color !== newVal) {
      this.color = newVal;
    }

    if (attr === 'alpha') {
      const hasAlpha = newVal != null;
      if (this.alpha !== hasAlpha) {
        this.alpha = hasAlpha;
      }
    }
  }

  private [$update](hex: string): void {
    if (this[$input]) {
      this[$input].value = hex == null || hex == '' ? '' : escape(hex, this.alpha);
    }
  }
}
