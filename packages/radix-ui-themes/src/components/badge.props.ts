import type { ThemeAccentScale, ThemeRadius } from '../theme-options';

const badgeSizes = ['1', '2'] as const;
type BadgeSize = (typeof badgeSizes)[number];
const badgeSizeDefault: BadgeSize = '1';

const badgeVariants = ['solid', 'soft', 'outline', 'surface'] as const;
type BadgeVariant = (typeof badgeVariants)[number];
const badgeVariantDefault: BadgeVariant = 'soft';

const badgeColorDefault: ThemeAccentScale = 'gray';
const badgeHighContrastDefault: boolean | undefined = undefined;
const badgeRadiusDefault: ThemeRadius | undefined = undefined;

export {
  badgeSizes,
  badgeSizeDefault,
  badgeVariants,
  badgeVariantDefault,
  badgeColorDefault,
  badgeHighContrastDefault,
  badgeRadiusDefault,
};
export type { BadgeSize, BadgeVariant };
