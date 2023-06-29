import type { Color, Radius } from '../helpers';

const textAreaSizes = ['1', '2', '3'] as const;
type TextAreaSize = (typeof textAreaSizes)[number];
const defaultTextAreaSize: TextAreaSize = '2';

const textAreaVariants = ['surface', 'soft'] as const;
type TextAreaVariant = (typeof textAreaVariants)[number];
const defaultTextAreaVariant: TextAreaVariant = 'surface';

const defaultTextAreaColor: Color | undefined = undefined;
const defaultTextAreaRadius: Radius | undefined = undefined;

export {
  textAreaSizes,
  defaultTextAreaSize,
  textAreaVariants,
  defaultTextAreaVariant,
  defaultTextAreaColor,
  defaultTextAreaRadius,
};
export type { TextAreaSize, TextAreaVariant };
