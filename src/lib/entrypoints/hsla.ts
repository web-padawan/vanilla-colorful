import type {
  ColorModel,
  ColorPickerEventListener,
  ColorPickerEventMap,
  HslaColor
} from '../types';
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

export interface HslaBase {
  addEventListener<T extends keyof ColorPickerEventMap<HslaColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<HslaColor>[T]>,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<T extends keyof ColorPickerEventMap<HslaColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<HslaColor>[T]>,
    options?: boolean | EventListenerOptions
  ): void;
}

export class HslaBase extends AlphaColorPicker<HslaColor> {
  protected get colorModel(): ColorModel<HslaColor> {
    return colorModel;
  }
}
