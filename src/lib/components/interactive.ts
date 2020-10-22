import { createTemplate, createRoot } from '../utils/dom.js';
import { clamp } from '../utils/math.js';
import styles from '../styles/interactive.js';

export interface Interaction {
  left: number;
  top: number;
}

export interface InteractiveInterface {
  setStyles(properties: Record<string, string>): void;
}

const template = createTemplate(
  `<style>${styles}</style><div id="interactive"><div part="pointer"></div></div>`
);

let hasTouched = false;

// Check if an event was triggered by touch
const isTouch = (e: Event): e is TouchEvent => 'touches' in e;

// Prevent mobile browsers from handling mouse events (conflicting with touch ones).
// If we detected a touch interaction before, we prefer reacting to touch events only.
const isValid = (event: Event): boolean => {
  if (hasTouched && !isTouch(event)) return false;
  if (!hasTouched) hasTouched = isTouch(event);
  return true;
};

const fireMove = (target: Interactive, interaction: Interaction, key?: boolean): void => {
  target.dispatchEvent(
    new CustomEvent('move', {
      bubbles: true,
      detail: target.getMove(interaction, key)
    })
  );
};

const pointerMove = (target: Interactive, event: Event): void => {
  const pointer = isTouch(event) ? event.touches[0] : (event as MouseEvent);
  const rect = target.getBoundingClientRect();

  fireMove(target, {
    left: clamp((pointer.pageX - (rect.left + window.pageXOffset)) / rect.width),
    top: clamp((pointer.pageY - (rect.top + window.pageYOffset)) / rect.height)
  });
};

const keyMove = (target: Interactive, event: KeyboardEvent): void => {
  // We use `keyCode` instead of `key` to reduce the size of the library.
  const keyCode = event.keyCode;
  // Ignore all keys except arrow ones, Page Up, Page Down, Home and End.
  if (keyCode > 40 || (target.xy && keyCode < 37) || keyCode < 33) return;
  // Do not scroll page by keys when color picker element has focus.
  event.preventDefault();
  // Send relative offset to the parent component.
  fireMove(
    target,
    {
      left:
        keyCode === 39 // Arrow Right
          ? 0.01
          : keyCode === 37 // Arrow Left
          ? -0.01
          : keyCode === 34 // Page Down
          ? 0.05
          : keyCode === 33 // Page Up
          ? -0.05
          : keyCode === 35 // End
          ? 1
          : keyCode === 36 // Home
          ? -1
          : 0,
      top:
        keyCode === 40 // Arrow down
          ? 0.01
          : keyCode === 38 // Arrow Up
          ? -0.01
          : 0
    },
    true
  );
};

export abstract class Interactive extends HTMLElement implements InteractiveInterface {
  pointer!: CSSStyleDeclaration;

  constructor() {
    super();
    this.pointer = (createRoot(this, template).querySelector(
      '[part=pointer]'
    ) as HTMLElement).style;
    this.addEventListener('mousedown', this);
    this.addEventListener('touchstart', this);
    this.addEventListener('keydown', this);
    this.setAttribute('role', 'slider');
    this.setAttribute('tabindex', '0');
  }

  set dragging(state: boolean) {
    const toggleEvent = state ? document.addEventListener : document.removeEventListener;
    toggleEvent(hasTouched ? 'touchmove' : 'mousemove', this);
    toggleEvent(hasTouched ? 'touchend' : 'mouseup', this);
  }

  handleEvent(event: Event): void {
    switch (event.type) {
      case 'mousedown':
      case 'touchstart':
        event.preventDefault();
        // event.button is 0 in mousedown for left button activation
        if (!isValid(event) || (!hasTouched && (event as MouseEvent).button != 0)) return;
        pointerMove(this, event);
        this.dragging = true;
        break;
      case 'mousemove':
      case 'touchmove':
        event.preventDefault();
        pointerMove(this, event);
        break;
      case 'mouseup':
      case 'touchend':
        this.dragging = false;
        break;
      case 'keydown':
        keyMove(this, event as KeyboardEvent);
        break;
    }
  }

  abstract getMove(interaction: Interaction, key?: boolean): Record<string, number>;

  abstract get xy(): boolean;

  setStyles(properties: Record<string, string>): void {
    for (const p in properties) {
      this.pointer.setProperty(p, properties[p]);
    }
  }
}
