import type { ThemeAccentScale } from '../theme';

const radioGroupSizes = ['1', '2'] as const;
type RadioGroupSize = (typeof radioGroupSizes)[number];
const defaultRadioGroupSize: RadioGroupSize = '1';

const radioGroupVariants = ['solid'] as const;
type RadioGroupVariant = (typeof radioGroupVariants)[number];
const defaultRadioGroupVariant: RadioGroupVariant = 'solid';

const defaultRadioGroupColor: ThemeAccentScale | undefined = undefined;
const defaultRadioGroupHighContrast: boolean | undefined = undefined;

export {
  radioGroupSizes,
  defaultRadioGroupSize,
  radioGroupVariants,
  defaultRadioGroupVariant,
  defaultRadioGroupHighContrast,
  defaultRadioGroupColor,
};
export type { RadioGroupSize, RadioGroupVariant };
