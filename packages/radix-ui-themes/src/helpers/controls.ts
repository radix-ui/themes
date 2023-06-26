import {
  regularColorScales,
  brightColorScales,
  metalColorScales,
  pureGrayScale,
  desaturatedGrayScales,
} from './color-scales';
import type { ColorScale, GrayScale } from './color-scales';

const groupedColorScales = [
  { label: 'Regulars', scales: [...regularColorScales] as ColorScale[] },
  { label: 'Brights', scales: [...brightColorScales] as ColorScale[] },
  { label: 'Metals', scales: [...metalColorScales] as ColorScale[] },
];

type GrayScaleControl = GrayScale | 'auto';

const groupedGrayScales = [
  { label: 'Pure', scales: [pureGrayScale] as GrayScaleControl[] },
  { label: 'Desaturated', scales: ['auto', ...desaturatedGrayScales] as GrayScaleControl[] },
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
  groupedColorScales,
  groupedGrayScales,
  textColorValues,
  backgroundColorValues,
  radiusValues,
  scalingValues,
};

export type { GrayScaleControl, TextColorControl, BackgroundColorControl, Radius, Scaling };
