import type { ThemeAccentScale, ThemeRadius } from '../theme-options';

const switchSizes = ['1', '2', '3'] as const;
type SwitchSize = (typeof switchSizes)[number];
const switchSizeDefault: SwitchSize = '2';

const switchVariants = ['solid'] as const;
type SwitchVariant = (typeof switchVariants)[number];
const switchVariantDefault: SwitchVariant = 'solid';

const switchColorDefault: ThemeAccentScale | undefined = undefined;
const switchHighContrastDefault: boolean | undefined = undefined;
const switchRadiusDefault: ThemeRadius | undefined = undefined;

export {
  switchSizes,
  switchSizeDefault,
  switchVariants,
  switchVariantDefault,
  switchColorDefault,
  switchHighContrastDefault,
  switchRadiusDefault,
};
export type { SwitchSize, SwitchVariant };
