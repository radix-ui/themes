import type { ThemeAccentScale, ThemeRadius } from '../theme-options';

const sliderSizes = ['1', '2', '3'] as const;
type SliderSize = (typeof sliderSizes)[number];
const sliderSizeDefault: SliderSize = '2';

const sliderVariants = ['solid', 'soft'] as const;
type SliderVariant = (typeof sliderVariants)[number];
const sliderVariantDefault: SliderVariant = 'solid';

const sliderColorDefault: ThemeAccentScale | undefined = undefined;
const sliderHighContrastDefault: boolean | undefined = undefined;
const sliderRadiusDefault: ThemeRadius | undefined = undefined;

export {
  sliderSizes,
  sliderSizeDefault,
  sliderVariants,
  sliderVariantDefault,
  sliderColorDefault,
  sliderHighContrastDefault,
  sliderRadiusDefault,
};
export type { SliderSize, SliderVariant };
