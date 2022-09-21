import { AlphaColorPicker } from '../components/alpha-color-picker.js';
import type { ColorModel, ColorPickerEventListener, ColorPickerEventMap } from '../types';
import { hexToHsva, hsvaToHex } from '../utils/convert.js';
import { equalHex } from '../utils/compare.js';

const colorModel: ColorModel<string> = {
  defaultColor: '#0001',
  toHsva: hexToHsva,
  fromHsva: hsvaToHex,
  equal: equalHex,
  fromAttr: (color) => color
};

export interface HexAlphaBase {
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

export class HexAlphaBase extends AlphaColorPicker<string> {
  protected get colorModel(): ColorModel<string> {
    return colorModel;
  }
}
