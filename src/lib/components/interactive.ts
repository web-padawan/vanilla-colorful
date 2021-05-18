import { createRoot } from '../utils/dom.js';
import { clamp } from '../utils/math.js';

export interface Interaction {
  left: number;
  top: number;
}

export interface InteractiveInterface {
  host: HTMLElement;

  setStyles(properties: Record<string, string>): void;
}

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
  target.node.dispatchEvent(
    new CustomEvent('move', {
      bubbles: true,
      detail: target.getMove(interaction, key)
    })
  );
};

const pointerMove = (target: Interactive, event: Event): void => {
  const pointer = isTouch(event) ? event.touches[0] : (event as MouseEvent);
  const rect = target.node.getBoundingClientRect();

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

export abstract class Interactive implements InteractiveInterface {
  pointer!: HTMLElement;

  host!: HTMLElement;

  node!: HTMLElement;

  constructor(host: HTMLElement) {
    const root = createRoot(host, this.getTemplate());

    const pointer = this.getPointer(root);
    this.pointer = pointer;

    const node = this.getNode(root);
    node.addEventListener('mousedown', this);
    node.addEventListener('touchstart', this);
    node.addEventListener('keydown', this);
    node.setAttribute('tabindex', '0');
    this.node = node;
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

  abstract getNode(root: ShadowRoot): HTMLElement;

  abstract getPointer(root: ShadowRoot): HTMLElement;

  abstract getTemplate(): HTMLTemplateElement;

  abstract get xy(): boolean;

  setStyles(properties: Record<string, string>): void {
    for (const p in properties) {
      this.pointer.style.setProperty(p, properties[p]);
    }
  }
}
