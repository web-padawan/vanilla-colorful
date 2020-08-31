import { validHex } from './lib/utils/validate.js';

// Escapes all non-hexadecimal characters including "#"
const escape = (hex: string) => hex.replace(/([^0-9A-F]+)/gi, '');

/**
 * A color picker custom element that uses HEX format.
 *
 * @element hex-input
 *
 * @prop {string} color - Color in HEX format.
 * @attr {string} color - Color in HEX format.
 *
 * @fires color-changed - Event fired when color is changed.
 *
 * @csspart input - An underlying input element.
 */
export class HexInput extends HTMLElement {
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
    this._input.value = hex == null || hex == '' ? '' : escape(hex);
  }

  constructor() {
    super();
    const input = document.createElement('input');
    input.setAttribute('part', 'input');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('maxlength', '6');
    this.attachShadow({ mode: 'open' }).appendChild(input);
    input.addEventListener('input', this);
    input.addEventListener('blur', this);
    this._input = input;
  }

  connectedCallback(): void {
    // A user may set a property on an _instance_ of an element,
    // before its prototype has been connected to this class.
    // If so, we need to run it through the proper class setter.
    if (this.hasOwnProperty('color')) {
      const value = this.color;
      delete this['color' as keyof this];
      this.color = value;
    } else if (this.color == null) {
      this.color = this.getAttribute('color') || '';
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
}

customElements.define('hex-input', HexInput);

declare global {
  interface HTMLElementTagNameMap {
    'hex-input': HexInput;
  }
}
