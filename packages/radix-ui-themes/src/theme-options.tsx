import {
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
} from './helpers/radix-colors';
import type { GetPropDefTypes, PropDef } from './helpers';

const appearances = ['inherit', 'light', 'dark'] as const;
const accentScales = [...radixColorScales, 'gray'] as const;
const grayScales = [...radixGrayScales, 'auto'] as const;
const backgroundColors = ['auto', 'gray'] as const;
const textColors = ['auto', 'accent'] as const;
const radii = ['none', 'small', 'medium', 'large', 'full'] as const;
const scalings = ['90%', '95%', '100%', '105%', '110%'] as const;

const themePropDefs = {
  appearance: { type: 'enum', values: appearances, default: 'inherit' },
  accentScale: { type: 'enum', values: accentScales, default: 'indigo' },
  grayScale: { type: 'enum', values: grayScales, default: 'auto' },
  backgroundColor: { type: 'enum', values: backgroundColors, default: 'auto' },
  applyBackgroundColor: { type: 'boolean', default: true },
  textColor: { type: 'enum', values: textColors, default: 'auto' },
  radius: { type: 'enum', values: radii, default: 'medium' },
  scaling: { type: 'enum', values: scalings, default: '100%' },
} satisfies {
  appearance: PropDef<(typeof appearances)[number]>;
  accentScale: PropDef<(typeof accentScales)[number]>;
  grayScale: PropDef<(typeof grayScales)[number]>;
  backgroundColor: PropDef<(typeof backgroundColors)[number]>;
  applyBackgroundColor: PropDef<boolean>;
  textColor: PropDef<(typeof textColors)[number]>;
  radius: PropDef<(typeof radii)[number]>;
  scaling: PropDef<(typeof scalings)[number]>;
};

type ThemeProps = GetPropDefTypes<typeof themePropDefs>;

type ThemeAppearance = NonNullable<ThemeProps['appearance']>;
type ThemeAccentScale = NonNullable<ThemeProps['accentScale']>;
type ThemeGrayScale = NonNullable<ThemeProps['grayScale']>;
type ThemeBackgroundColor = NonNullable<ThemeProps['backgroundColor']>;
type ThemeTextColor = NonNullable<ThemeProps['textColor']>;
type ThemeRadius = NonNullable<ThemeProps['radius']>;
type ThemeScaling = NonNullable<ThemeProps['scaling']>;

type ThemeOptions = {
  appearance: ThemeAppearance;
  accentScale: ThemeAccentScale;
  grayScale: ThemeGrayScale;
  backgroundColor: ThemeBackgroundColor;
  textColor: ThemeTextColor;
  radius: ThemeRadius;
  scaling: ThemeScaling;
};

const themeAccentScalesGrouped = [
  { label: 'Regulars', values: [...radixColorScalesRegular] as ThemeAccentScale[] },
  { label: 'Brights', values: [...radixColorScalesBright] as ThemeAccentScale[] },
  { label: 'Metals', values: [...radixColorScalesMetal] as ThemeAccentScale[] },
  { label: 'Gray', values: ['gray'] as ThemeAccentScale[] },
];

const themeGrayScalesGrouped = [
  { label: 'Pure', values: [radixGrayScalePure] as ThemeGrayScale[] },
  { label: 'Desaturated', values: ['auto', ...radixGrayScalesDesaturated] as ThemeGrayScale[] },
];

function getMatchingGrayScale(accentScale: ThemeAccentScale): (typeof radixGrayScales)[number] {
  if (accentScale === 'gray') return 'gray';
  return radixGetMatchingGrayScale(accentScale);
}

export {
  themePropDefs,
  getMatchingGrayScale,
  //
  themeAccentScalesGrouped,
  themeGrayScalesGrouped,
};
export type { ThemeOptions };
