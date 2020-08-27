import { interactiveStyles, pointerStyles } from '../styles.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructor<T = unknown> = new (...args: any[]) => T;

export interface PointerInterface {
  pointer: HTMLElement;
  setProperties(properties: Record<string, string>): void;
}

export const PointerMixin = <T extends Constructor<HTMLElement>>(
  base: T,
  styles: string
): T & Constructor<PointerInterface> => {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>${styles}${interactiveStyles}${pointerStyles}</style>
    <div id="interactive"><div id="pointer" part="pointer"></div></div>
  `;

  class Pointer extends base {
    pointer!: HTMLElement;

    constructor(...args: any[]) {
      super(...args);
      const root = this.attachShadow({ mode: 'open' });
      root.appendChild(template.content.cloneNode(true));
      this.pointer = root.getElementById('pointer') as HTMLElement;
    }

    setProperties(properties: Record<keyof CSSStyleDeclaration, string>): void {
      for (const p in properties) {
        this.pointer.style[p] = properties[p];
      }
    }
  }

  return Pointer;
};
