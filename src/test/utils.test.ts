import { expect } from '@esm-bundle/chai';
import {
  hexToHsv,
  hsvToHex,
  hsvToHsl,
  hslToHsv,
  hsvToHslString,
  hslStringToHsv,
  hsvToRgb,
  hsvToRgbString,
  rgbToHsv,
  rgbStringToHsv
} from '../lib/utils/convert.js';
import { equalColorObjects, equalColorString, equalHex } from '../lib/utils/compare.js';
import { validHex } from '../lib/utils/validate.js';

describe('Utils', () => {
  it('Converts HEX to HSV', () => {
    expect(hexToHsv('#ffffff')).to.deep.equal({ h: 0, s: 0, v: 100 });
    expect(hexToHsv('#ffff00')).to.deep.equal({ h: 60, s: 100, v: 100 });
    expect(hexToHsv('#ff0000')).to.deep.equal({ h: 0, s: 100, v: 100 });
    expect(hexToHsv('#000000')).to.deep.equal({ h: 0, s: 0, v: 0 });
    expect(hexToHsv('#c62182')).to.deep.equal({ h: 325, s: 83, v: 78 });
  });

  it('Converts shorthand HEX to HSV', () => {
    expect(hexToHsv('#FFF')).to.deep.equal({ h: 0, s: 0, v: 100 });
    expect(hexToHsv('#FF0')).to.deep.equal({ h: 60, s: 100, v: 100 });
    expect(hexToHsv('#F00')).to.deep.equal({ h: 0, s: 100, v: 100 });
    expect(hexToHsv('#ABC')).to.deep.equal({ h: 210, s: 17, v: 80 });
  });

  it('Converts HSV to HEX', () => {
    expect(hsvToHex({ h: 0, s: 0, v: 100 })).to.equal('#ffffff');
    expect(hsvToHex({ h: 60, s: 100, v: 100 })).to.equal('#ffff00');
    expect(hsvToHex({ h: 0, s: 100, v: 100 })).to.equal('#ff0000');
    expect(hsvToHex({ h: 0, s: 0, v: 0 })).to.equal('#000000');
    expect(hsvToHex({ h: 284, s: 93, v: 73 })).to.equal('#8c0dba');
  });

  it('Converts HSV to HSL', () => {
    expect(hsvToHsl({ h: 0, s: 0, v: 100 })).to.deep.equal({
      h: 0,
      s: 0,
      l: 100
    });
    expect(hsvToHsl({ h: 60, s: 100, v: 100 })).to.deep.equal({
      h: 60,
      s: 100,
      l: 50
    });
    expect(hsvToHsl({ h: 0, s: 100, v: 100 })).to.deep.equal({
      h: 0,
      s: 100,
      l: 50
    });
    expect(hsvToHsl({ h: 0, s: 0, v: 0 })).to.deep.equal({ h: 0, s: 0, l: 0 });
    expect(hsvToHsl({ h: 200, s: 40, v: 40 })).to.deep.equal({
      h: 200,
      s: 25,
      l: 32
    });
  });

  it('Converts HSL to HSV', () => {
    expect(hslToHsv({ h: 0, s: 0, l: 100 })).to.deep.equal({
      h: 0,
      s: 0,
      v: 100
    });
    expect(hslToHsv({ h: 60, s: 100, l: 50 })).to.deep.equal({
      h: 60,
      s: 100,
      v: 100
    });
    expect(hslToHsv({ h: 0, s: 100, l: 50 })).to.deep.equal({
      h: 0,
      s: 100,
      v: 100
    });
    expect(hslToHsv({ h: 0, s: 0, l: 0 })).to.deep.equal({ h: 0, s: 0, v: 0 });
    expect(hslToHsv({ h: 200, s: 25, l: 32 })).to.deep.equal({
      h: 200,
      s: 40,
      v: 40
    });
  });

  it('Converts HSV to HSL string', () => {
    expect(hsvToHslString({ h: 0, s: 0, v: 0 })).to.equal('hsl(0, 0%, 0%)');
  });

  it('Converts HSL string to HSV', () => {
    expect(hslStringToHsv('hsl(0, 0%, 100%)')).to.deep.equal({
      h: 0,
      s: 0,
      v: 100
    });
    expect(hslStringToHsv('hsl(0,0,100)')).to.deep.equal({
      h: 0,
      s: 0,
      v: 100
    });
    expect(hslStringToHsv('hsl(60, 100%, 50%)')).to.deep.equal({
      h: 60,
      s: 100,
      v: 100
    });
    expect(hslStringToHsv('hsl(0, 100%, 50%)')).to.deep.equal({
      h: 0,
      s: 100,
      v: 100
    });
    expect(hslStringToHsv('hsl(0, 0%, 0%)')).to.deep.equal({
      h: 0,
      s: 0,
      v: 0
    });
    expect(hslStringToHsv('hsl(200, 25%, 32%)')).to.deep.equal({
      h: 200,
      s: 40,
      v: 40
    });
  });

  it('Converts HSV to RGB', () => {
    expect(hsvToRgb({ h: 0, s: 0, v: 100 })).to.deep.equal({
      r: 255,
      g: 255,
      b: 255
    });
    expect(hsvToRgb({ h: 0, s: 100, v: 100 })).to.deep.equal({
      r: 255,
      g: 0,
      b: 0
    });
  });

  it('Converts RGB to HSV', () => {
    expect(rgbToHsv({ r: 255, g: 255, b: 255 })).to.deep.equal({
      h: 0,
      s: 0,
      v: 100
    });
    expect(rgbToHsv({ r: 255, g: 0, b: 0 })).to.deep.equal({
      h: 0,
      s: 100,
      v: 100
    });
  });

  it('Converts RGB string to HSV', () => {
    expect(rgbStringToHsv('rgb(255, 255, 255)')).to.deep.equal({
      h: 0,
      s: 0,
      v: 100
    });
    expect(rgbStringToHsv('rgb(0,0,0)')).to.deep.equal({ h: 0, s: 0, v: 0 });
    expect(rgbStringToHsv('rgb(61, 88, 102)')).to.deep.equal({
      h: 200,
      s: 40,
      v: 40
    });
  });

  it('Converts HSV to RGB string', () => {
    expect(hsvToRgbString({ h: 0, s: 0, v: 100 })).to.equal('rgb(255, 255, 255)');
    expect(hsvToRgbString({ h: 200, s: 40, v: 40 })).to.equal('rgb(61, 88, 102)');
  });

  it('Converts RGB string to HSV', () => {
    expect(rgbStringToHsv('rgb(255, 255, 255)')).to.deep.equal({
      h: 0,
      s: 0,
      v: 100
    });
    expect(rgbStringToHsv('rgb(61, 88, 102)')).to.deep.equal({
      h: 200,
      s: 40,
      v: 40
    });
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
});
