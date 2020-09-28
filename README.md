<div align="center">
  <a href="https://web-padawan.github.io/vanilla-colorful/">
    <img src="https://raw.githubusercontent.com/web-padawan/vanilla-colorful/master/screenshot.png" width="220" height="220" alt="Screenshot of the color picker">
  </a>
</div>

<div align="center">
  <a href="https://npmjs.org/package/vanilla-colorful">
    <img alt="npm" src="https://img.shields.io/npm/v/vanilla-colorful.svg" />
  </a>
  <a href="https://travis-ci.org/web-padawan/vanilla-colorful">
    <img alt="build" src="https://travis-ci.org/web-padawan/vanilla-colorful.svg?branch=master" />
  </a>
  <a href="https://bundlephobia.com/result?p=vanilla-colorful">
    <img alt="gzip size" src="https://badgen.net/bundlephobia/minzip/vanilla-colorful" />
  </a>
</div>

<div align="center">
  <strong>vanilla-colorful</strong> is a port of <a href="https://github.com/omgovich/react-colorful">react-colorful</a> to vanilla Custom Elements.
</div>

## Features

- **Small**: Just 2,7 KB (minified and gzipped). [Size Limit](https://github.com/ai/size-limit) controls the size.
- **Fast**: Built with standards based Custom Elements.
- **Bulletproof**: Written in strict TypeScript and covered by 100+ tests.
- **Simple**: The interface is straight forward and easy to use.
- **Accessible**: Follows the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) guidelines to support users of assistive technologies.
- **Mobile-friendly**: Works well on mobile devices and touch screens.
- **Framework-agnostic**: Can be used [with any framework](https://custom-elements-everywhere.com/).
- **No dependencies**

## Live demo

- [Website](https://web-padawan.github.io/vanilla-colorful/)
- [Angular example](https://components.studio/edit/MGLIUt626MIwrLZ1c2E8)
- [LitElement example](https://components.studio/edit/5F8uPtFM41MCEQBsDbIF)
- [React example](https://components.studio/edit/dXQXpT6ggwihpoxPqioI)
- [Svelte example](https://components.studio/edit/CpWY9ofL287dfvJaQJIA)
- [Vue example](https://components.studio/edit/xACXVNs47cgdWFSafS70)

## Install

```
npm install vanilla-colorful --save
```

Or use one of the following content delivery networks:

[unpkg.com CDN](https://unpkg.com/vanilla-colorful?module):

```html
<script type="module" src="https://unpkg.com/vanilla-colorful?module"></script>
```

[Skypack CDN](https://cdn.skypack.dev/vanilla-colorful):

```html
<script type="module" src="https://cdn.skypack.dev/vanilla-colorful"></script>
```

## Usage

```html
<hex-color-picker color="#1e88e5"></hex-color-picker>
<script type="module">
  import 'vanilla-colorful';

  const picker = document.querySelector('hex-color-picker');
  picker.addEventListener('color-changed', (event) => {
    // get updated color value
    const newColor = event.detail.value;
  });

  // get current color value
  console.log(picker.color);
</script>
```

## ES modules

**vanilla-colorful** is authored using ES modules which are [natively supported](https://caniuse.com/es6-module)
by modern browsers. However, it also uses "bare module imports" which are [not yet standardized](https://github.com/WICG/import-maps)
and require a small transform.

We recommend the following tools for the ES modules based development:

- [`@web/dev-server`](https://modern-web.dev/docs/dev-server/overview/) resolves bare module imports on the fly.
- [`snowpack`](https://www.snowpack.dev) performs one-time transform when installing dependencies.
- [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve) is needed when using Rollup.

None of these tools are needed when importing the component from CDN.

## Supported color models

The default **vanilla-colorful**'s input/output format is a HEX string (like `#ffffff`). In case if
you need another color model, we provide 12 additional color picker bundles.

<details>
  <summary>How to use another color model</summary>

#### Available pickers

| File to import                  | HTML element                 | Value example                      |
| ------------------------------- | ---------------------------- | ---------------------------------- |
| `"hex-color-picker.js"`         | `<hex-color-picker>`         | `"#ffffff"`                        |
| `"hsl-color-picker.js"`         | `<hsl-color-picker>`         | `{ h: 0, s: 0, l: 100 }`           |
| `"hsl-string-color-picker.js"`  | `<hsl-string-color-picker>`  | `"hsl(0, 0%, 100%)"`               |
| `"hsla-color-picker.js"`        | `<hsla-color-picker>`        | `{ h: 0, s: 0, l: 100, a: 1 }`     |
| `"hsla-string-color-picker.js"` | `<hsla-string-color-picker>` | `"hsla(0, 0%, 100%, 1)"`           |
| `"hsv-color-picker.js"`         | `<hsv-color-picker>`         | `{ h: 0, s: 0, v: 100 }`           |
| `"hsv-string-color-picker.js"`  | `<hsv-string-color-picker>`  | `"hsv(0, 0%, 100%)"`               |
| `"hsva-color-picker.js"`        | `<hsva-color-picker>`        | `{ h: 0, s: 0, v: 100, a: 1 }`     |
| `"hsva-string-color-picker.js"` | `<hsva-string-color-picker>` | `"hsva(0, 0%, 100%, 1)"`           |
| `"rgb-color-picker.js"`         | `<rgb-color-picker>`         | `{ r: 255, g: 255, b: 255 }`       |
| `"rgba-color-picker.js"`        | `<rgba-color-picker>`        | `{ r: 255, g: 255, b: 255, a: 1 }` |
| `"rgb-string-color-picker.js"`  | `<rgb-string-color-picker>`  | `"rgb(255, 255, 255)"`             |
| `"rgba-string-color-picker.js"` | `<rgba-string-color-picker>` | `"rgba(255, 255, 255, 1)"`         |

#### Code example

```html
<rgba-color-picker></rgba-color-picker>
<script type="module">
  import 'vanilla-colorful/rgba-color-picker.js';

  const picker = document.querySelector('rgba-color-picker');
  picker.color = { r: 50, g: 100, b: 150, a: 1 };
</script>
```

</details>

## Overriding styles

**vanilla-colorful** exposes [CSS Shadow Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
allowing to override the default styles:

```css
hex-color-picker {
  height: 250px;
}

hex-color-picker::part(saturation) {
  bottom: 30px;
  border-radius: 3px 3px 0 0;
}

hex-color-picker::part(hue) {
  height: 30px;
  border-radius: 0 0 3px 3px;
}

hex-color-picker::part(saturation-pointer) {
  border-radius: 5px;
}

hex-color-picker::part(hue-pointer) {
  border-radius: 2px;
  width: 15px;
  height: inherit;
}
```

## HEX input

**vanilla-colorful** provides an additional `<hex-input>` element that can be used to type a color:

```html
<hex-input color="#1e88e5"></hex-input>
<script type="module">
  import 'vanilla-colorful/hex-input.js';

  const input = document.querySelector('hex-input');
  input.addEventListener('color-changed', (event) => {
    const newColor = event.detail.value;
  });
</script>
```

`<hex-input>` does not use Shadow DOM and renders an `input` element without any custom styles. You
can also provide a custom `input` element as a child if you want to configure it.

## Base classes

**vanilla-colorful** provides a set of base classes that can be imported without registering custom
elements. This is useful if you want to create your own color picker with a different tag name.

```js
import { RgbBase } from 'vanilla-colorful/lib/entrypoints/rgb.js';

customElements.define('custom-color-picker', class extends RgbBase {});
```

## TypeScript support

**vanilla-colorful** supports TypeScript and ships with types in the library itself; no need for any other install.

<details>
  <summary>How you can get the most from our TypeScript support</summary><br />

While not only typing its own class methods and variables, it can also help you type yours. Depending on
the element you are using, you can also import the type that is associated with the element.
For example, if you are using our `<hsl-color-picker>` element, you can also import the `HslColor` type.

```ts
import type { HslColor } from 'vanilla-colorful/hsl-color-picker';

const myHslValue: HslColor = { h: 0, s: 0, l: 0 };
```

All the included custom elements are compatible with [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) and
[lit-plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin) extension for Visual
Studio Code, so you can benefit from type checking in lit-html templates.

</details>

## Browser support

**vanilla-colorful** uses [Custom Elements](https://caniuse.com/#feat=custom-elementsv1) and [Shadow DOM](https://caniuse.com/#feat=shadowdomv1),
and does not support IE11 or legacy Edge.

## Why vanilla-colorful?

**vanilla-colorful** has all the benefits of [react-colorful](https://github.com/omgovich/react-colorful#why-react-colorful)
with one important difference.

While `react-colorful` claims to have zero dependencies, it still expects you to use React or [Preact](https://github.com/omgovich/react-colorful#usage-with-preact).
This means that Angular, Vue, Svelte or vanilla JS users would have an **extra** dependency in their apps.

Now when all the evergreen browsers support standards based [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements),
it's perfect time to build such tiny and lightweight UI controls as web components rather than framework components.
