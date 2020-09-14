import type { ColorModel, HslaColor } from '../types';
import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import { hslaToHsva, hsvaToHsla } from '../utils/convert.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<HslaColor> = {
  defaultColor: { h: 0, s: 0, l: 0, a: 1 },
  toHsva: hslaToHsva,
  fromHsva: hsvaToHsla,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export class HslaBase extends AlphaColorPicker<HslaColor> {
  protected get colorModel(): ColorModel<HslaColor> {
    return colorModel;
  }
}
