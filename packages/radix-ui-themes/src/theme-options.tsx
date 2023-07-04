import {
  radixColorScalesRegular,
  radixColorScalesBright,
  radixColorScalesMetal,
  radixColorScales,
  radixGrayScalePure,
  radixGrayScalesDesaturated,
  //
  radixGetMatchingGrayScale,
} from './helpers/radix-colors';

import type { RadixGrayScale } from './helpers/radix-colors';

const themeAppearances = ['light', 'dark', 'invert'] as const;
type ThemeAppearance = (typeof themeAppearances)[number];
const themeAppearanceDefault: ThemeAppearance = 'light';

const themeAccentScales = [...radixColorScales, 'gray'] as const;
type ThemeAccentScale = (typeof themeAccentScales)[number];
const themeAccentScalesGrouped = [
  { label: 'Regulars', values: [...radixColorScalesRegular] as ThemeAccentScale[] },
  { label: 'Brights', values: [...radixColorScalesBright] as ThemeAccentScale[] },
  { label: 'Metals', values: [...radixColorScalesMetal] as ThemeAccentScale[] },
  { label: 'Gray', values: ['gray'] as ThemeAccentScale[] },
];
const themeAccentScaleDefault: ThemeAccentScale = 'indigo';

type ThemeGrayScale = RadixGrayScale | 'auto';
const themeGrayScalesGrouped = [
  { label: 'Pure', values: [radixGrayScalePure] as ThemeGrayScale[] },
  { label: 'Desaturated', values: ['auto', ...radixGrayScalesDesaturated] as ThemeGrayScale[] },
];
const themeGrayScaleDefault: ThemeGrayScale = 'auto';

const themeBackgroundColors = ['auto', 'gray'] as const;
type ThemeBackgroundColor = (typeof themeBackgroundColors)[number];
const themeBackgroundColorDefault: ThemeBackgroundColor = 'auto';

const themeTextColors = ['auto', 'accent'] as const;
type ThemeTextColor = (typeof themeTextColors)[number];
const themeTextColorDefault: ThemeTextColor = 'auto';

const themeRadii = ['none', 'small', 'medium', 'large', 'full'] as const;
type ThemeRadius = (typeof themeRadii)[number];
const themeRadiusDefault: ThemeRadius = 'medium';

const themeScalings = ['90%', '95%', '100%', '105%', '110%'] as const;
type ThemeScaling = (typeof themeScalings)[number];
const themeScalingDefault: ThemeScaling = '100%';

type ThemeOptions = {
  appearance: ThemeAppearance;
  accentScale: ThemeAccentScale;
  grayScale: ThemeGrayScale;
  backgroundColor: ThemeBackgroundColor;
  textColor: ThemeTextColor;
  radius: ThemeRadius;
  scaling: ThemeScaling;
};

function getMatchingGrayScale(accentScale: ThemeAccentScale): RadixGrayScale {
  if (accentScale === 'gray') return 'gray';
  return radixGetMatchingGrayScale(accentScale);
}

export {
  themeAppearances,
  themeAppearanceDefault,
  themeAccentScalesGrouped,
  themeAccentScaleDefault,
  themeGrayScalesGrouped,
  themeGrayScaleDefault,
  themeBackgroundColorDefault,
  themeBackgroundColors,
  themeTextColors,
  themeTextColorDefault,
  themeRadii,
  themeRadiusDefault,
  themeScalings,
  themeScalingDefault,
  //
  getMatchingGrayScale,
};

export type {
  ThemeAppearance,
  ThemeAccentScale,
  ThemeGrayScale,
  ThemeBackgroundColor,
  ThemeTextColor,
  ThemeRadius,
  ThemeScaling,
  //
  ThemeOptions,
};
