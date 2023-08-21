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
const accentColors = [...radixColorScales, 'gray'] as const;
const grayColors = [...radixGrayScales, 'auto'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const radii = ['none', 'small', 'medium', 'large', 'full'] as const;
const scalings = ['90%', '95%', '100%', '105%', '110%'] as const;

const themePropDefs = {
  hasBackground: { type: 'boolean', default: true },
  appearance: { type: 'enum', values: appearances, default: 'inherit' },
  accentColor: { type: 'enum', values: accentColors, default: 'indigo' },
  grayColor: { type: 'enum', values: grayColors, default: 'auto' },
  panelBackground: { type: 'enum', values: panelBackgrounds, default: 'translucent' },
  radius: { type: 'enum', values: radii, default: 'medium' },
  scaling: { type: 'enum', values: scalings, default: '100%' },
} satisfies {
  hasBackground: PropDef<boolean>;
  appearance: PropDef<(typeof appearances)[number]>;
  accentColor: PropDef<(typeof accentColors)[number]>;
  grayColor: PropDef<(typeof grayColors)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number]>;
  radius: PropDef<(typeof radii)[number]>;
  scaling: PropDef<(typeof scalings)[number]>;
};

type ThemeProps = GetPropDefTypes<typeof themePropDefs>;

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
  themePropDefs,
  getMatchingGrayColor,
  //
  themeAccentColorsGrouped,
  themeAccentColorsOrdered,
  themeGrayColorsGrouped,
};
export type { ThemeOptions };
