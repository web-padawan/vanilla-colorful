import type { ColorModel, ColorPickerEventListener, ColorPickerEventMap } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { hsvStringToHsva, hsvaToHsvString } from '../utils/convert.js';
import { equalColorString } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: 'hsv(0, 0%, 0%)',
  toHsva: hsvStringToHsva,
  fromHsva: hsvaToHsvString,
  equal: equalColorString,
  fromAttr: (color) => color
};

export interface HsvStringBase {
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

export class HsvStringBase extends ColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
