import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { fixture, html } from '@open-wc/testing-helpers';
import '../color-picker-hex';
import { hexToHsv, hsvToRgbString } from '../lib/utils/convert';

import type { ColorPickerHex } from '../color-picker-hex';
import type { ColorHue } from '../lib/components/hue';
import type { ColorSaturation } from '../lib/components/saturation';

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

const getInteractive = (node: ColorHue | ColorSaturation) => {
  return node.shadowRoot!.getElementById('interactive') as HTMLElement;
};

const getPointer = (node: ColorHue | ColorSaturation) => {
  return node.shadowRoot!.getElementById('pointer') as HTMLElement;
};

describe('color-picker-hex', () => {
  let picker: ColorPickerHex;
  let hue: ColorHue;
  let saturation: ColorSaturation;

  beforeEach(async () => {
    picker = await fixture(html`<color-picker-hex color="#488"></color-picker-hex>`);
    hue = picker.shadowRoot!.querySelector('color-hue') as ColorHue;
    saturation = picker.shadowRoot!.querySelector('color-saturation') as ColorSaturation;
  });

  describe('color property', () => {
    it('should set color based on the attribute value', () => {
      expect(picker.color).to.equal('#488');
    });

    it('should update attribute when property changes', () => {
      picker.color = '#ccc';
      expect(picker.getAttribute('color')).to.equal('#ccc');
    });

    it('should update property when attribute changes', () => {
      picker.setAttribute('color', '#ccc');
      expect(picker.color).to.equal('#ccc');
    });
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
