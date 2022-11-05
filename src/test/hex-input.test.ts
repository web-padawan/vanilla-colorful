import { expect } from '@esm-bundle/chai';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { fixture, html, nextFrame } from '@open-wc/testing-helpers';
import type { HexInput } from '../hex-input';

describe('hex-input', () => {
  let input: HexInput;
  let target: HTMLInputElement;

  function getTarget(input: HexInput) {
    const root = input.shadowRoot as ShadowRoot;
    return root.querySelector('input') as HTMLInputElement;
  }

  describe('lazy upgrade', () => {
    it('should work with all properties set before upgrade', async () => {
      const element = document.createElement('hex-input');
      document.body.appendChild(element);
      element.alpha = true;
      element.prefixed = true;
      element.color = '#123';
      await import('../hex-input');
      expect(element.color).to.equal('#123');
      expect(element.alpha).to.be.true;
      expect(element.prefixed).to.be.true;
      target = getTarget(element);
      expect(target.value).to.equal('#123');
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

    it('should not throw when removing and adding from the DOM', async () => {
      input.color = '#123';
      document.body.appendChild(input);
      document.body.removeChild(input);
      await nextFrame();
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

    it('should use default input if custom input removed', async () => {
      input.removeChild(target);
      await nextFrame();
      expect(getTarget(input).value).to.equal('488');
    });

    it('should update custom input if removed and added', async () => {
      input.removeChild(target);
      target.value = '';
      await nextFrame();
      input.appendChild(target);
      await nextFrame();
      expect(target.value).to.equal('488');
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

    it('should dispatch color-changed event on blur after clearing input', async () => {
      const spy = sinon.spy();
      input.addEventListener('color-changed', spy);
      target.select();
      await sendKeys({ press: 'Backspace' });
      target.dispatchEvent(new Event('blur'));
      expect(spy.callCount).to.equal(1);
    });

    it('should not restore color value on blur after clearing input', async () => {
      target.select();
      await sendKeys({ press: 'Backspace' });
      target.dispatchEvent(new Event('blur'));
      expect(input.color).to.equal('');
      expect(target.value).to.equal('');
    });
  });

  describe('alpha', () => {
    describe('property', () => {
      beforeEach(async () => {
        input = await fixture(html`<hex-input></hex-input>`);
        input.alpha = true;
        input.color = '#11223344';
        target = getTarget(input);
      });

      it('should allow setting 8 digits HEX when alpha is set with property', () => {
        expect(input.color).to.equal('#11223344');
        expect(target.value).to.equal('11223344');
      });

      it('should set alpha attribute when property is set to true', () => {
        expect(input.hasAttribute('alpha')).to.be.true;
      });

      it('should remove alpha attribute when property is set to false', () => {
        input.alpha = false;
        expect(input.hasAttribute('alpha')).to.be.false;
      });

      it('should update input value to 6 digits when alpha is set to false', () => {
        input.alpha = false;
        expect(input.color).to.equal('#112233');
        expect(target.value).to.equal('112233');
      });

      it('should update non-prefixed value to 6 digits when alpha is set to false', () => {
        input.color = '11223344';
        input.alpha = false;
        expect(input.color).to.equal('112233');
        expect(target.value).to.equal('112233');
      });

      it('should update shorthand value to 3 digits when alpha is set to false', () => {
        input.color = '#1234';
        input.alpha = false;
        expect(input.color).to.equal('#123');
        expect(target.value).to.equal('123');
      });

      it('should update non-prefixed shorthand value to 3 digits when alpha is set to false', () => {
        input.color = '1234';
        input.alpha = false;
        expect(input.color).to.equal('123');
        expect(target.value).to.equal('123');
      });

      it('should not allow using 8 digits HEX when alpha is set to false', async () => {
        input.alpha = false;
        input.focus();

        await sendKeys({ press: '3' });
        await sendKeys({ press: '6' });
        target.dispatchEvent(new Event('blur'));

        expect(target.value).to.equal('112233');
      });
    });

    describe('attribute', () => {
      beforeEach(async () => {
        input = await fixture(html`<hex-input color="#11223344" alpha></hex-input>`);
        target = getTarget(input);
      });

      it('should allow setting 8 digits HEX when alpha is set with attribute', () => {
        expect(input.color).to.equal('#11223344');
        expect(target.value).to.equal('11223344');
      });

      it('should set alpha property to false when attribute is removed', () => {
        input.removeAttribute('alpha');
        expect(input.alpha).to.be.false;
      });

      it('should update input value to 6 digits when attribute is removed', () => {
        input.removeAttribute('alpha');
        expect(input.color).to.equal('#112233');
        expect(target.value).to.equal('112233');
      });

      it('should update non-prefixed value to 6 digits when attribute is removed', () => {
        input.color = '11223344';
        input.removeAttribute('alpha');
        expect(input.color).to.equal('112233');
        expect(target.value).to.equal('112233');
      });

      it('should update shorthand value to 3 digits when attribute is removed', () => {
        input.color = '#1234';
        input.removeAttribute('alpha');
        expect(input.color).to.equal('#123');
        expect(target.value).to.equal('123');
      });

      it('should update non-prefixed shorthand value to 3 digits when attribute is removed', () => {
        input.color = '1234';
        input.removeAttribute('alpha');
        expect(input.color).to.equal('123');
        expect(target.value).to.equal('123');
      });

      it('should not allow using 8 digits HEX when attribute is removed', async () => {
        input.removeAttribute('alpha');
        input.focus();

        await sendKeys({ press: '3' });
        await sendKeys({ press: '6' });
        target.dispatchEvent(new Event('blur'));

        expect(target.value).to.equal('112233');
      });
    });
  });

  describe('prefixed', () => {
    describe('property', () => {
      beforeEach(async () => {
        input = await fixture(html`<hex-input></hex-input>`);
        input.prefixed = true;
        input.color = '#112233';
        target = getTarget(input);
      });

      it('should set prefixed attribute when prefixed property is set', () => {
        expect(input.hasAttribute('prefixed')).to.be.true;
      });

      it('should set # to the input when prefixed property is set', () => {
        expect(target.value).to.equal('#112233');
      });

      it('should remove prefixed attribute when prefixed property is set to false', () => {
        input.prefixed = false;
        expect(input.hasAttribute('prefixed')).to.be.false;
      });

      it('should remove # from the input when prefixed property is set to false', () => {
        input.prefixed = false;
        expect(target.value).to.equal('112233');
      });
    });

    describe('attribute', () => {
      beforeEach(async () => {
        input = await fixture(html`<hex-input color="#112233" prefixed></hex-input>`);
        target = getTarget(input);
      });

      it('should set prefixed to true when prefixed attribute is set', () => {
        expect(input.prefixed).to.be.true;
      });

      it('should set # to the input when prefixed attribute is set', () => {
        expect(target.value).to.equal('#112233');
      });

      it('should set prefixed to false when prefixed attribute is removed', () => {
        input.removeAttribute('prefixed');
        expect(input.prefixed).to.be.false;
      });

      it('should remove # from the input when prefixed attribute is removed', () => {
        input.removeAttribute('prefixed');
        expect(target.value).to.equal('112233');
      });
    });
  });
});
