import type {
  ColorModel,
  ColorPickerEventListener,
  ColorPickerEventMap,
  HsvaColor
} from '../types';
import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import { equalColorObjects } from '../utils/compare.js';
import { roundHsva } from '../utils/convert.js';

const colorModel: ColorModel<HsvaColor> = {
  defaultColor: { h: 0, s: 0, v: 0, a: 1 },
  toHsva: (hsva) => hsva,
  fromHsva: roundHsva,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export interface HsvaBase {
  addEventListener<T extends keyof ColorPickerEventMap<HsvaColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<HsvaColor>[T]>,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<T extends keyof ColorPickerEventMap<HsvaColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<HsvaColor>[T]>,
    options?: boolean | EventListenerOptions
  ): void;
}

export class HsvaBase extends AlphaColorPicker<HsvaColor> {
  protected get colorModel(): ColorModel<HsvaColor> {
    return colorModel;
  }
}
