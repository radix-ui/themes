// prettier-ignore
const radixColorScalesRegular = ['tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'brown', 'orange' ] as const;
const radixColorScalesBright = ['sky', 'mint', 'lime', 'yellow', 'amber'] as const;
const radixColorScalesMetal = ['gold', 'bronze'] as const;
// prettier-ignore
const radixColorScales = [...radixColorScalesRegular, ...radixColorScalesBright, ...radixColorScalesMetal] as const;
const radixGrayScalePure = 'gray' as const;
const radixGrayScalesDesaturated = ['mauve', 'slate', 'sage', 'olive', 'sand'] as const;
const radixGrayScales = [radixGrayScalePure, ...radixGrayScalesDesaturated] as const;

function radixGetMatchingGrayScale(
  colorScale: (typeof radixColorScales)[number]
): (typeof radixGrayScales)[number] {
  switch (colorScale) {
    case 'tomato':
    case 'red':
    case 'ruby':
    case 'crimson':
    case 'pink':
    case 'plum':
    case 'purple':
    case 'violet':
      return 'mauve';
    case 'iris':
    case 'indigo':
    case 'blue':
    case 'sky':
    case 'cyan':
      return 'slate';
    case 'teal':
    case 'jade':
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
