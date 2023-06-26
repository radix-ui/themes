import {
  regularColorScales,
  brightColorScales,
  metalColorScales,
  pureGrayScale,
  desaturatedGrayScales,
} from './colors';
import type { Color, GrayScale } from './colors';

const groupedColors = [
  { label: 'Regulars', values: [...regularColorScales] as Color[] },
  { label: 'Brights', values: [...brightColorScales] as Color[] },
  { label: 'Metals', values: [...metalColorScales] as Color[] },
  { label: 'Gray', values: ['gray'] as Color[] },
];

type GrayScaleControl = GrayScale | 'auto';

const groupedGrays = [
  { label: 'Pure', values: [pureGrayScale] as GrayScaleControl[] },
  { label: 'Desaturated', values: ['auto', ...desaturatedGrayScales] as GrayScaleControl[] },
];

const backgroundColorValues = ['auto', 'gray'] as const;
type BackgroundColorControl = (typeof backgroundColorValues)[number];

const textColorValues = ['auto', 'accent'] as const;
type TextColorControl = (typeof textColorValues)[number];

const radiusValues = ['none', 'small', 'medium', 'large', 'full'] as const;
type Radius = (typeof radiusValues)[number];

const scalingValues = ['90%', '95%', '100%', '105%', '110%'] as const;
type Scaling = (typeof scalingValues)[number];

export {
  groupedColors,
  groupedGrays,
  textColorValues,
  backgroundColorValues,
  radiusValues,
  scalingValues,
};

export type { GrayScaleControl, TextColorControl, BackgroundColorControl, Radius, Scaling };
