import type { ThemeAccentScale } from '../theme';

const headingSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type HeadingSize = (typeof headingSizes)[number];
const headingSizeDefault: HeadingSize = '6';

const headingTrimValues = ['normal', 'start', 'end', 'both'] as const;
type HeadingTrim = (typeof headingTrimValues)[number];
const headingTrimDefault: HeadingTrim | undefined = undefined;

const headingColorDefault: ThemeAccentScale | undefined = undefined;

export {
  headingSizes,
  headingSizeDefault,
  headingTrimValues,
  headingTrimDefault,
  headingColorDefault,
};
export type { HeadingSize, HeadingTrim };
