const regularColorScales = [
  'tomato',
  'red',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'grass',
  'brown',
  'orange',
] as const;
type RegularColorScale = (typeof regularColorScales)[number];
const brightColorScales = ['sky', 'mint', 'lime', 'yellow', 'amber'] as const;
type BrightColorScale = (typeof brightColorScales)[number];
const metalColorScales = ['gold', 'bronze'] as const;
type MetalColorScale = (typeof metalColorScales)[number];
const allColorScales = [...regularColorScales, ...brightColorScales, ...metalColorScales] as const;
type ColorScale = (typeof allColorScales)[number];

const pureGrayScale = 'gray' as const;
type PureGrayScale = typeof pureGrayScale;
const desaturatedGrayScales = ['mauve', 'slate', 'sage', 'olive', 'sand'] as const;
type DesaturatedGrayScale = (typeof desaturatedGrayScales)[number];
const allGrayScales = [pureGrayScale, ...desaturatedGrayScales] as const;
type GrayScale = (typeof allGrayScales)[number];

const allColors = [...allColorScales, 'gray'] as const;
type Color = (typeof allColors)[number];

function getNaturallyPairedGrayScale(color: Color): GrayScale {
  switch (color) {
    case 'tomato':
    case 'red':
    case 'crimson':
    case 'pink':
    case 'plum':
    case 'purple':
    case 'violet':
      return 'mauve';
    case 'indigo':
    case 'blue':
    case 'sky':
    case 'cyan':
      return 'slate';
    case 'teal':
    case 'mint':
    case 'green':
      return 'sage';
    case 'grass':
    case 'lime':
      return 'olive';
    case 'yellow':
    case 'amber':
    case 'orange':
    case 'brown':
    case 'gold':
    case 'bronze':
      return 'sand';
    case 'gray':
      return 'gray';
  }
}

export {
  regularColorScales,
  brightColorScales,
  metalColorScales,
  allColorScales,
  //
  pureGrayScale,
  desaturatedGrayScales,
  allGrayScales,
  //
  allColors,
  //
  getNaturallyPairedGrayScale,
};
export type {
  RegularColorScale,
  BrightColorScale,
  MetalColorScale,
  ColorScale,
  //
  PureGrayScale,
  DesaturatedGrayScale,
  GrayScale,
  //
  Color,
};
