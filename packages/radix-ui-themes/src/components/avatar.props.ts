import type { ThemeAccentScale, ThemeRadius } from '../theme-options';

const avatarSizes = ['1', '2', '3', '4', '5'] as const;
type AvatarSize = (typeof avatarSizes)[number];
const avatarSizeDefault: AvatarSize = '3';

const avatarVariants = ['solid', 'soft'] as const;
type AvatarVariant = (typeof avatarVariants)[number];
const avatarVariantDefault: AvatarVariant = 'soft';

const avatarColorDefault: ThemeAccentScale | undefined = undefined;
const avatarHighContrastDefault: boolean | undefined = undefined;
const avatarRadiusDefault: ThemeRadius | undefined = undefined;

export {
  avatarSizes,
  avatarSizeDefault,
  avatarVariants,
  avatarVariantDefault,
  avatarColorDefault,
  avatarHighContrastDefault,
  avatarRadiusDefault,
};
export type { AvatarSize, AvatarVariant };
