import type { ThemeAccentScale, ThemeRadius } from '../theme';

const checkboxSizes = ['1', '2'] as const;
type CheckboxSize = (typeof checkboxSizes)[number];
const checkboxSizeDefault: CheckboxSize = '1';

const checkboxVariants = ['solid'] as const;
type CheckboxVariant = (typeof checkboxVariants)[number];
const checkboxVariantDefault: CheckboxVariant = 'solid';

const checkboxColorDefault: ThemeAccentScale | undefined = undefined;
const checkboxHighContrastDefault: boolean | undefined = undefined;
const checkboxRadiusDefault: ThemeRadius | undefined = undefined;

export {
  checkboxSizes,
  checkboxSizeDefault,
  checkboxVariants,
  checkboxVariantDefault,
  checkboxColorDefault,
  checkboxHighContrastDefault,
  checkboxRadiusDefault,
};
export type { CheckboxSize, CheckboxVariant };
