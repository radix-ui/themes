import type { Color, ButtonRadius } from '../helpers';

const sliderSizes = ['1', '2', '3'] as const;
type SliderSize = (typeof sliderSizes)[number];
const defaultSliderSize: SliderSize = '2';

const sliderVariants = ['solid', 'solid-mono', 'subtle', 'subtle-mono'] as const;
type SliderVariant = (typeof sliderVariants)[number];
const defaultSliderVariant: SliderVariant = 'solid';

const defaultSliderColor: Color | undefined = undefined;
const defaultSliderRadius: ButtonRadius | undefined = undefined;

export {
  sliderSizes,
  defaultSliderSize,
  sliderVariants,
  defaultSliderVariant,
  defaultSliderColor,
  defaultSliderRadius,
};
export type { SliderSize, SliderVariant };
