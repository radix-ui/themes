const radixColorScalesRegular = [
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
type RadixColorScaleRegular = (typeof radixColorScalesRegular)[number];
const radixColorScalesBright = ['sky', 'mint', 'lime', 'yellow', 'amber'] as const;
type RadixColorScaleBright = (typeof radixColorScalesBright)[number];
const radixColorScalesMetal = ['gold', 'bronze'] as const;
type RadixColorScaleMetal = (typeof radixColorScalesMetal)[number];
const radixColorScales = [
  ...radixColorScalesRegular,
  ...radixColorScalesBright,
  ...radixColorScalesMetal,
] as const;
type RadixColorScale = (typeof radixColorScales)[number];

const radixGrayScalePure = 'gray' as const;
type RadixGrayScalePure = typeof radixGrayScalePure;
const radixGrayScalesDesaturated = ['mauve', 'slate', 'sage', 'olive', 'sand'] as const;
type RadixGrayScaleDesaturated = (typeof radixGrayScalesDesaturated)[number];
const radixGrayScales = [radixGrayScalePure, ...radixGrayScalesDesaturated] as const;
type RadixGrayScale = (typeof radixGrayScales)[number];

function radixGetMatchingGrayScale(colorScale: RadixColorScale): RadixGrayScale {
  switch (colorScale) {
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

export {
  radixColorScalesRegular,
  radixColorScalesBright,
  radixColorScalesMetal,
  radixColorScales,
  //
  radixGrayScalePure,
  radixGrayScalesDesaturated,
  radixGrayScales,
  //
  radixGetMatchingGrayScale,
};
export type {
  RadixColorScaleRegular,
  RadixColorScaleBright,
  RadixColorScaleMetal,
  RadixColorScale,
  //
  RadixGrayScalePure,
  RadixGrayScaleDesaturated,
  RadixGrayScale,
};
