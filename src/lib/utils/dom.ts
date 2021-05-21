const cache: Record<string, HTMLTemplateElement> = {};

export const createTemplate = (tpl: string): HTMLTemplateElement => {
  let template = cache[tpl];
  if (!template) {
    template = document.createElement('template');
    template.innerHTML = tpl;
    cache[tpl] = template;
  }
  return template;
};
