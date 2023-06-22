import type { Color, ButtonRadius } from '../helpers';

const selectSizes = ['1', '2'] as const;
type SelectSize = (typeof selectSizes)[number];
const defaultSelectSize: SelectSize = '2';

const selectTriggerVariants = [
  'solid',
  'solid-mono',
  'subtle',
  'subtle-mono',
  'outline',
  'outline-mono',
  'surface',
  'surface-mono',
  'ghost',
  'ghost-mono',
] as const;
type SelectTriggerVariant = (typeof selectTriggerVariants)[number];
const defaultSelectTriggerVariant: SelectTriggerVariant = 'surface';

const selectMenuVariants = ['solid', 'solid-mono', 'subtle', 'subtle-mono'] as const;
type SelectMenuVariant = (typeof selectMenuVariants)[number];
const defaultSelectMenuVariant: SelectMenuVariant = 'solid';

const defaultSelectColor: Color | undefined = undefined;
const defaultSelectRadius: ButtonRadius | undefined = undefined;

export {
  selectSizes,
  defaultSelectSize,
  selectTriggerVariants,
  defaultSelectTriggerVariant,
  selectMenuVariants,
  defaultSelectMenuVariant,
  defaultSelectColor,
  defaultSelectRadius,
};
export type { SelectSize, SelectTriggerVariant, SelectMenuVariant };
