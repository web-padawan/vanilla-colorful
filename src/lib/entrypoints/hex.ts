import type { ColorModel, ColorPickerEventListener, ColorPickerEventMap } from '../types';
import { ColorPicker } from '../components/color-picker.js';
import { hexToHsva, hsvaToHex } from '../utils/convert.js';
import { equalHex } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: '#000',
  toHsva: hexToHsva,
  fromHsva: hsvaToHex,
  equal: equalHex,
  fromAttr: (color) => color
};

export interface HexBase {
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

export class HexBase extends ColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
