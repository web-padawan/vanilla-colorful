import { expect } from 'chai';
import { sendKeys } from '@web/test-runner-commands';
import { fixture, html } from '@open-wc/testing-helpers';
import type { RgbaColorPicker } from '../rgba-color-picker';
import '../rgba-color-picker.js';

describe('accessibility', () => {
  let picker: RgbaColorPicker;

  beforeEach(async () => {
    picker = await fixture(html`<rgba-color-picker></rgba-color-picker>`);
    picker.color = { r: 30, g: 136, b: 230, a: 1 };
  });

  describe('saturation', () => {
    let element: HTMLElement;

    beforeEach(() => {
      const root = picker.shadowRoot as ShadowRoot;
      element = root.querySelector('[part="saturation"]') as HTMLElement;
    });

    describe('WAI-ARIA', () => {
      it('should set role attribute to slider', () => {
        expect(element.getAttribute('role')).to.equal('slider');
      });

      it('should set tabindex attribute to 0', () => {
        expect(element.getAttribute('tabindex')).to.equal('0');
      });

      it('should set aria-label attribute', () => {
        expect(element.getAttribute('aria-label')).to.equal('Color');
      });

      it('should set aria-valuetext attribute', () => {
        expect(element.getAttribute('aria-valuetext')).to.equal('Saturation 87%, Brightness 90%');
      });

      it('should update aria-valuetext on color change', () => {
        picker.color = { r: 60, g: 95, b: 138, a: 1 };
        expect(element.getAttribute('aria-valuetext')).to.equal('Saturation 57%, Brightness 54%');
      });
    });

    describe('keyboard navigation', () => {
      const color = { r: 30, g: 136, b: 230, a: 1 };

      beforeEach(() => {
        picker.color = color;
        element.focus();
      });

      it('should update color on ArrowLeft key', async () => {
        await sendKeys({ press: 'ArrowLeft' });
        expect(picker.color).to.deep.equal({ ...color, r: 32, g: 137 });
      });

      it('should update color on ArrowRight key', async () => {
        await sendKeys({ press: 'ArrowRight' });
        expect(picker.color).to.deep.equal({ ...color, r: 28, g: 135 });
      });

      it('should update color on ArrowDown key', async () => {
        await sendKeys({ press: 'ArrowDown' });
        expect(picker.color).to.deep.equal({ ...color, g: 135, b: 227 });
      });

      it('should update color on ArrowUp key', async () => {
        await sendKeys({ press: 'ArrowUp' });
        expect(picker.color).to.deep.equal({ ...color, g: 138, b: 232 });
      });

      it('should not update color on PageUp key', async () => {
        await sendKeys({ press: 'PageUp' });
        expect(picker.color).to.deep.equal(color);
      });

      it('should not update color on PageDown key', async () => {
        await sendKeys({ press: 'PageDown' });
        expect(picker.color).to.deep.equal(color);
      });

      it('should not update color on Home key', async () => {
        await sendKeys({ press: 'Home' });
        expect(picker.color).to.deep.equal(color);
      });

      it('should not update color on End key', async () => {
        await sendKeys({ press: 'End' });
        expect(picker.color).to.deep.equal(color);
      });
    });
  });

  describe('hue', () => {
    let element: HTMLElement;

    beforeEach(() => {
      const root = picker.shadowRoot as ShadowRoot;
      element = root.querySelector('[part="hue"]') as HTMLElement;
    });

    describe('WAI-ARIA', () => {
      it('should set role attribute to slider', () => {
        expect(element.getAttribute('role')).to.equal('slider');
      });

      it('should set tabindex attribute to 0', () => {
        expect(element.getAttribute('tabindex')).to.equal('0');
      });

      it('should set aria-label attribute', () => {
        expect(element.getAttribute('aria-label')).to.equal('Hue');
      });

      it('should set aria-valuemin attribute', () => {
        expect(element.getAttribute('aria-valuemin')).to.equal('0');
      });

      it('should set aria-valuemax attribute', () => {
        expect(element.getAttribute('aria-valuemax')).to.equal('360');
      });

      it('should set aria-valuenow attribute', () => {
        expect(element.getAttribute('aria-valuenow')).to.equal('208');
      });

      it('should update aria-valuenow on color change', () => {
        picker.color = { r: 196, g: 154, b: 64, a: 1 };
        expect(element.getAttribute('aria-valuenow')).to.equal('41');
      });
    });

    describe('keyboard navigation', () => {
      const color = { r: 30, g: 136, b: 230, a: 1 };

      beforeEach(() => {
        picker.color = color;
        element.focus();
      });

      it('should update color on ArrowLeft key', async () => {
        await sendKeys({ press: 'ArrowLeft' });
        expect(picker.color).to.deep.equal({ ...color, g: 148 });
      });

      it('should update color on ArrowRight key', async () => {
        await sendKeys({ press: 'ArrowRight' });
        expect(picker.color).to.deep.equal({ ...color, g: 124 });
      });

      it('should not update color on ArrowDown key', async () => {
        await sendKeys({ press: 'ArrowDown' });
        expect(picker.color).to.deep.equal(color);
      });

      it('should not update color on ArrowUp key', async () => {
        await sendKeys({ press: 'ArrowUp' });
        expect(picker.color).to.deep.equal(color);
      });

      it('should update color on PageUp key', async () => {
        await sendKeys({ press: 'PageUp' });
        expect(picker.color).to.deep.equal({ ...color, g: 196 });
      });

      it('should update color on PageDown key', async () => {
        await sendKeys({ press: 'PageDown' });
        expect(picker.color).to.deep.equal({ ...color, g: 76 });
      });

      it('should update color on Home key', async () => {
        await sendKeys({ press: 'Home' });
        expect(picker.color).to.deep.equal({ r: 230, g: 30, b: 30, a: 1 });
      });

      it('should update color on End key', async () => {
        await sendKeys({ press: 'End' });
        expect(picker.color).to.deep.equal({ r: 230, g: 30, b: 30, a: 1 });
      });
    });
  });

  describe('alpha', () => {
    let element: HTMLElement;

    beforeEach(() => {
      const root = picker.shadowRoot as ShadowRoot;
      element = root.querySelector('[part="alpha"]') as HTMLElement;
    });

    describe('WAI-ARIA', () => {
      it('should set role attribute to slider', () => {
        expect(element.getAttribute('role')).to.equal('slider');
      });

      it('should set tabindex attribute to 0', () => {
        expect(element.getAttribute('tabindex')).to.equal('0');
      });

      it('should set aria-label attribute', () => {
        expect(element.getAttribute('aria-label')).to.equal('Alpha');
      });

      it('should set aria-valuemin attribute', () => {
        expect(element.getAttribute('aria-valuemin')).to.equal('0');
      });

      it('should set aria-valuemax attribute', () => {
        expect(element.getAttribute('aria-valuemax')).to.equal('1');
      });
    });

    describe('keyboard navigation', () => {
      const color = { r: 30, g: 136, b: 230, a: 0.5 };

      beforeEach(() => {
        picker.color = color;
        element.focus();
      });

      it('should update color on ArrowLeft key', async () => {
        await sendKeys({ press: 'ArrowLeft' });
        expect(picker.color).to.deep.equal({ ...color, a: 0.49 });
      });

      it('should update color on ArrowRight key', async () => {
        await sendKeys({ press: 'ArrowRight' });
        expect(picker.color).to.deep.equal({ ...color, a: 0.51 });
      });

      it('should not update color on ArrowDown key', async () => {
        await sendKeys({ press: 'ArrowDown' });
        expect(picker.color).to.deep.equal(color);
      });

      it('should not update color on ArrowUp key', async () => {
        await sendKeys({ press: 'ArrowUp' });
        expect(picker.color).to.deep.equal(color);
      });

      it('should update color on PageUp key', async () => {
        await sendKeys({ press: 'PageUp' });
        expect(picker.color).to.deep.equal({ ...color, a: 0.45 });
      });

      it('should update color on PageDown key', async () => {
        await sendKeys({ press: 'PageDown' });
        expect(picker.color).to.deep.equal({ ...color, a: 0.55 });
      });

      it('should update color on Home key', async () => {
        await sendKeys({ press: 'Home' });
        expect(picker.color).to.deep.equal({ ...color, a: 0 });
      });

      it('should update color on End key', async () => {
        await sendKeys({ press: 'End' });
        expect(picker.color).to.deep.equal({ ...color, a: 1 });
      });
    });
  });
});
