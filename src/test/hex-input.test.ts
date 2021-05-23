import { expect } from '@esm-bundle/chai';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { fixture, html } from '@open-wc/testing-helpers';
import type { HexInput } from '../hex-input';

describe('hex-input', () => {
  let input: HexInput;
  let target: HTMLInputElement;

  function getTarget(input: HexInput) {
    const root = input.shadowRoot as ShadowRoot;
    return root.querySelector('input') as HTMLInputElement;
  }

  describe('lazy upgrade', () => {
    it('should work with color property set before upgrade', async () => {
      const element = document.createElement('hex-input');
      document.body.appendChild(element);
      element.color = '#123';
      await import('../hex-input');
      expect(element.color).to.equal('#123');
      target = getTarget(element);
      expect(target.value).to.equal('123');
      document.body.removeChild(element);
    });
  });

  describe('default', () => {
    beforeEach(async () => {
      input = await fixture(html`<hex-input></hex-input>`);
      target = getTarget(input);
    });

    it('should set color property to empty string', () => {
      expect(input.color).to.equal('');
    });

    it('should set native input value to empty string', () => {
      expect(target.value).to.equal('');
    });

    it('should set part attribute on the native input', () => {
      expect(target.getAttribute('part')).to.equal('input');
    });

    it('should set spellcheck to false on the native input', () => {
      expect(target.getAttribute('spellcheck')).to.equal('false');
    });
  });

  describe('initialization', () => {
    beforeEach(async () => {
      input = document.createElement('hex-input');
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it('should handle property set before adding to the DOM', () => {
      input.color = '#123';
      document.body.appendChild(input);
      expect(getTarget(input).value).to.equal('123');
    });

    it('should handle attribute set before adding to the DOM', () => {
      input.setAttribute('color', '#123');
      document.body.appendChild(input);
      expect(getTarget(input).value).to.equal('123');
    });
  });

  describe('color property', () => {
    beforeEach(async () => {
      input = await fixture(html`<hex-input .color="${'#ccc'}"></hex-input>`);
      target = getTarget(input);
    });

    it('should accept color set as a property', () => {
      expect(input.color).to.equal('#ccc');
    });

    it('should pass property value to native input', () => {
      expect(target.value).to.equal('ccc');
    });

    it('should not reflect property to attribute', () => {
      expect(input.getAttribute('color')).to.equal(null);
    });
  });

  describe('color attribute', () => {
    beforeEach(async () => {
      input = await fixture(html`<hex-input color="#488"></hex-input>`);
      target = getTarget(input);
    });

    it('should set color based on the attribute value', () => {
      expect(input.color).to.equal('#488');
    });

    it('should pass attribute value to native input', () => {
      expect(target.value).to.equal('488');
    });

    it('should not update attribute when property changes', () => {
      input.color = '#ccc';
      expect(input.getAttribute('color')).to.equal('#488');
    });

    it('should update property when attribute changes', () => {
      input.setAttribute('color', '#ccc');
      expect(input.color).to.equal('#ccc');
    });
  });

  describe('empty value', () => {
    beforeEach(async () => {
      input = await fixture(html`<hex-input color="#488"></hex-input>`);
      target = getTarget(input);
    });

    it('should clean native input when color is set to empty string', () => {
      input.color = '';
      expect(target.value).to.equal('');
    });

    it('should clean native input when color is set to null', () => {
      // @ts-expect-error
      input.color = null;
      expect(target.value).to.equal('');
    });

    it('should clean native input when color is set to undefined', () => {
      // @ts-expect-error
      input.color = undefined;
      expect(target.value).to.equal('');
    });
  });

  describe('custom input', () => {
    beforeEach(async () => {
      input = await fixture(html`<hex-input color="#488"><input type="text" /></hex-input>`);
      target = input.querySelector('input') as HTMLInputElement;
    });

    it('should pass attribute value to custom input', () => {
      expect(target.value).to.equal('488');
    });

    it('should pass property value to custom input', () => {
      input.color = '#ccc';
      expect(target.value).to.equal('ccc');
    });
  });

  describe('invalid content', () => {
    beforeEach(async () => {
      input = await fixture(html`<hex-input color="#488"><span></span></hex-input>`);
    });

    it('should remove invalid slotted content', () => {
      expect(input.querySelector('span')).to.be.not.ok;
    });
  });

  describe('events', () => {
    beforeEach(async () => {
      input = await fixture(html`<hex-input color="#488"></hex-input>`);
      target = getTarget(input);
      target.focus();
    });

    it('should dispatch color-changed event on valid hex input', async () => {
      const spy = sinon.spy();
      input.addEventListener('color-changed', spy);
      await sendKeys({ press: '3' });
      await sendKeys({ press: '6' });
      await sendKeys({ press: '9' });
      expect(spy.callCount).to.equal(1);
    });

    it('should not dispatch color-changed event on invalid input', async () => {
      const spy = sinon.spy();
      input.addEventListener('color-changed', spy);
      await sendKeys({ press: '3' });
      await sendKeys({ press: '6' });
      expect(spy.callCount).to.equal(0);
    });

    it('should restore color value on blur after invalid input', async () => {
      await sendKeys({ press: '3' });
      await sendKeys({ press: '6' });
      target.dispatchEvent(new Event('blur'));
      expect(input.color).to.equal('#488');
      expect(target.value).to.equal('488');
    });
  });
});
