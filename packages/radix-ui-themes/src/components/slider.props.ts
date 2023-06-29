import type { Color, Radius } from '../helpers';

const sliderSizes = ['1', '2', '3'] as const;
type SliderSize = (typeof sliderSizes)[number];
const defaultSliderSize: SliderSize = '2';

const sliderVariants = ['solid', 'soft'] as const;
type SliderVariant = (typeof sliderVariants)[number];
const defaultSliderVariant: SliderVariant = 'solid';

const defaultSliderColor: Color | undefined = undefined;
const defaultSliderHighContrast: boolean | undefined = undefined;
const defaultSliderRadius: Radius | undefined = undefined;

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
