import type { ThemeAccentScale } from '../theme';

const textSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type TextSize = (typeof textSizes)[number];
const textSizeDefault: TextSize = '3';

const textWeights = ['normal', 'bold'] as const;
type TextWeight = (typeof textWeights)[number];
const textWeightDefault: TextWeight = 'normal';

const textAlignValues = ['left', 'center', 'right'] as const;
type TextAlign = (typeof textAlignValues)[number];
const textAlignDefault: TextAlign | undefined = undefined;

const textTrimValues = ['normal', 'start', 'end', 'both'] as const;
type TextTrim = (typeof textTrimValues)[number];
const textTrimDefault: TextTrim | undefined = undefined;

const textColorDefault: ThemeAccentScale | undefined = undefined;
const textHighContrastDefault: boolean | undefined = undefined;

export {
  textSizes,
  textSizeDefault,
  textWeights,
  textWeightDefault,
  textAlignValues,
  textAlignDefault,
  textTrimValues,
  textTrimDefault,
  textColorDefault,
  textHighContrastDefault,
};
export type { TextSize, TextWeight, TextAlign, TextTrim };
