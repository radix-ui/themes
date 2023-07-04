import type { ThemeAccentScale, ThemeRadius } from '../theme-options';

const textFieldSizes = ['1', '2', '3'] as const;
type TextFieldSize = (typeof textFieldSizes)[number];
const textFieldSizeDefault: TextFieldSize = '2';

const textFieldVariants = ['surface', 'soft'] as const;
type TextFieldVariant = (typeof textFieldVariants)[number];
const textFieldVariantDefault: TextFieldVariant = 'surface';

const textFieldColorDefault: ThemeAccentScale | undefined = undefined;
const textFieldRadiusDefault: ThemeRadius | undefined = undefined;

export {
  textFieldSizes,
  textFieldSizeDefault,
  textFieldVariants,
  textFieldVariantDefault,
  textFieldColorDefault,
  textFieldRadiusDefault,
};
export type { TextFieldSize, TextFieldVariant };
