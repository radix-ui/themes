import type { ThemeAccentScale, ThemeRadius } from '../theme';

const baseButtonSizes = ['1', '2', '3'] as const;
type BaseButtonSize = (typeof baseButtonSizes)[number];
const baseButtonSizeDefault: BaseButtonSize = '2';

const baseButtonVariants = ['solid', 'soft', 'ghost', 'outline', 'surface'] as const;
type BaseButtonVariant = (typeof baseButtonVariants)[number];
const baseButtonVariantDefault: BaseButtonVariant = 'solid';

const baseButtonColorDefault: ThemeAccentScale | undefined = undefined;
const baseButtonHighContrastDefault: boolean | undefined = undefined;
const defaultBaseRadius: ThemeRadius | undefined = undefined;

export {
  baseButtonSizes,
  baseButtonSizeDefault,
  baseButtonVariants,
  baseButtonVariantDefault,
  baseButtonColorDefault,
  baseButtonHighContrastDefault,
  defaultBaseRadius,
};
export type { BaseButtonSize, BaseButtonVariant };
