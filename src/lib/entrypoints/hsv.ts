import type { ColorModel, ColorPickerEventListener, ColorPickerEventMap, HsvColor } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { hsvaToHsv } from '../utils/convert.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<HsvColor> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  toHsva: ({ h, s, v }) => ({ h, s, v, a: 1 }),
  fromHsva: hsvaToHsv,
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export interface HsvBase {
  addEventListener<T extends keyof ColorPickerEventMap<HsvColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<HsvColor>[T]>,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<T extends keyof ColorPickerEventMap<HsvColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<HsvColor>[T]>,
    options?: boolean | EventListenerOptions
  ): void;
}

export class HsvBase extends ColorPicker<HsvColor> {
  protected get colorModel(): ColorModel<HsvColor> {
    return colorModel;
  }
}
