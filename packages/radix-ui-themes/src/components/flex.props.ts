const flexDisplayValues = ['none', 'inline-flex', 'flex'] as const;
type FlexDisplay = (typeof flexDisplayValues)[number];
const flexDisplayDefault: FlexDisplay = 'flex';

const flexDirectionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
type FlexDirection = (typeof flexDirectionValues)[number];
const flexDirectionDefault: FlexDirection | undefined = undefined;

const flexAlignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
type FlexAlign = (typeof flexAlignValues)[number];
const flexAlignDefault: FlexAlign | undefined = undefined;

const flexJustifyValues = ['start', 'center', 'end', 'between'] as const;
type FlexJustify = (typeof flexJustifyValues)[number];
const flexJustifyDefault: FlexJustify = 'start';

const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;
type FlexWrap = (typeof flexWrapValues)[number];
const flexWrapDefault: FlexWrap | undefined = undefined;

const flexGapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type FlexGap = (typeof flexGapValues)[number];
const flexGapDefault: FlexGap | undefined = undefined;

export {
  flexDisplayValues,
  flexDisplayDefault,
  flexDirectionValues,
  flexDirectionDefault,
  flexAlignValues,
  flexAlignDefault,
  flexJustifyValues,
  flexJustifyDefault,
  flexWrapValues,
  flexWrapDefault,
  flexGapValues,
  flexGapDefault,
};
export type { FlexDisplay, FlexDirection, FlexAlign, FlexJustify, FlexWrap, FlexGap };
