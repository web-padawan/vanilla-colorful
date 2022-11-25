const cache: Record<string, HTMLTemplateElement> = {};

export const render = (root: ShadowRoot, html: string): void => {
  let template = cache[html];
  if (!template) {
    template = document.createElement('template');
    template.innerHTML = html;
    cache[html] = template;
  }
  root.appendChild(template.content.cloneNode(true));
};

export const fire = (target: HTMLElement, type: string, detail: Record<string, unknown>): void => {
  target.dispatchEvent(
    new CustomEvent(type, {
      bubbles: true,
      detail
    })
  );
};
