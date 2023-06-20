import type { ColorOrGray } from '../helpers';

const textSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type TextSize = (typeof textSizes)[number];
const defaultTextSize: TextSize = '3';

const textWeights = ['normal', 'bold'] as const;
type TextWeight = (typeof textWeights)[number];
const defaultTextWeight: TextWeight = 'normal';

const textAlignValues = ['left', 'center', 'right'] as const;
type TextAlign = (typeof textAlignValues)[number];
const defaultTextAlign: TextAlign | undefined = undefined;

const textTrimValues = ['normal', 'start', 'end', 'both'] as const;
type TextTrim = (typeof textTrimValues)[number];
const defaultTextTrim: TextTrim | undefined = undefined;

const defaultTextColor: ColorOrGray | undefined = undefined;

export {
  textSizes,
  defaultTextSize,
  textWeights,
  defaultTextWeight,
  textAlignValues,
  defaultTextAlign,
  textTrimValues,
  defaultTextTrim,
  defaultTextColor,
};
export type { TextSize, TextWeight, TextAlign, TextTrim };
