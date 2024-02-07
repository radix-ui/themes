import {
  radixColorScalesRegular,
  radixColorScalesBright,
  radixColorScalesMetal,
  //
  radixGrayScalePure,
  radixGrayScalesDesaturated,
  radixGrayScales,
  //
  radixGetMatchingGrayScale,
} from './helpers/radix-colors.js';
import type { ThemeProps } from './props/index.js';

type ThemeAppearance = NonNullable<ThemeProps['appearance']>;
type ThemeAccentColor = NonNullable<ThemeProps['accentColor']>;
type ThemeGrayColor = NonNullable<ThemeProps['grayColor']>;
type ThemePanelBackground = NonNullable<ThemeProps['panelBackground']>;
type ThemeRadius = NonNullable<ThemeProps['radius']>;
type ThemeScaling = NonNullable<ThemeProps['scaling']>;

type ThemeOptions = {
  appearance: ThemeAppearance;
  accentColor: ThemeAccentColor;
  grayColor: ThemeGrayColor;
  panelBackground: ThemePanelBackground;
  radius: ThemeRadius;
  scaling: ThemeScaling;
};

const themeAccentColorsGrouped = [
  { label: 'Regulars', values: [...radixColorScalesRegular] as ThemeAccentColor[] },
  { label: 'Brights', values: [...radixColorScalesBright] as ThemeAccentColor[] },
  { label: 'Metals', values: [...radixColorScalesMetal] as ThemeAccentColor[] },
  { label: 'Gray', values: ['gray'] as ThemeAccentColor[] },
];

const themeAccentColorsOrdered = [
  'gray',
  'gold',
  'bronze',
  'brown',
  'yellow',
  'amber',
  'orange',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'lime',
  'mint',
  'sky',
] as ThemeAccentColor[];

const themeGrayColorsGrouped = [
  { label: 'Pure', values: [radixGrayScalePure] as ThemeGrayColor[] },
  { label: 'Desaturated', values: ['auto', ...radixGrayScalesDesaturated] as ThemeGrayColor[] },
];

function getMatchingGrayColor(accentColor: ThemeAccentColor): (typeof radixGrayScales)[number] {
  if (accentColor === 'gray') return 'gray';
  return radixGetMatchingGrayScale(accentColor);
}

export {
  getMatchingGrayColor,
  //
  themeAccentColorsGrouped,
  themeAccentColorsOrdered,
  themeGrayColorsGrouped,
};
export type { ThemeOptions };
