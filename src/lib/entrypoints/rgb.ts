import type { ColorModel, ColorPickerEventListener, ColorPickerEventMap, RgbColor } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { rgbaToHsva, hsvaToRgba, rgbaToRgb } from '../utils/convert.js';
import { equalColorObjects } from '../utils/compare.js';

const colorModel: ColorModel<RgbColor> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsva: ({ r, g, b }) => rgbaToHsva({ r, g, b, a: 1 }),
  fromHsva: (hsva) => rgbaToRgb(hsvaToRgba(hsva)),
  equal: equalColorObjects,
  fromAttr: (color) => JSON.parse(color)
};

export interface RgbBase {
  addEventListener<T extends keyof ColorPickerEventMap<RgbColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<RgbColor>[T]>,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<T extends keyof ColorPickerEventMap<RgbColor>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<RgbColor>[T]>,
    options?: boolean | EventListenerOptions
  ): void;
}

export class RgbBase extends ColorPicker<RgbColor> {
  protected get colorModel(): ColorModel<RgbColor> {
    return colorModel;
  }
}
