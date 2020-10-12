import { validHex } from '../utils/validate.js';
import { createTemplate, createRoot } from '../utils/dom.js';

const template = createTemplate('<slot><input part="input" spellcheck="false"></slot>');

// Escapes all non-hexadecimal characters including "#"
const escape = (hex: string) => hex.replace(/([^0-9A-F]+)/gi, '').substr(0, 6);

export class HexInputBase extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color'];
  }

  private _color!: string;

  private _oldColor!: string;

  private _input!: HTMLInputElement;

  get color(): string {
    return this._color;
  }

  set color(hex: string) {
    this._color = hex;
    this._setValue(hex);
  }

  connectedCallback(): void {
    const slot = createRoot(this, template).firstElementChild as HTMLSlotElement;
    const setInput = () => {
      let input = this.querySelector('input');
      if (!input) {
        // remove all child node if no input found
        let c;
        while ((c = this.firstChild)) {
          this.removeChild(c);
        }
        input = slot.firstChild as HTMLInputElement;
      }
      input.addEventListener('input', this);
      input.addEventListener('blur', this);
      this._input = input;
    };
    slot.addEventListener('slotchange', setInput);
    setInput();

    // A user may set a property on an _instance_ of an element,
    // before its prototype has been connected to this class.
    // If so, we need to run it through the proper class setter.
    if (this.hasOwnProperty('color')) {
      const value = this.color;
      delete this['color' as keyof this];
      this.color = value;
    } else if (this.color == null) {
      this.color = this.getAttribute('color') || '';
    } else if (this._color) {
      this._setValue(this._color);
    }
  }

  handleEvent(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    switch (event.type) {
      case 'input':
        const hex = escape(value);
        this._oldColor = this.color;
        if (validHex(hex)) {
          this.color = hex;
          this.dispatchEvent(new CustomEvent('color-changed', { detail: { value: '#' + hex } }));
        }
        break;
      case 'blur':
        if (!validHex(value)) {
          this.color = this._oldColor;
        }
    }
  }

  attributeChangedCallback(_attr: string, _oldVal: string, newVal: string): void {
    if (this.color !== newVal) {
      this.color = newVal;
    }
  }

  private _setValue(hex: string): void {
    if (this._input) {
      this._input.value = hex == null || hex == '' ? '' : escape(hex);
    }
  }
}
