export interface Interaction {
  left: number;
  top: number;
}

const limit = (number: number) => (number > 1 ? 1 : number < 0 ? 0 : number);

const getRelativePosition = (
  container: HTMLElement,
  event: MouseEvent | TouchEvent
): Interaction => {
  const rect = container.getBoundingClientRect();
  const pointer = event instanceof MouseEvent ? event : (event as TouchEvent).touches[0];

  return {
    left: limit((pointer.pageX - (rect.left + window.pageXOffset)) / rect.width),
    top: limit((pointer.pageY - (rect.top + window.pageYOffset)) / rect.height)
  };
};

export class Interactive extends HTMLElement {
  set dragging(state: boolean) {
    const toggleEvent = state ? document.addEventListener : document.removeEventListener;
    toggleEvent('mousemove', this);
    toggleEvent('touchmove', this);
    toggleEvent('mouseup', this);
    toggleEvent('touchend', this);
  }

  connectedCallback(): void {
    this.addEventListener('mousedown', this);
    this.addEventListener('touchstart', this);
  }

  handleEvent(event: MouseEvent | TouchEvent): void {
    switch (event.type) {
      case 'mousedown':
      case 'touchstart':
        // event.button is 0 in mousedown for left button activation
        if (event instanceof MouseEvent && event.button !== 0) {
          return;
        }
        this.onMove(getRelativePosition(this, event));
        this.dragging = true;
        break;
      case 'mousemove':
      case 'touchmove':
        event.preventDefault();
        this.onMove(getRelativePosition(this, event));
        break;
      case 'mouseup':
      case 'touchend':
        this.dragging = false;
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMove(_interaction: Interaction): void {
    // override
  }
}
