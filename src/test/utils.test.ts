import { expect } from 'chai';
import { clamp, round } from '../lib/utils/math.js';
import {
  hexToRgba,
  hexToHsva,
  hslaStringToHsva,
  hslaToHsl,
  hslaToHsva,
  hslStringToHsva,
  hsvaStringToHsva,
  hsvaToHex,
  hsvaToHsla,
  hsvaToHslaString,
  hsvaToHslString,
  hsvaToHsvaString,
  hsvaToHsv,
  hsvaToHsvString,
  hsvaToRgba,
  hsvaToRgbaString,
  hsvaToRgbString,
  hsvStringToHsva,
  rgbaStringToHsva,
  rgbaToHex,
  rgbaToHsva,
  rgbaToRgb,
  rgbStringToHsva,
  roundHsva
} from '../lib/utils/convert.js';
import { equalColorObjects, equalColorString, equalHex } from '../lib/utils/compare.js';
import { validHex } from '../lib/utils/validate.js';
import type { HslaColor, HsvaColor, RgbaColor } from '../lib/types.js';

describe('Utils', () => {
  it('Converts HEX to HSV', () => {
    expect(hexToHsva('#ffffff')).to.deep.equal({ h: 0, s: 0, v: 100, a: 1 });
    expect(hexToHsva('#ffff00')).to.deep.equal({ h: 60, s: 100, v: 100, a: 1 });
    expect(hexToHsva('#ff0000')).to.deep.equal({ h: 0, s: 100, v: 100, a: 1 });
    expect(hexToHsva('#000000')).to.deep.equal({ h: 0, s: 0, v: 0, a: 1 });
    expect(hexToHsva('#c62182')).to.deep.equal({ h: 325, s: 83, v: 78, a: 1 });
  });

  it('Converts shorthand HEX to HSVA', () => {
    expect(hexToHsva('#FFF')).to.deep.equal({ h: 0, s: 0, v: 100, a: 1 });
    expect(hexToHsva('#FF0')).to.deep.equal({ h: 60, s: 100, v: 100, a: 1 });
    expect(hexToHsva('#F00')).to.deep.equal({ h: 0, s: 100, v: 100, a: 1 });
    expect(hexToHsva('#ABC')).to.deep.equal({ h: 210, s: 17, v: 80, a: 1 });
  });

  it('Converts HEX with alpha to RGBA', () => {
    expect(hexToRgba('#11223399')).to.deep.equal({ r: 17, g: 34, b: 51, a: 0.6 });
    expect(hexToRgba('#11223300')).to.deep.equal({ r: 17, g: 34, b: 51, a: 0 });
    expect(hexToRgba('#112233')).to.deep.equal({ r: 17, g: 34, b: 51, a: 1 });
  });

  it('Converts shorthand HEX with alpha to RGBA', () => {
    expect(hexToRgba('#1239')).to.deep.equal({ r: 17, g: 34, b: 51, a: 0.6 });
    expect(hexToRgba('#1230')).to.deep.equal({ r: 17, g: 34, b: 51, a: 0 });
    expect(hexToRgba('#123')).to.deep.equal({ r: 17, g: 34, b: 51, a: 1 });
  });

  it('Converts HSV to HEX', () => {
    expect(hsvaToHex({ h: 0, s: 0, v: 100, a: 1 })).to.equal('#ffffff');
    expect(hsvaToHex({ h: 60, s: 100, v: 100, a: 1 })).to.equal('#ffff00');
    expect(hsvaToHex({ h: 0, s: 100, v: 100, a: 1 })).to.equal('#ff0000');
    expect(hsvaToHex({ h: 0, s: 0, v: 0, a: 1 })).to.equal('#000000');
    expect(hsvaToHex({ h: 284, s: 93, v: 73, a: 1 })).to.equal('#8c0dba');
  });

  it('Converts HSVA to HSLA', () => {
    const test = (input: HsvaColor, output: HslaColor) =>
      expect(hsvaToHsla(input)).to.deep.equal(output);

    test({ h: 0, s: 0, v: 100, a: 1 }, { h: 0, s: 0, l: 100, a: 1 });
    test({ h: 60, s: 100, v: 100, a: 1 }, { h: 60, s: 100, l: 50, a: 1 });
    test({ h: 0, s: 100, v: 100, a: 1 }, { h: 0, s: 100, l: 50, a: 1 });
    test({ h: 0, s: 0, v: 0, a: 1 }, { h: 0, s: 0, l: 0, a: 1 });
    test({ h: 200, s: 40, v: 40, a: 1 }, { h: 200, s: 25, l: 32, a: 1 });
  });

  it('Converts HSLA to HSVA', () => {
    const test = (input: HslaColor, output: HsvaColor) =>
      expect(hslaToHsva(input)).to.deep.equal(output);

    test({ h: 0, s: 0, l: 100, a: 1 }, { h: 0, s: 0, v: 100, a: 1 });
    test({ h: 60, s: 100, l: 50, a: 1 }, { h: 60, s: 100, v: 100, a: 1 });
    test({ h: 0, s: 100, l: 50, a: 1 }, { h: 0, s: 100, v: 100, a: 1 });
    test({ h: 0, s: 0, l: 0, a: 1 }, { h: 0, s: 0, v: 0, a: 1 });
    test({ h: 200, s: 25, l: 32, a: 1 }, { h: 200, s: 40, v: 40, a: 1 });
  });

  it('Converts HSVA to HSL string', () => {
    expect(hsvaToHslString({ h: 200, s: 40, v: 40, a: 1 })).to.equal('hsl(200, 25%, 32%)');
    expect(hsvaToHslString({ h: 0, s: 0, v: 0, a: 1 })).to.equal('hsl(0, 0%, 0%)');
  });

  it('Converts HSVA to HSLA string', () => {
    expect(hsvaToHslaString({ h: 200, s: 40, v: 40, a: 0.5 })).to.equal('hsla(200, 25%, 32%, 0.5)');
    expect(hsvaToHslaString({ h: 0, s: 0, v: 0, a: 0 })).to.equal('hsla(0, 0%, 0%, 0)');
  });

  it('Converts HSL string to HSV', () => {
    expect(hslStringToHsva('hsl(0, 0%, 100%)')).to.deep.equal({ h: 0, s: 0, v: 100, a: 1 });
    expect(hslStringToHsva('hsl(0,0,100)')).to.deep.equal({ h: 0, s: 0, v: 100, a: 1 });
    expect(hslStringToHsva('hsl(60, 100%, 50%)')).to.deep.equal({ h: 60, s: 100, v: 100, a: 1 });
    expect(hslStringToHsva('hsl(0, 100%, 50%)')).to.deep.equal({ h: 0, s: 100, v: 100, a: 1 });
    expect(hslStringToHsva('hsl(0, 0%, 0%)')).to.deep.equal({ h: 0, s: 0, v: 0, a: 1 });
    expect(hslStringToHsva('hsl(200, 25%, 32%)')).to.deep.equal({ h: 200, s: 40, v: 40, a: 1 });
  });

  it('Converts HSLA string to HSVA', () => {
    const test = (input: string, output: HsvaColor) =>
      expect(hslaStringToHsva(input)).to.deep.equal(output);

    test('hsla(0deg, 0%, 0%, 0.5)', { h: 0, s: 0, v: 0, a: 0.5 });
    test('hsla(200, 25%, 32%, 1)', { h: 200, s: 40, v: 40, a: 1 });
    test('hsla(.5turn 25% 32% / 50%)', { h: 180, s: 40, v: 40, a: 0.5 });
  });

  it('Converts HSVA to RGBA', () => {
    const test = (input: HsvaColor, output: RgbaColor) =>
      expect(hsvaToRgba(input)).to.deep.equal(output);

    test({ h: 0, s: 0, v: 100, a: 1 }, { r: 255, g: 255, b: 255, a: 1 });
    test({ h: 0, s: 100, v: 100, a: 0.5 }, { r: 255, g: 0, b: 0, a: 0.5 });
    test({ h: 0, s: 100, v: 100, a: 0.567 }, { r: 255, g: 0, b: 0, a: 0.57 });
  });

  it('Converts RGBA to HSVA', () => {
    const test = (input: RgbaColor, output: HsvaColor) =>
      expect(rgbaToHsva(input)).to.deep.equal(output);

    test({ r: 255, g: 255, b: 255, a: 1 }, { h: 0, s: 0, v: 100, a: 1 });
    test({ r: 255, g: 0, b: 0, a: 1 }, { h: 0, s: 100, v: 100, a: 1 });
  });

  it('Converts RGBA to HEX', () => {
    expect(rgbaToHex({ r: 17, g: 34, b: 51, a: 0.6 })).to.deep.equal('#11223399');
    expect(rgbaToHex({ r: 17, g: 34, b: 51, a: 0 })).to.deep.equal('#11223300');
    expect(rgbaToHex({ r: 17, g: 34, b: 51, a: 1 })).to.deep.equal('#112233');
  });

  it('Converts RGB string to HSVA', () => {
    expect(rgbStringToHsva('rgb(255, 255, 255)')).to.deep.equal({ h: 0, s: 0, v: 100, a: 1 });
    expect(rgbStringToHsva('rgb(0,0,0)')).to.deep.equal({ h: 0, s: 0, v: 0, a: 1 });
    expect(rgbStringToHsva('rgb(61, 88, 102)')).to.deep.equal({ h: 200, s: 40, v: 40, a: 1 });
    expect(rgbStringToHsva('rgb(100% 100% 100%)')).to.deep.equal({ h: 0, s: 0, v: 100, a: 1 });
    expect(rgbStringToHsva('rgb(50% 45.9% 25%)')).to.deep.equal({ h: 50, s: 50, v: 50, a: 1 });
  });

  it('Converts HSVA to RGB string', () => {
    expect(hsvaToRgbString({ h: 0, s: 0, v: 100, a: 1 })).to.equal('rgb(255, 255, 255)');
    expect(hsvaToRgbString({ h: 200, s: 40, v: 40, a: 1 })).to.equal('rgb(61, 88, 102)');
  });

  it('Converts RGBA string to HSVA', () => {
    const test = (input: string, output: HsvaColor) =>
      expect(rgbaStringToHsva(input)).to.deep.equal(output);
    test('rgba(61, 88, 102, 0.5)', { h: 200, s: 40, v: 40, a: 0.5 });
    test('rgba(23.9% 34.5% 40% / 99%)', { h: 200, s: 40, v: 40, a: 0.99 });
  });

  it('Converts HSVA to RGBA string', () => {
    expect(hsvaToRgbaString({ h: 0, s: 0, v: 100, a: 0.5 })).to.equal('rgba(255, 255, 255, 0.5)');
    expect(hsvaToRgbaString({ h: 200, s: 40, v: 40, a: 0.5 })).to.equal('rgba(61, 88, 102, 0.5)');
  });

  it('Converts HSVA to HSVA string', () => {
    expect(hsvaToHsvaString({ h: 0, s: 0, v: 100, a: 1 })).to.equal('hsva(0, 0%, 100%, 1)');
    expect(hsvaToHsvaString({ h: 200, s: 40, v: 40, a: 0 })).to.equal('hsva(200, 40%, 40%, 0)');
  });

  it('Converts HSVA to HSV string', () => {
    expect(hsvaToHsvString({ h: 0, s: 0, v: 100, a: 1 })).to.equal('hsv(0, 0%, 100%)');
    expect(hsvaToHsvString({ h: 200, s: 40, v: 40, a: 1 })).to.equal('hsv(200, 40%, 40%)');
  });

  it('Converts HSV string to HSVA', () => {
    expect(hsvStringToHsva('hsv(0, 11%, 0%)')).to.deep.equal({ h: 0, s: 11, v: 0, a: 1 });
    expect(hsvStringToHsva('hsv(90deg 20% 10%)')).to.deep.equal({ h: 90, s: 20, v: 10, a: 1 });
    expect(hsvStringToHsva('hsv(100grad 20% 10%)')).to.deep.equal({ h: 90, s: 20, v: 10, a: 1 });
    expect(hsvStringToHsva('hsv(0.25turn 20% 10%)')).to.deep.equal({ h: 90, s: 20, v: 10, a: 1 });
    expect(hsvStringToHsva('hsv(1.5708rad 20% 10%)')).to.deep.equal({ h: 90, s: 20, v: 10, a: 1 });
  });

  it('Converts HSVA string to HSVA', () => {
    expect(hsvaStringToHsva('hsva(0, 11%, 0, 0.5)')).to.deep.equal({ h: 0, s: 11, v: 0, a: 0.5 });
    expect(hsvaStringToHsva('hsva(5deg 9% 7% / 40%)')).to.deep.equal({ h: 5, s: 9, v: 7, a: 0.4 });
  });

  it('Converts HSVA to HSV', () => {
    expect(hsvaToHsv({ h: 200, s: 40, v: 40, a: 1 })).to.deep.equal({ h: 200, s: 40, v: 40 });
  });

  it('Converts HSLA to HSL', () => {
    expect(hslaToHsl({ h: 0, s: 0, l: 100, a: 1 })).to.deep.equal({ h: 0, s: 0, l: 100 });
  });

  it('Converts RGBA to RGB', () => {
    expect(rgbaToRgb({ r: 255, g: 255, b: 255, a: 1 })).to.deep.equal({ r: 255, g: 255, b: 255 });
  });

  it('Handles incorrect HSLA string', () => {
    expect(hslaStringToHsva('rgba(0,0,0,1)')).to.deep.equal({ h: 0, s: 0, v: 0, a: 1 });
  });

  it('Handles incorrect HSVA string', () => {
    expect(hsvaStringToHsva('hsla(0,0,0,1)')).to.deep.equal({ h: 0, s: 0, v: 0, a: 1 });
  });

  it('Handles incorrect RGBA string', () => {
    expect(rgbaStringToHsva('hsva(0,0,0,1)')).to.deep.equal({ h: 0, s: 0, v: 0, a: 1 });
  });

  it('Rounds HSVA', () => {
    const test = (input: HsvaColor, output: HsvaColor) =>
      expect(roundHsva(input)).to.deep.equal(output);

    test({ h: 1, s: 1, v: 1, a: 1 }, { h: 1, s: 1, v: 1, a: 1 });
    test({ h: 3.3333, s: 4.4444, v: 5.5555, a: 0.6789 }, { h: 3, s: 4, v: 6, a: 0.68 });
  });

  it('Compares two HEX colors', () => {
    expect(equalHex('#8c0dba', '#8c0dba')).to.equal(true);
    expect(equalHex('#FFFFFF', '#ffffff')).to.equal(true);
    expect(equalHex('#ABC', '#aabbcc')).to.equal(true);
    expect(equalHex('#abcdef', '#fedcbd')).to.equal(false);
  });

  it('Compares two HSV colors', () => {
    expect(equalColorObjects({ h: 0, s: 0, v: 100 }, { h: 0, s: 0, v: 100 })).to.equal(true);
    expect(equalColorObjects({ h: 100, s: 50, v: 50 }, { h: 100, s: 50, v: 50 })).to.equal(true);
    expect(equalColorObjects({ h: 50, s: 0, v: 0 }, { h: 100, s: 0, v: 0 })).to.equal(false);
    expect(equalColorObjects({ h: 1, s: 2, v: 3 }, { h: 4, s: 5, v: 6 })).to.equal(false);
  });

  it('Compares two equivalent objects', () => {
    const sameObject = { h: 0, s: 0, v: 100 };
    expect(equalColorObjects(sameObject, sameObject)).to.equal(true);
  });

  it('Compares two color strings', () => {
    expect(equalColorString('rgb(0, 100, 100)', 'rgb(0,100,100)')).to.equal(true);
    expect(equalColorString('hsl(0, 100%, 50%)', 'hsl(0,100%,50%)')).to.equal(true);
  });

  it('Validates HEX colors', () => {
    // valid strings
    expect(validHex('#8c0dba')).to.equal(true);
    expect(validHex('aabbcc')).to.equal(true);
    expect(validHex('#ABC')).to.equal(true);
    expect(validHex('123')).to.equal(true);
    // out of [0-F] range
    expect(validHex('#eeffhh')).to.equal(false);
    // wrong length
    expect(validHex('#12')).to.equal(false);
    expect(validHex('#12345')).to.equal(false);
    // empty
    expect(validHex('')).to.equal(false);
    // @ts-expect-error
    expect(validHex(null)).to.equal(false);
    // @ts-expect-error
    expect(validHex()).to.equal(false);
  });

  it('Clamps a number between bounds', () => {
    expect(clamp(0.5)).to.equal(0.5);
    expect(clamp(1.5)).to.equal(1);
    expect(clamp(-1)).to.equal(0);
    expect(clamp(50, -50, 100)).to.equal(50);
    expect(clamp(-500, -50, 100)).to.equal(-50);
    expect(clamp(500, -50, 100)).to.equal(100);
  });

  it('Rounds a number', () => {
    expect(round(0)).to.equal(0);
    expect(round(1)).to.equal(1);
    expect(round(0.1)).to.equal(0);
    expect(round(0.9)).to.equal(1);
    expect(round(0.123, 2)).to.equal(0.12);
    expect(round(0.789, 2)).to.equal(0.79);
    expect(round(1, 10)).to.equal(1);
    expect(round(0.123, 10)).to.equal(0.123);
  });
});
