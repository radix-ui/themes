import type { Color } from '../helpers';

const avatarSizes = ['1', '2', '3', '4', '5'] as const;
type AvatarSize = (typeof avatarSizes)[number];
const defaultAvatarSize: AvatarSize = '3';

const avatarVariants = ['solid', 'solid-mono', 'subtle', 'subtle-mono'] as const;
type AvatarVariant = (typeof avatarVariants)[number];
const defaultAvatarVariant: AvatarVariant = 'subtle';

const defaultAvatarColor: Color | undefined = undefined;

export { avatarSizes, defaultAvatarSize, avatarVariants, defaultAvatarVariant, defaultAvatarColor };
export type { AvatarSize, AvatarVariant };
