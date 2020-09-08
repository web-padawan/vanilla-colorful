export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export type AnyColor = string | HslColor | HsvColor | RgbColor;

export interface ColorModel<T extends AnyColor> {
  defaultColor: T;
  toHsv: (color: T) => HsvColor;
  fromHsv: (hsv: HsvColor) => T;
  equal: (first: T, second: T) => boolean;
  fromAttr: (attr: string) => T;
}
