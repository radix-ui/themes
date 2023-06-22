import type { Color, ButtonRadius } from '../helpers';

const baseButtonSizes = ['1', '2', '3'] as const;
type BaseButtonSize = (typeof baseButtonSizes)[number];
const defaultBaseButtonSize: BaseButtonSize = '2';

const baseButtonVariants = [
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
type BaseButtonVariant = (typeof baseButtonVariants)[number];
const defaultBaseButtonVariant: BaseButtonVariant = 'solid';

const defaultBaseButtonColor: Color | undefined = undefined;
const defaultBaseButtonRadius: ButtonRadius | undefined = undefined;

export {
  baseButtonSizes,
  defaultBaseButtonSize,
  baseButtonVariants,
  defaultBaseButtonVariant,
  defaultBaseButtonColor,
  defaultBaseButtonRadius,
};
export type { BaseButtonSize, BaseButtonVariant };
