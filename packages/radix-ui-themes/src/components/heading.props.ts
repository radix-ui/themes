import type { ThemeAccentScale } from '../theme-options';

const headingSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type HeadingSize = (typeof headingSizes)[number];
const headingSizeDefault: HeadingSize = '6';

const headingAlignValues = ['left', 'center', 'right'] as const;
type HeadingAlign = (typeof headingAlignValues)[number];
const headingAlignDefault: HeadingAlign | undefined = undefined;

const headingTrimValues = ['normal', 'start', 'end', 'both'] as const;
type HeadingTrim = (typeof headingTrimValues)[number];
const headingTrimDefault: HeadingTrim | undefined = undefined;

const headingColorDefault: ThemeAccentScale | undefined = undefined;
const headingHighContrastDefault: boolean | undefined = undefined;

export {
  headingSizes,
  headingSizeDefault,
  headingAlignValues,
  headingAlignDefault,
  headingTrimValues,
  headingTrimDefault,
  headingColorDefault,
  headingHighContrastDefault,
};
export type { HeadingSize, HeadingAlign, HeadingTrim };
