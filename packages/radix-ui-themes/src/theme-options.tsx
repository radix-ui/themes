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
const panelBackgrounds = ['solid', 'translucent'] as const;
const radii = ['none', 'small', 'medium', 'large', 'full'] as const;
const scalings = ['90%', '95%', '100%', '105%', '110%'] as const;

const themePropDefs = {
  background: { type: 'boolean', default: true },
  appearance: { type: 'enum', values: appearances, default: 'inherit' },
  accentScale: { type: 'enum', values: accentScales, default: 'indigo' },
  grayScale: { type: 'enum', values: grayScales, default: 'auto' },
  panelBackground: { type: 'enum', values: panelBackgrounds, default: 'translucent' },
  radius: { type: 'enum', values: radii, default: 'medium' },
  scaling: { type: 'enum', values: scalings, default: '100%' },
} satisfies {
  background: PropDef<boolean>;
  appearance: PropDef<(typeof appearances)[number]>;
  accentScale: PropDef<(typeof accentScales)[number]>;
  grayScale: PropDef<(typeof grayScales)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number]>;
  radius: PropDef<(typeof radii)[number]>;
  scaling: PropDef<(typeof scalings)[number]>;
};

type ThemeProps = GetPropDefTypes<typeof themePropDefs>;

type ThemeAppearance = NonNullable<ThemeProps['appearance']>;
type ThemeAccentScale = NonNullable<ThemeProps['accentScale']>;
type ThemeGrayScale = NonNullable<ThemeProps['grayScale']>;
type ThemePanelBackground = NonNullable<ThemeProps['panelBackground']>;
type ThemeRadius = NonNullable<ThemeProps['radius']>;
type ThemeScaling = NonNullable<ThemeProps['scaling']>;

type ThemeOptions = {
  appearance: ThemeAppearance;
  accentScale: ThemeAccentScale;
  grayScale: ThemeGrayScale;
  panelBackground: ThemePanelBackground;
  radius: ThemeRadius;
  scaling: ThemeScaling;
};

const themeAccentScalesGrouped = [
  { label: 'Regulars', values: [...radixColorScalesRegular] as ThemeAccentScale[] },
  { label: 'Brights', values: [...radixColorScalesBright] as ThemeAccentScale[] },
  { label: 'Metals', values: [...radixColorScalesMetal] as ThemeAccentScale[] },
  { label: 'Gray', values: ['gray'] as ThemeAccentScale[] },
];

const themeAccentScalesOrdered = [
  'gray',
  'gold',
  'bronze',
  'brown',
  'yellow',
  'amber',
  'orange',
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
  'lime',
  'mint',
  'sky',
] as ThemeAccentScale[];

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
  themeAccentScalesOrdered,
  themeGrayScalesGrouped,
};
export type { ThemeOptions };
