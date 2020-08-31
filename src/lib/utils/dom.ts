export const createTemplate = (tpl: string): HTMLTemplateElement => {
  const template = document.createElement('template');
  template.innerHTML = tpl;
  return template;
};

export const createRoot = <T extends HTMLElement>(
  node: T,
  tpl: HTMLTemplateElement
): ShadowRoot => {
  const root = node.shadowRoot || node.attachShadow({ mode: 'open' });
  root.appendChild(tpl.content.cloneNode(true));
  return root;
};
