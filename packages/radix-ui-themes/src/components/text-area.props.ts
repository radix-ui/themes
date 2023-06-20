import type { ButtonRadius } from '../helpers';

const textAreaSizes = ['1', '2', '3'] as const;
type TextAreaSize = (typeof textAreaSizes)[number];
const defaultTextAreaSize: TextAreaSize = '2';

const textAreaVariants = ['surface', 'surface-mono', 'subtle-mono'] as const;
type TextAreaVariant = (typeof textAreaVariants)[number];
const defaultTextAreaVariant: TextAreaVariant = 'surface';

const defaultTextAreaRadius: ButtonRadius | undefined = undefined;

export {
  textAreaSizes,
  defaultTextAreaSize,
  textAreaVariants,
  defaultTextAreaVariant,
  defaultTextAreaRadius,
};
export type { TextAreaSize, TextAreaVariant };
