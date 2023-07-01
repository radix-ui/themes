import type { ThemeAccentScale, ThemeRadius } from '../theme';

const baseButtonSizes = ['1', '2', '3'] as const;
type BaseButtonSize = (typeof baseButtonSizes)[number];
const defaultBaseButtonSize: BaseButtonSize = '2';

const baseButtonVariants = ['solid', 'soft', 'ghost', 'outline', 'surface'] as const;
type BaseButtonVariant = (typeof baseButtonVariants)[number];
const defaultBaseButtonVariant: BaseButtonVariant = 'solid';

const defaultBaseButtonColor: ThemeAccentScale | undefined = undefined;
const defaultBaseButtonHighContrast: boolean | undefined = undefined;
const defaultBaseRadius: ThemeRadius | undefined = undefined;

export {
  baseButtonSizes,
  defaultBaseButtonSize,
  baseButtonVariants,
  defaultBaseButtonVariant,
  defaultBaseButtonColor,
  defaultBaseButtonHighContrast,
  defaultBaseRadius,
};
export type { BaseButtonSize, BaseButtonVariant };
