import type { ThemeAccentScale } from '../theme';

const badgeSizes = ['1', '2'] as const;
type BadgeSize = (typeof badgeSizes)[number];
const badgeSizeDefault: BadgeSize = '1';

const badgeVariants = ['soft', 'outline', 'surface'] as const;
type BadgeVariant = (typeof badgeVariants)[number];
const badgeVariantDefault: BadgeVariant = 'soft';

const badgeColorDefault: ThemeAccentScale = 'gray';

export { badgeSizes, badgeSizeDefault, badgeVariants, badgeVariantDefault, badgeColorDefault };
export type { BadgeSize, BadgeVariant };
