import type { ThemeAccentScale, ThemeRadius } from '../theme';

const textAreaSizes = ['1', '2', '3'] as const;
type TextAreaSize = (typeof textAreaSizes)[number];
const defaultTextAreaSize: TextAreaSize = '2';

const textAreaVariants = ['surface', 'soft'] as const;
type TextAreaVariant = (typeof textAreaVariants)[number];
const defaultTextAreaVariant: TextAreaVariant = 'surface';

const defaultTextAreaColor: ThemeAccentScale | undefined = undefined;
const defaultTextAreaRadius: ThemeRadius | undefined = undefined;

export {
  textAreaSizes,
  defaultTextAreaSize,
  textAreaVariants,
  defaultTextAreaVariant,
  defaultTextAreaColor,
  defaultTextAreaRadius,
};
export type { TextAreaSize, TextAreaVariant };
