import type { ColorOrGray } from '../helpers';

const linkSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type LinkSize = (typeof linkSizes)[number];
const defaultLinkSize: LinkSize | undefined = undefined;

const linkVariants = ['default', 'high-contrast'] as const;
type LinkVariant = (typeof linkVariants)[number];
const defaultLinkVariant: LinkVariant = 'default';

const linkWeights = ['normal', 'bold'] as const;
type LinkWeight = (typeof linkWeights)[number];
const defaultLinkWeight: LinkWeight = 'normal';

const linkGap = ['0', '1', '2'] as const;
type LinkGap = (typeof linkGap)[number];
const defaultLinkGap: LinkGap | undefined = undefined;

const defaultLinkColor: ColorOrGray | undefined = undefined;

export {
  linkSizes,
  defaultLinkSize,
  linkVariants,
  defaultLinkVariant,
  linkWeights,
  defaultLinkWeight,
  linkGap,
  defaultLinkGap,
  defaultLinkColor,
};
export type { LinkSize, LinkVariant, LinkWeight, LinkGap };
