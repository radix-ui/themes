import { baseButtonVariants } from './base-button.props';

import type { ThemeAccentScale, ThemeRadius } from '../theme-options';

const selectSizes = ['1', '2'] as const;
type SelectSize = (typeof selectSizes)[number];
const selectSizeDefault: SelectSize = '2';

const selectTriggerVariants = baseButtonVariants;
type SelectTriggerVariant = (typeof selectTriggerVariants)[number];
const selectTriggerVariantDefault: SelectTriggerVariant = 'surface';
const selectTriggerColorDefault: ThemeAccentScale | undefined = undefined;
const selectTriggerHighContrastDefault: boolean | undefined = undefined;

const selectContentVariants = ['solid', 'soft'] as const;
type SelectContentVariant = (typeof selectContentVariants)[number];
const selectContentVariantDefault: SelectContentVariant = 'solid';
const selectContentColorDefault: ThemeAccentScale | undefined = undefined;
const selectContentHighContrastDefault: boolean | undefined = undefined;

const selectRadiusDefault: ThemeRadius | undefined = undefined;

export {
  selectSizes,
  selectSizeDefault,
  selectTriggerVariants,
  selectTriggerVariantDefault,
  selectTriggerColorDefault,
  selectTriggerHighContrastDefault,
  selectContentVariants,
  selectContentVariantDefault,
  selectContentColorDefault,
  selectContentHighContrastDefault,
  selectRadiusDefault,
};
export type { SelectSize, SelectTriggerVariant, SelectContentVariant };
