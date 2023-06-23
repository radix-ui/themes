import type { Color, Radius } from '../helpers';

const checkboxSizes = ['1', '2'] as const;
type CheckboxSize = (typeof checkboxSizes)[number];
const defaultCheckboxSize: CheckboxSize = '1';

const checkboxVariants = ['solid', 'solid-mono'] as const;
type CheckboxVariant = (typeof checkboxVariants)[number];
const defaultCheckboxVariant: CheckboxVariant = 'solid';

const defaultCheckboxColor: Color | undefined = undefined;
const defaultCheckboxRadius: Radius | undefined = undefined;

export {
  checkboxSizes,
  defaultCheckboxSize,
  checkboxVariants,
  defaultCheckboxVariant,
  defaultCheckboxColor,
  defaultCheckboxRadius,
};
export type { CheckboxSize, CheckboxVariant };
