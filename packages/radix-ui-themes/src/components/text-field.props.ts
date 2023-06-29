import type { Color, Radius } from '../helpers';

const textFieldSizes = ['1', '2', '3'] as const;
type TextFieldSize = (typeof textFieldSizes)[number];
const defaultTextFieldSize: TextFieldSize = '2';

const textFieldVariants = ['surface', 'soft'] as const;
type TextFieldVariant = (typeof textFieldVariants)[number];
const defaultTextFieldVariant: TextFieldVariant = 'surface';

const defaultTextFieldColor: Color | undefined = undefined;
const defaultTextFieldRadius: Radius | undefined = undefined;

export {
  textFieldSizes,
  defaultTextFieldSize,
  textFieldVariants,
  defaultTextFieldVariant,
  defaultTextFieldColor,
  defaultTextFieldRadius,
};
export type { TextFieldSize, TextFieldVariant };
