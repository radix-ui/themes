import type { ThemeAccentScale, ThemeRadius } from '../theme';

const sliderSizes = ['1', '2', '3'] as const;
type SliderSize = (typeof sliderSizes)[number];
const defaultSliderSize: SliderSize = '2';

const sliderVariants = ['solid', 'soft'] as const;
type SliderVariant = (typeof sliderVariants)[number];
const defaultSliderVariant: SliderVariant = 'solid';

const defaultSliderColor: ThemeAccentScale | undefined = undefined;
const defaultSliderHighContrast: boolean | undefined = undefined;
const defaultSliderRadius: ThemeRadius | undefined = undefined;

export {
  sliderSizes,
  defaultSliderSize,
  sliderVariants,
  defaultSliderVariant,
  defaultSliderColor,
  defaultSliderHighContrast,
  defaultSliderRadius,
};
export type { SliderSize, SliderVariant };
