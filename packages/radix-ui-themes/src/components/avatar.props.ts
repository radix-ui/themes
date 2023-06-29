import type { Color, Radius } from '../helpers';

const avatarSizes = ['1', '2', '3', '4', '5'] as const;
type AvatarSize = (typeof avatarSizes)[number];
const defaultAvatarSize: AvatarSize = '3';

const avatarVariants = ['solid', 'subtle'] as const;
type AvatarVariant = (typeof avatarVariants)[number];
const defaultAvatarVariant: AvatarVariant = 'subtle';

const defaultAvatarColor: Color | undefined = undefined;
const defaultAvatarHighContrast: boolean | undefined = undefined;
const defaultAvatarRadius: Radius | undefined = undefined;

export {
  avatarSizes,
  defaultAvatarSize,
  avatarVariants,
  defaultAvatarVariant,
  defaultAvatarColor,
  defaultAvatarHighContrast,
  defaultAvatarRadius,
};
export type { AvatarSize, AvatarVariant };
