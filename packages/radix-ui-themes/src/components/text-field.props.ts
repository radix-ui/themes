import type { ButtonRadius } from '../helpers';

const textFieldSizes = ['1', '2', '3'] as const;
type TextFieldSize = (typeof textFieldSizes)[number];
const defaultTextFieldSize: TextFieldSize = '2';

const textFieldVariants = ['surface', 'surface-mono', 'subtle-mono'] as const;
type TextFieldVariant = (typeof textFieldVariants)[number];
const defaultTextFieldVariant: TextFieldVariant = 'surface';

const defaultTextFieldRadius: ButtonRadius | undefined = undefined;

export {
  textFieldSizes,
  defaultTextFieldSize,
  textFieldVariants,
  defaultTextFieldVariant,
  defaultTextFieldRadius,
};
export type { TextFieldSize, TextFieldVariant };
