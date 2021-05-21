import type { ColorModel, ColorPickerEventListener, ColorPickerEventMap } from '../types';
import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import { rgbaStringToHsva, hsvaToRgbaString } from '../utils/convert.js';
import { equalColorString } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'rgba(0, 0, 0, 1)',
  toHsva: rgbaStringToHsva,
  fromHsva: hsvaToRgbaString,
  equal: equalColorString,
  fromAttr: (color) => color
};

export interface RgbaStringBase {
  addEventListener<T extends keyof ColorPickerEventMap<string>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<string>[T]>,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<T extends keyof ColorPickerEventMap<string>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<string>[T]>,
    options?: boolean | EventListenerOptions
  ): void;
}

export class RgbaStringBase extends AlphaColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
