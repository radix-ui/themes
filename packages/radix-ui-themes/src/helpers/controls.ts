import { colorScalesByGroup } from './colors';

import type { Color } from './colors';

type ColorScale = Color;

const colorFeelValues = ['neutral', 'natural', 'tinted'] as const;
type ColorFeel = (typeof colorFeelValues)[number];

const grayScaleValues = ['neutral', 'natural'] as const;
type GrayScale = (typeof grayScaleValues)[number];

const buttonRadiusValues = ['none', 'small', 'medium', 'large', 'full'] as const;
type ButtonRadius = (typeof buttonRadiusValues)[number];

const scalingValues = ['smaller', 'small', 'regular', 'large', 'larger'] as const;
type Scaling = (typeof scalingValues)[number];

export { colorScalesByGroup, colorFeelValues, grayScaleValues, buttonRadiusValues, scalingValues };
export type { ColorScale, ColorFeel, GrayScale, ButtonRadius, Scaling };
