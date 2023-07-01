import type { ThemeAccentScale, ThemeRadius } from '../theme';

const textAreaSizes = ['1', '2', '3'] as const;
type TextAreaSize = (typeof textAreaSizes)[number];
const textAreaSizeDefault: TextAreaSize = '2';

const textAreaVariants = ['surface', 'soft'] as const;
type TextAreaVariant = (typeof textAreaVariants)[number];
const textAreaVariantDefault: TextAreaVariant = 'surface';

const textAreaColorDefault: ThemeAccentScale | undefined = undefined;
const textAreaRadiusDefault: ThemeRadius | undefined = undefined;

export {
  textAreaSizes,
  textAreaSizeDefault,
  textAreaVariants,
  textAreaVariantDefault,
  textAreaColorDefault,
  textAreaRadiusDefault,
};
export type { TextAreaSize, TextAreaVariant };
