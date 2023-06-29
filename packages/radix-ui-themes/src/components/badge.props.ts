import type { Color } from '../helpers';

const badgeSizes = ['1', '2'] as const;
type BadgeSize = (typeof badgeSizes)[number];
const defaultBadgeSize: BadgeSize = '1';

const badgeVariants = ['soft', 'outline', 'surface'] as const;
type BadgeVariant = (typeof badgeVariants)[number];
const defaultBadgeVariant: BadgeVariant = 'soft';

const defaultBadgeColor: Color = 'gray';

export { badgeSizes, defaultBadgeSize, badgeVariants, defaultBadgeVariant, defaultBadgeColor };
export type { BadgeSize, BadgeVariant };
