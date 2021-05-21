import type { HsvaColor } from '../types.js';
import { createTemplate } from '../utils/dom.js';
import { clamp } from '../utils/math.js';

export interface Interaction {
  left: number;
  top: number;
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

const fireMove = (target: Slider, interaction: Interaction, key?: boolean): void => {
  target.el.dispatchEvent(
    new CustomEvent('move', {
      bubbles: true,
      detail: target.getMove(interaction, key)
    })
  );
};

const pointerMove = (target: Slider, event: Event): void => {
  const pointer = isTouch(event) ? event.touches[0] : (event as MouseEvent);
  const rect = target.el.getBoundingClientRect();

  fireMove(target, {
    left: clamp((pointer.pageX - (rect.left + window.pageXOffset)) / rect.width),
    top: clamp((pointer.pageY - (rect.top + window.pageYOffset)) / rect.height)
  });
};

const keyMove = (target: Slider, event: KeyboardEvent): void => {
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

export abstract class Slider {
  nodes!: HTMLElement[];

  el!: HTMLElement;

  xy!: boolean;

  constructor(root: ShadowRoot, template: string, part: string, xy: boolean) {
    root.appendChild(createTemplate(template).content.cloneNode(true));

    const el = root.querySelector(`[part=${part}]`) as HTMLElement;
    el.addEventListener('mousedown', this);
    el.addEventListener('touchstart', this);
    el.addEventListener('keydown', this);
    el.setAttribute('tabindex', '0');
    this.el = el;

    this.xy = xy;
    this.nodes = [root.querySelector(`[part=${part}-pointer]`) as HTMLElement];
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

  abstract update(hsva: HsvaColor): void;

  style(styles: Array<Record<string, string>>): void {
    styles.forEach((style, i) => {
      Object.assign(this.nodes[i].style, style);
    });
  }
}
