import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { fixture, html, nextFrame } from '@open-wc/testing-helpers';
import { hsvaToRgbString, rgbaToHsva } from '../lib/utils/convert';
import type { HexColorPicker } from '../hex-color-picker';
import type { RgbaColorPicker } from '../rgba-color-picker';
import '../rgba-color-picker.js';

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

const getPointer = (node: HTMLElement) => {
  return node.querySelector('[part$=pointer]') as HTMLElement;
};

describe('hex-color-picker', () => {
  let picker: HexColorPicker;

  describe('lazy upgrade', () => {
    it('should work with color property set before upgrade', async () => {
      picker = document.createElement('hex-color-picker');
      document.body.appendChild(picker);
      picker.color = '#123';
      await import('../hex-color-picker');
      expect(picker.color).to.equal('#123');
      document.body.removeChild(picker);
    });
  });

  describe('default', () => {
    beforeEach(async () => {
      picker = await fixture(html`<hex-color-picker></hex-color-picker>`);
    });

    it('should set default color property value', () => {
      expect(picker.color).to.equal('#000');
    });

    it('should not reflect default color to attribute', () => {
      expect(picker.getAttribute('color')).to.equal(null);
    });

    it('should change display to none when hidden is set', () => {
      picker.setAttribute('hidden', '');
      expect(getComputedStyle(picker).display).to.equal('none');
    });
  });

  describe('color property', () => {
    beforeEach(async () => {
      picker = await fixture(html`<hex-color-picker .color="${'#ccc'}"></hex-color-picker>`);
    });

    it('should accept color set as a property', () => {
      expect(picker.color).to.equal('#ccc');
    });

    it('should not reflect color property to attribute', () => {
      expect(picker.getAttribute('color')).to.equal(null);
    });

    it('should fire color-change event when property changes', () => {
      const spy = sinon.spy();
      picker.addEventListener('color-changed', spy);
      picker.color = '#123';
      expect(spy.callCount).to.equal(1);
    });

    it('should not fire color-change event for same HEX property', () => {
      const spy = sinon.spy();
      picker.addEventListener('color-changed', spy);
      picker.color = '#cccccc';
      expect(spy.callCount).to.equal(0);
    });
  });

  describe('color-changed event', () => {
    afterEach(() => {
      document.body.removeChild(picker);
    });

    it('should fire when component is attached', () => {
      const spy = sinon.spy();
      picker = document.createElement('hex-color-picker');
      picker.addEventListener('color-changed', spy);
      document.body.appendChild(picker);
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('event propagation', () => {
    let div: HTMLDivElement;

    afterEach(() => {
      document.body.removeChild(div);
    });

    it('should fire when component is attached', () => {
      div = document.createElement('div');
      const spy = sinon.spy();
      picker = document.createElement('hex-color-picker');
      div.addEventListener('color-changed', spy);
      document.body.appendChild(div);
      div.appendChild(picker);
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('color attribute', () => {
    beforeEach(async () => {
      picker = document.createElement('hex-color-picker');
      picker.setAttribute('color', '#488');
      await nextFrame();
      document.body.appendChild(picker);
    });

    afterEach(() => {
      document.body.removeChild(picker);
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

    it('should fire color-change event when attribute changes', () => {
      const spy = sinon.spy();
      picker.addEventListener('color-changed', spy);
      picker.setAttribute('color', '#123');
      expect(spy.callCount).to.equal(1);
    });

    it('should not fire color-change event for same HEX attribute', () => {
      const spy = sinon.spy();
      picker.addEventListener('color-changed', spy);
      picker.setAttribute('color', '#448888');
      expect(spy.callCount).to.equal(0);
    });
  });

  describe('hue, saturation, alpha', () => {
    let picker: RgbaColorPicker;

    let hue: HTMLElement;
    let saturation: HTMLElement;
    let alpha: HTMLElement;

    beforeEach(async () => {
      picker = document.createElement('rgba-color-picker');
      picker.setAttribute('color', JSON.stringify({ r: 68, b: 136, g: 136, a: 1 }));
      await nextFrame();
      document.body.appendChild(picker);
      const root = picker.shadowRoot as ShadowRoot;
      hue = root.querySelector('[part="hue"]') as HTMLElement;
      saturation = root.querySelector('[part="saturation"]') as HTMLElement;
      alpha = root.querySelector('[part="alpha"]') as HTMLElement;
    });

    afterEach(() => {
      document.body.removeChild(picker);
    });

    describe('pointers', () => {
      it('should set saturation background color', () => {
        const hsva = rgbaToHsva(picker.color);
        const bgColor = hsvaToRgbString({ h: hsva.h, s: 100, v: 100, a: 1 });
        expect(getComputedStyle(saturation).backgroundColor).to.equal(bgColor);
      });

      it('should set saturation pointer color', () => {
        expect(getComputedStyle(getPointer(saturation)).color).to.equal('rgb(68, 136, 136)');
      });

      it('should set saturation pointer coordinates', () => {
        const hsva = rgbaToHsva(picker.color);
        const pointer = getPointer(saturation);
        expect(pointer.style.top).to.equal(`${100 - hsva.v}%`);
        expect(pointer.style.left).to.equal(`${hsva.s}%`);
      });

      it('should set hue pointer color', () => {
        const hsva = rgbaToHsva(picker.color);
        const bgColor = hsvaToRgbString({ h: hsva.h, s: 100, v: 100, a: 1 });
        expect(getComputedStyle(getPointer(hue)).color).to.equal(bgColor);
      });

      it('should set hue pointer coordinate', () => {
        const hsv = rgbaToHsva(picker.color);
        expect(getPointer(hue).style.left).to.equal(`${(hsv.h / 360) * 100}%`);
      });

      it('should set alpha pointer coordinate', () => {
        expect(getPointer(alpha).style.left).to.equal('100%');
      });
    });

    describe('interaction', () => {
      it('should dispatch color-changed event on mousedown', () => {
        const elem = hue;
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeMouseEvent('mousedown', { pageX: x + 10, pageY: y }));
        elem.dispatchEvent(new FakeMouseEvent('mouseup', { pageX: x + 10, pageY: y }));
        expect(spy.callCount).to.equal(1);
      });

      it('should dispatch color-changed event on mousemove', () => {
        const elem = hue;
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeMouseEvent('mousedown', { pageX: x + 10, pageY: y }));
        elem.dispatchEvent(new FakeMouseEvent('mousemove', { pageX: x + 20, pageY: y }));
        elem.dispatchEvent(new FakeMouseEvent('mouseup', { pageX: x + 20, pageY: y }));
        expect(spy.callCount).to.equal(2);
      });

      it('should dispatch color-changed event on touchstart', () => {
        const elem = saturation;
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeTouchEvent('touchstart', [{ pageX: x + 10, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchend', [{ pageX: x + 10, pageY: y }]));
        expect(spy.callCount).to.equal(1);
      });

      it('should dispatch color-changed event on touchmove', () => {
        const elem = saturation;
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeTouchEvent('touchstart', [{ pageX: x + 10, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchmove', [{ pageX: x + 20, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchend', [{ pageX: x + 20, pageY: y }]));
        expect(spy.callCount).to.equal(2);
      });

      it('should dispatch color-changed event on alpha interaction', () => {
        const elem = alpha;
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeTouchEvent('touchstart', [{ pageX: x, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchend', [{ pageX: x, pageY: y }]));
        expect(spy.callCount).to.equal(1);
      });

      it('should not dispatch event when hue changes for black', () => {
        picker.color = { r: 0, g: 0, b: 0, a: 1 };
        const elem = hue;
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { x, y } = middleOfNode(elem);
        elem.dispatchEvent(new FakeTouchEvent('touchstart', [{ pageX: x + 10, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchmove', [{ pageX: x + 20, pageY: y }]));
        elem.dispatchEvent(new FakeTouchEvent('touchend', [{ pageX: x + 20, pageY: y }]));
        expect(spy.callCount).to.equal(0);
      });

      it('should not react on mouse events after a touch interaction', () => {
        const elem = hue;
        picker.color = { r: 0, g: 0, b: 255, a: 1 };
        const spy = sinon.spy();
        picker.addEventListener('color-changed', spy);
        const { left, top, height } = elem.getBoundingClientRect();
        const y = top + height / 2;
        elem.dispatchEvent(new FakeTouchEvent('touchstart', [{ pageX: left, pageY: y }])); // 1 (#ff0000)
        elem.dispatchEvent(new FakeTouchEvent('touchmove', [{ pageX: left + 50, pageY: y }])); // 2 (#00ffff)
        // Should be skipped
        elem.dispatchEvent(new FakeMouseEvent('mousedown', { pageX: left + 65, pageY: y })); // 3
        elem.dispatchEvent(new FakeMouseEvent('mousemove', { pageX: left + 125, pageY: y })); // 4
        expect(spy.callCount).to.equal(2);
      });
    });
  });
});
