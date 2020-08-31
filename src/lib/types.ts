export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export type AnyColor = string | HSL | HSV | RGB;

export interface ColorModel<T extends AnyColor> {
  defaultColor: T;
  toHsv: (color: T) => HSV;
  fromHsv: (hsv: HSV) => T;
  equal: (first: T, second: T) => boolean;
  toAttr: (color: T) => string;
  fromAttr: (attr: string) => T;
  reflect: boolean;
}
