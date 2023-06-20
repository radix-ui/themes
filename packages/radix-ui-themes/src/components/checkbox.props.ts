import type { Color, ButtonRadius } from '../helpers';

const checkboxSizes = ['1', '2'] as const;
type CheckboxSize = (typeof checkboxSizes)[number];
const defaultCheckboxSize: CheckboxSize = '1';

const checkboxVariants = ['solid', 'solid-mono'] as const;
type CheckboxVariant = (typeof checkboxVariants)[number];
const defaultCheckboxVariant: CheckboxVariant = 'solid';

const defaultCheckboxColor: Color | undefined = undefined;
const defaultCheckboxRadius: ButtonRadius | undefined = undefined;

export {
  checkboxSizes,
  defaultCheckboxSize,
  checkboxVariants,
  defaultCheckboxVariant,
  defaultCheckboxColor,
  defaultCheckboxRadius,
};
export type { CheckboxSize, CheckboxVariant };
