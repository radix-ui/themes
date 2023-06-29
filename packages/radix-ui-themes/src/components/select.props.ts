import { baseButtonVariants } from './base-button.props';

import type { Color, Radius } from '../helpers';

const selectSizes = ['1', '2'] as const;
type SelectSize = (typeof selectSizes)[number];
const defaultSelectSize: SelectSize = '2';

const selectTriggerVariants = baseButtonVariants;
type SelectTriggerVariant = (typeof selectTriggerVariants)[number];
const defaultSelectTriggerVariant: SelectTriggerVariant = 'surface';
const defaultSelectTriggerColor: Color | undefined = undefined;
const defaultSelectTriggerHighContrast: boolean | undefined = undefined;

const selectContentVariants = ['solid', 'subtle'] as const;
type SelectContentVariant = (typeof selectContentVariants)[number];
const defaultSelectContentVariant: SelectContentVariant = 'solid';
const defaultSelectContentColor: Color | undefined = undefined;
const defaultSelectContentHighContrast: boolean | undefined = undefined;

const defaultSelectRadius: Radius | undefined = undefined;

export {
  selectSizes,
  defaultSelectSize,
  selectTriggerVariants,
  defaultSelectTriggerVariant,
  defaultSelectTriggerColor,
  defaultSelectTriggerHighContrast,
  selectContentVariants,
  defaultSelectContentVariant,
  defaultSelectContentColor,
  defaultSelectContentHighContrast,
  defaultSelectRadius,
};
export type { SelectSize, SelectTriggerVariant, SelectContentVariant };
