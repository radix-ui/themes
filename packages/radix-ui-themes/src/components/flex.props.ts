const flexDisplayValues = ['none', 'inline-flex', 'flex'] as const;
type FlexDisplay = (typeof flexDisplayValues)[number];
const defaultFlexDisplay: FlexDisplay = 'flex';

const flexDirectionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
type FlexDirection = (typeof flexDirectionValues)[number];
const defaultFlexDirection: FlexDirection | undefined = undefined;

const flexAlignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
type FlexAlign = (typeof flexAlignValues)[number];
const defaultFlexAlign: FlexAlign | undefined = undefined;

const flexJustifyValues = ['start', 'center', 'end', 'between'] as const;
type FlexJustify = (typeof flexJustifyValues)[number];
const defaultFlexJustify: FlexJustify = 'start';

const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;
type FlexWrap = (typeof flexWrapValues)[number];
const defaultFlexWrap: FlexWrap | undefined = undefined;

const flexGapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type FlexGap = (typeof flexGapValues)[number];
const defaultFlexGap: FlexGap | undefined = undefined;

export {
  flexDisplayValues,
  defaultFlexDisplay,
  flexDirectionValues,
  defaultFlexDirection,
  flexAlignValues,
  defaultFlexAlign,
  flexJustifyValues,
  defaultFlexJustify,
  flexWrapValues,
  defaultFlexWrap,
  flexGapValues,
  defaultFlexGap,
};
export type { FlexDisplay, FlexDirection, FlexAlign, FlexJustify, FlexWrap, FlexGap };
