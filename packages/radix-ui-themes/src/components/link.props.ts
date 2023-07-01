import type { ThemeAccentScale } from '../theme';

const linkSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type LinkSize = (typeof linkSizes)[number];
const defaultLinkSize: LinkSize | undefined = undefined;

const linkWeights = ['normal', 'bold'] as const;
type LinkWeight = (typeof linkWeights)[number];
const defaultLinkWeight: LinkWeight = 'normal';

const linkGap = ['0', '1', '2'] as const;
type LinkGap = (typeof linkGap)[number];
const defaultLinkGap: LinkGap | undefined = undefined;

const defaultLinkColor: ThemeAccentScale | undefined = undefined;
const defaultLinkHighContrast: boolean | undefined = undefined;

export {
  linkSizes,
  defaultLinkSize,
  linkWeights,
  defaultLinkWeight,
  linkGap,
  defaultLinkGap,
  defaultLinkColor,
  defaultLinkHighContrast,
};
export type { LinkSize, LinkWeight, LinkGap };
