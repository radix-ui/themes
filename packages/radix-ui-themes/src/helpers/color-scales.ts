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
const brightColorScales = ['sky', 'mint', 'lime', 'yellow', 'amber'] as const;
const metalColorScales = ['gold', 'bronze'] as const;
const allColorScales = [...regularColorScales, ...brightColorScales, ...metalColorScales] as const;
type ColorScale = (typeof allColorScales)[number];

const pureGrayScale = 'gray' as const;
const desaturatedGrayScales = ['mauve', 'slate', 'sage', 'olive', 'sand'] as const;
type DesaturatedGrayScale = (typeof desaturatedGrayScales)[number];
const allGrayScales = [pureGrayScale, ...desaturatedGrayScales] as const;
type GrayScale = (typeof allGrayScales)[number];

function getNaturallyPairedGrayScale(color: ColorScale): DesaturatedGrayScale {
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
  }
}

const allColorsAndGray = [...allColorScales, 'gray'] as const;
type ColorOrGray = (typeof allColorsAndGray)[number];
type Color = ColorScale;

export {
  //
  regularColorScales,
  brightColorScales,
  metalColorScales,
  allColorScales,
  //
  pureGrayScale,
  desaturatedGrayScales,
  allGrayScales,
  //
  allColorsAndGray,
  getNaturallyPairedGrayScale,
};
export type { ColorScale, GrayScale, ColorOrGray, Color };
