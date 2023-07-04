import type { ThemeAccentScale } from '../theme-options';

const linkSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type LinkSize = (typeof linkSizes)[number];
const linkSizeDefault: LinkSize | undefined = undefined;

const linkWeights = ['normal', 'bold'] as const;
type LinkWeight = (typeof linkWeights)[number];
const linkWeightDefault: LinkWeight | undefined = undefined;

const linkGap = ['0', '1', '2'] as const;
type LinkGap = (typeof linkGap)[number];
const linkGapDefault: LinkGap | undefined = undefined;

const linkColorDefault: ThemeAccentScale | undefined = undefined;
const linkHighContrastDefault: boolean | undefined = undefined;

export {
  linkSizes,
  linkSizeDefault,
  linkWeights,
  linkWeightDefault,
  linkGap,
  linkGapDefault,
  linkColorDefault,
  linkHighContrastDefault,
};
export type { LinkSize, LinkWeight, LinkGap };
