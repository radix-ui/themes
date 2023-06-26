import { groupedColors } from './colors';

import type { Color } from './colors';

type ColorScale = Color;

const colorFeelValues = ['neutral', 'natural', 'tinted'] as const;
type ColorFeel = (typeof colorFeelValues)[number];

const grayScaleValues = ['neutral', 'natural'] as const;
type GrayScale = (typeof grayScaleValues)[number];

const radiusValues = ['none', 'small', 'medium', 'large', 'full'] as const;
type Radius = (typeof radiusValues)[number];

const scalingValues = ['90%', '95%', '100%', '105%', '110%'] as const;
type Scaling = (typeof scalingValues)[number];

export { groupedColors, colorFeelValues, grayScaleValues, radiusValues, scalingValues };
export type { ColorScale, ColorFeel, GrayScale, Radius, Scaling };
