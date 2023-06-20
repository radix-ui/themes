import type { ColorOrGray } from '../helpers';

const badgeSizes = ['1', '2'] as const;
type BadgeSize = (typeof badgeSizes)[number];
const defaultBadgeSize: BadgeSize = '1';

const badgeVariants = ['surface', 'subtle', 'outline'] as const;
type BadgeVariant = (typeof badgeVariants)[number];
const defaultBadgeVariant: BadgeVariant = 'subtle';

const defaultBadgeColor: ColorOrGray = 'gray';

export { badgeSizes, defaultBadgeSize, badgeVariants, defaultBadgeVariant, defaultBadgeColor };
export type { BadgeSize, BadgeVariant };
