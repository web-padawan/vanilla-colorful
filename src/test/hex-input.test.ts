import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { fixture, html } from '@open-wc/testing-helpers';
import type { HexInput } from '../hex-input';
import '../hex-input';

describe('color-picker-hex', () => {
  let input: HexInput;
  let target: HTMLInputElement;

  function inputChar(char: string) {
    target.value += char;
    target.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
  }

  function inputText(text: string) {
    for (let i = 0; i < text.length; i++) {
      inputChar(text[i]);
    }
  }

  beforeEach(async () => {
    input = await fixture(html`<hex-input color="#488"></hex-input>`);
    target = input.shadowRoot!.querySelector('input') as HTMLInputElement;
  });

  describe('color property', () => {
    it('should set color based on the attribute value', () => {
      expect(input.color).to.equal('#488');
    });

    it('should set value to the underlying input', () => {
      expect(target.value).to.equal('488');
    });

    it('should update attribute when property changes', () => {
      input.color = '#ccc';
      expect(input.getAttribute('color')).to.equal('#ccc');
    });

    it('should update property when attribute changes', () => {
      input.setAttribute('color', '#ccc');
      expect(input.color).to.equal('#ccc');
    });
  });

  describe('empty value', () => {
    it('should remove attribute when color is set to null', () => {
      // @ts-expect-error
      input.color = null;
      expect(input.hasAttribute('color')).to.be.false;
    });

    it('should remove attribute when color is set to undefined', () => {
      // @ts-expect-error
      input.color = undefined;
      expect(input.hasAttribute('color')).to.be.false;
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

  describe('events', () => {
    it('should dispatch color-changed event on valid hex input', () => {
      const spy = sinon.spy();
      input.addEventListener('color-changed', spy);
      inputText('369');
      expect(spy.callCount).to.equal(1);
    });

    it('should not dispatch color-changed event on invalid input', () => {
      const spy = sinon.spy();
      input.addEventListener('color-changed', spy);
      inputText('36');
      expect(spy.callCount).to.equal(0);
    });

    it('should restore color value on blur after invalid input', () => {
      inputText('36');
      target.dispatchEvent(new Event('blur'));
      expect(input.color).to.equal('#488');
      expect(target.value).to.equal('488');
    });
  });
});
