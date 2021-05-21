import type { ColorModel, ColorPickerEventListener, ColorPickerEventMap, HslColor } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { hslaToHsva, hsvaToHsla, hslaToHsl } from '../utils/convert.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<HslColor> = {
  defaultColor: { h: 0, s: 0, l: 0 },
  toHsva: ({ h, s, l }) => hslaToHsva({ h, s, l, a: 1 }),
  fromHsva: (hsva) => hslaToHsl(hsvaToHsla(hsva)),
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export interface HslBase {
  addEventListener<T extends keyof ColorPickerEventMap<HslColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<HslColor>[T]>,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<T extends keyof ColorPickerEventMap<HslColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<HslColor>[T]>,
    options?: boolean | EventListenerOptions
  ): void;
}

export class HslBase extends ColorPicker<HslColor> {
  protected get colorModel(): ColorModel<HslColor> {
    return colorModel;
  }
}
