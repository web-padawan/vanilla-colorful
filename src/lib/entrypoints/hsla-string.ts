import type { ColorModel, ColorPickerEventListener, ColorPickerEventMap } from '../types';
import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import { hslaStringToHsva, hsvaToHslaString } from '../utils/convert.js';
import { equalColorString } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'hsla(0, 0%, 0%, 1)',
  toHsva: hslaStringToHsva,
  fromHsva: hsvaToHslaString,
  equal: equalColorString,
  fromAttr: (color) => color
};

export interface HslaStringBase {
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

export class HslaStringBase extends AlphaColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
