import {
  regularColorScales,
  brightColorScales,
  metalColorScales,
  pureGrayScale,
  desaturatedGrayScales,
} from './colors';
import type { Color, GrayScale } from './colors';

const themeModes = ['light', 'dark'] as const;
type ThemeMode = (typeof themeModes)[number];
const defaultThemeMode: ThemeMode = 'light';

const groupedColors = [
  { label: 'Regulars', values: [...regularColorScales] as Color[] },
  { label: 'Brights', values: [...brightColorScales] as Color[] },
  { label: 'Metals', values: [...metalColorScales] as Color[] },
  { label: 'Gray', values: ['gray'] as Color[] },
];
const defaultThemeAccentScale: Color = 'indigo';

type GrayScaleControl = GrayScale | 'auto';
const groupedGrays = [
  { label: 'Pure', values: [pureGrayScale] as GrayScaleControl[] },
  { label: 'Desaturated', values: ['auto', ...desaturatedGrayScales] as GrayScaleControl[] },
];
const defaultThemeGrayScale: GrayScaleControl = 'auto';

const backgroundColorValues = ['auto', 'gray'] as const;
type BackgroundColorControl = (typeof backgroundColorValues)[number];
const defaultThemeBackgroundColor: BackgroundColorControl = 'auto';

const textColorValues = ['auto', 'accent'] as const;
type TextColorControl = (typeof textColorValues)[number];
const defaultThemeTextColor: TextColorControl = 'auto';

const radiusValues = ['none', 'small', 'medium', 'large', 'full'] as const;
type Radius = (typeof radiusValues)[number];
const defaultThemeRadius: Radius = 'medium';

const scalingValues = ['90%', '95%', '100%', '105%', '110%'] as const;
type Scaling = (typeof scalingValues)[number];
const defaultThemeScaling: Scaling = '100%';

export {
  themeModes,
  defaultThemeMode,
  groupedColors,
  defaultThemeAccentScale,
  groupedGrays,
  defaultThemeGrayScale,
  defaultThemeBackgroundColor,
  backgroundColorValues,
  textColorValues,
  defaultThemeTextColor,
  radiusValues,
  defaultThemeRadius,
  scalingValues,
  defaultThemeScaling,
};

export type {
  ThemeMode,
  GrayScaleControl,
  BackgroundColorControl,
  TextColorControl,
  Radius,
  Scaling,
};
