import type { ThemeAccentScale } from '../theme-options';

const radioGroupSizes = ['1', '2'] as const;
type RadioGroupSize = (typeof radioGroupSizes)[number];
const radioGroupSizeDefault: RadioGroupSize = '1';

const radioGroupVariants = ['solid'] as const;
type RadioGroupVariant = (typeof radioGroupVariants)[number];
const radioGroupVariantDefault: RadioGroupVariant = 'solid';

const radioGroupColorDefault: ThemeAccentScale | undefined = undefined;
const radioGroupHighContrastDefault: boolean | undefined = undefined;

export {
  radioGroupSizes,
  radioGroupSizeDefault,
  radioGroupVariants,
  radioGroupVariantDefault,
  radioGroupHighContrastDefault,
  radioGroupColorDefault,
};
export type { RadioGroupSize, RadioGroupVariant };
