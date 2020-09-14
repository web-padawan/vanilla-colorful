import type { ColorModel, HsvaColor } from '../types';
import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<HsvaColor> = {
  defaultColor: { h: 0, s: 0, v: 0, a: 1 },
  toHsva: (hsva) => hsva,
  fromHsva: (hsva) => hsva,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export class HsvaBase extends AlphaColorPicker<HsvaColor> {
  protected get colorModel(): ColorModel<HsvaColor> {
    return colorModel;
  }
}
