import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { fixture, html } from '@open-wc/testing-helpers';
import { hexToHsv, hsvToRgbString } from '../lib/utils/convert';
import type { ColorPickerHex } from '../color-picker-hex';
import type { Hue } from '../lib/components/hue';
import type { Saturation } from '../lib/components/saturation';

class FakeMouseEvent extends MouseEvent {
  constructor(type: string, values: { pageX: number; pageY: number }) {
    const { pageX, pageY } = values;
    super(type, { bubbles: true, composed: true });

    Object.defineProperties(this, {
      pageX: {
        value: pageX || 0
      },
      pageY: {
        value: pageY || 0
      }
    });
  }
}

class FakeTouchEvent extends TouchEvent {
  constructor(type: string, touches: Array<{ pageX: number; pageY: number }>) {
    super(type, { bubbles: true, composed: true });

    Object.defineProperty(this, 'touches', {
      get() {
        return touches;
      }
    });
  }
}

const middleOfNode = (node: Element) => {
  const bcr = node.getBoundingClientRect();
  return { y: bcr.top + bcr.height / 2, x: bcr.left + bcr.width / 2 };
};

const getInteractive = (node: Hue | Saturation) => {
  return node.shadowRoot!.getElementById('interactive') as HTMLElement;
};

const getPointer = (node: Hue | Saturation) => {
  return node.shadowRoot!.querySelector('[part=pointer]') as HTMLElement;
};

describe('color-picker-hex', () => {
  let picker: ColorPickerHex;

  describe('lazy upgrade', () => {
    it('should work with color property set before upgrade', async () => {
      picker = document.createElement('color-picker-hex');
      document.body.appendChild(picker);
      picker.color = '#123';
      await import('../color-picker-hex');
      expect(picker.color).to.equal('#123');
      document.body.removeChild(picker);
    });
  });

  describe('default', () => {
    beforeEach(async () => {
      picker = await fixture(html`<color-picker-hex></color-picker-hex>`);
    });

    it('should set default color property value', () => {
      expect(picker.color).to.equal('#000');
    });

    it('should not reflect default color to attribute', () => {
      expect(picker.getAttribute('color')).to.equal(null);
    });
  });

  describe('color property', () => {
    beforeEach(async () => {
      picker = await fixture(html`<color-picker-hex .color="${'#ccc'}"></color-picker-hex>`);
    });

    it('should accept color set as a property', () => {
      expect(picker.color).to.equal('#ccc');
    });

    it('should not reflect color property to attribute', () => {
      expect(picker.getAttribute('color')).to.equal(null);
    });
  });

  describe('color attribute', () => {
    beforeEach(async () => {
      picker = await fixture(html`<color-picker-hex color="#488"></color-picker-hex>`);
    });

    it('should set color based on the attribute value', () => {
      expect(picker.color).to.equal('#488');
    });

    it('should not update attribute when property changes', () => {
      picker.color = '#ccc';
      expect(picker.getAttribute('color')).to.equal('#488');
    });

    it('should update property when attribute changes', () => {
      picker.setAttribute('color', '#ccc');
      expect(picker.color).to.equal('#ccc');
    });
  });

  describe('hue and saturation', () => {
    let hue: Hue;
    let saturation: Saturation;

    beforeEach(async () => {
      picker = await fixture(html`<color-picker-hex color="#488"></color-picker-hex>`);
      const root = picker.shadowRoot as ShadowRoot;
      hue = root.querySelector('[part="hue"]') as Hue;
      saturation = root.querySelector('[part="saturation"]') as Saturation;
    });

    describe('pointers', () => {
      it('should set saturation background color', () => {
        const hsv = hexToHsv(picker.color);
        const bgColor = hsvToRgbString({ h: hsv.h, s: 100, v: 100 });
        expect(getComputedStyle(saturation).backgroundColor).to.equal(bgColor);
      });

      it('should set saturation pointer background', () => {
        const bgColor = hsvToRgbString(hexToHsv(picker.color));
        expect(getComputedStyle(getPointer(saturation)).backgroundColor).to.equal(bgColor);
      });

      it('should set saturation pointer coordinates', () => {
        const hsv = hexToHsv(picker.color);
        const pointer = getPointer(saturation);
        expect(pointer.style.top).to.equal(`${100 - hsv.v}%`);
        expect(pointer.style.left).to.equal(`${hsv.s}%`);
      });

      it('should set hue pointer background', () => {
        const hsv = hexToHsv(picker.color);
        const bgColor = hsvToRgbString({ h: hsv.h, s: 100, v: 100 });
        expect(getComputedStyle(getPointer(hue)).backgroundColor).to.equal(bgColor);
      });

      it('should set hue pointer coordinate', () => {
        const hsv = hexToHsv(picker.color);
        expect(getPointer(hue).style.left).to.equal(`${(hsv.h / 360) * 100}%`);
      });
    });

    describe('interaction', () => {
      it('should dispatch color-changed event on mousedown', () => {
        const elem = getInteractive(hue);
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeMouseEvent('mousedown', { pageX: x + 10, pageY: y }));
        elem.dispatchEvent(new FakeMouseEvent('mouseup', { pageX: x + 10, pageY: y }));
        expect(spy.callCount).to.equal(1);
      });

      it('should dispatch color-changed event on mousemove', () => {
        const elem = getInteractive(hue);
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeMouseEvent('mousedown', { pageX: x + 10, pageY: y }));
        elem.dispatchEvent(new FakeMouseEvent('mousemove', { pageX: x + 20, pageY: y }));
        elem.dispatchEvent(new FakeMouseEvent('mouseup', { pageX: x + 20, pageY: y }));
        expect(spy.callCount).to.equal(2);
      });

      it('should dispatch color-changed event on touchstart', () => {
        const elem = getInteractive(saturation);
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeTouchEvent('touchstart', [{ pageX: x + 10, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchend', [{ pageX: x + 10, pageY: y }]));
        expect(spy.callCount).to.equal(1);
      });

      it('should dispatch color-changed event on touchmove', () => {
        const elem = getInteractive(saturation);
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeTouchEvent('touchstart', [{ pageX: x + 10, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchmove', [{ pageX: x + 20, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchend', [{ pageX: x + 20, pageY: y }]));
        expect(spy.callCount).to.equal(2);
      });
    });
  });
});
