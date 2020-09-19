import { createTemplate, createRoot } from '../utils/dom.js';
import styles from '../styles/interactive.js';

export interface Interaction {
  left: number;
  top: number;
}

export interface InteractiveInterface {
  setStyles(properties: Record<string, string>): void;
}

const limit = (number: number) => (number > 1 ? 1 : number < 0 ? 0 : number);

const template = createTemplate(`
<style>${styles}</style>
<div id="interactive"><div part="pointer"></div></div>
`);

let hasTouched = false;

// Check if an event was triggered by touch
const isTouch = (e: MouseEvent | TouchEvent) => window.TouchEvent && e instanceof TouchEvent;

// Prevent mobile browsers from handling mouse events (conflicting with touch ones).
// If we detected a touch interaction before, we prefer reacting to touch events only.
const isValid = (event: MouseEvent | TouchEvent): boolean => {
  if (hasTouched && !isTouch(event)) return false;
  if (!hasTouched) hasTouched = isTouch(event);
  return true;
};

const getRelativePosition = (rect: DOMRect, event: MouseEvent | TouchEvent): Interaction => {
  const pointer = event instanceof MouseEvent ? event : (event as TouchEvent).touches[0];

  return {
    left: limit((pointer.pageX - (rect.left + window.pageXOffset)) / rect.width),
    top: limit((pointer.pageY - (rect.top + window.pageYOffset)) / rect.height)
  };
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
  }

  set dragging(state: boolean) {
    const toggleEvent = state ? document.addEventListener : document.removeEventListener;
    toggleEvent(hasTouched ? 'touchmove' : 'mousemove', this);
    toggleEvent(hasTouched ? 'touchend' : 'mouseup', this);
  }

  handleEvent(event: MouseEvent | TouchEvent): void {
    switch (event.type) {
      case 'mousedown':
      case 'touchstart':
        event.preventDefault();
        // event.button is 0 in mousedown for left button activation
        if (!isValid(event) || (!hasTouched && (event as MouseEvent).button != 0)) return;
        this.onMove(event);
        this.dragging = true;
        break;
      case 'mousemove':
      case 'touchmove':
        event.preventDefault();
        this.onMove(event);
        break;
      case 'mouseup':
      case 'touchend':
        this.dragging = false;
        break;
    }
  }

  abstract getMove(interaction: Interaction): Record<string, number>;

  onMove(event: MouseEvent | TouchEvent): void {
    this.dispatchEvent(
      new CustomEvent('move', {
        bubbles: true,
        detail: this.getMove(getRelativePosition(this.getBoundingClientRect(), event))
      })
    );
  }

  setStyles(properties: Record<string, string>): void {
    for (const p in properties) {
      this.pointer.setProperty(p, properties[p]);
    }
  }
}
