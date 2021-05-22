const cache: Record<string, HTMLTemplateElement> = {};

export const tpl = (html: string): HTMLTemplateElement => {
  let template = cache[html];
  if (!template) {
    template = document.createElement('template');
    template.innerHTML = html;
    cache[html] = template;
  }
  return template;
};

export const fire = (target: HTMLElement, type: string, detail: Record<string, unknown>): void => {
  target.dispatchEvent(
    new CustomEvent(type, {
      bubbles: true,
      detail
    })
  );
};
