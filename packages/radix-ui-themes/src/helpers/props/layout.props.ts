import classNames from 'classnames';
import { withBreakpoints, getResponsiveStyles } from '../breakpoints';
import { styles } from '../styles';

import type { PropDef, GetPropDefTypes } from './prop-def';

const positiveNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const paddingValues = ['0', ...positiveNumbers] as const;

const paddingPropDefs = {
  p: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  px: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  py: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pt: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pr: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pb: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pl: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
} satisfies {
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
};

type PaddingProps = GetPropDefTypes<typeof paddingPropDefs>;

function extractPaddingProps<T extends PaddingProps>(props: T) {
  const {
    p = layoutPropDefs.p.default,
    px = layoutPropDefs.px.default,
    py = layoutPropDefs.py.default,
    pt = layoutPropDefs.pt.default,
    pr = layoutPropDefs.pr.default,
    pb = layoutPropDefs.pb.default,
    pl = layoutPropDefs.pl.default,
    ...rest
  } = props;
  return { p, px, py, pt, pr, pb, pl, rest };
}

function withPaddingProps(props: PaddingProps) {
  return [
    withBreakpoints(props.p, 'rt-r-p'),
    withBreakpoints(props.px, 'rt-r-px'),
    withBreakpoints(props.py, 'rt-r-py'),
    withBreakpoints(props.pt, 'rt-r-pt'),
    withBreakpoints(props.pr, 'rt-r-pr'),
    withBreakpoints(props.pb, 'rt-r-pb'),
    withBreakpoints(props.pl, 'rt-r-pl'),
  ]
    .filter(Boolean)
    .join(' ');
}

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;
const positionEdgeValues = ['auto', '0', '50%', '100%'] as const;
// prettier-ignore
const widthHeightValues = ['auto', 'min-content', 'max-content', '100%', '0', ...positiveNumbers] as const;
const flexShrinkValues = ['0', '1'] as const;
const flexGrowValues = ['0', '1'] as const;

const gridColumnValues = positiveNumbers;
const gridRowValues = positiveNumbers;
const gridColumnStartValues = positiveNumbers;
const gridColumnEndValues = positiveNumbers;
const gridRowStartValues = positiveNumbers;
const gridRowEndValues = positiveNumbers;

const layoutPropDefs = {
  ...paddingPropDefs,
  position: { type: 'enum', values: positionValues, default: undefined, responsive: true },
  inset: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  top: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  right: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  bottom: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  left: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  width: { type: 'enum', values: widthHeightValues, default: undefined, responsive: true },
  height: { type: 'enum', values: widthHeightValues, default: undefined, responsive: true },
  shrink: { type: 'enum', values: flexShrinkValues, default: undefined, responsive: true },
  grow: { type: 'enum', values: flexGrowValues, default: undefined, responsive: true },
  gridColumn: {
    type: 'enum | string',
    values: gridColumnValues,
    default: undefined,
    responsive: true,
    wide: true,
  },
  gridColumnStart: {
    type: 'enum | string',
    values: gridColumnStartValues,
    default: undefined,
    responsive: true,
    wide: true,
  },
  gridColumnEnd: {
    type: 'enum | string',
    values: gridColumnEndValues,
    default: undefined,
    responsive: true,
    wide: true,
  },
  gridRow: {
    type: 'enum | string',
    values: gridRowValues,
    default: undefined,
    responsive: true,
    wide: true,
  },
  gridRowStart: {
    type: 'enum | string',
    values: gridRowStartValues,
    default: undefined,
    responsive: true,
    wide: true,
  },
  gridRowEnd: {
    type: 'enum | string',
    values: gridRowEndValues,
    default: undefined,
    responsive: true,
    wide: true,
  },
} satisfies {
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
  position: PropDef<(typeof positionValues)[number]>;
  inset: PropDef<(typeof positionEdgeValues)[number]>;
  top: PropDef<(typeof positionEdgeValues)[number]>;
  right: PropDef<(typeof positionEdgeValues)[number]>;
  bottom: PropDef<(typeof positionEdgeValues)[number]>;
  left: PropDef<(typeof positionEdgeValues)[number]>;
  width: PropDef<(typeof widthHeightValues)[number]>;
  height: PropDef<(typeof widthHeightValues)[number]>;
  shrink: PropDef<(typeof flexShrinkValues)[number]>;
  grow: PropDef<(typeof flexGrowValues)[number]>;
  gridColumn: PropDef<(typeof gridColumnValues)[number]>;
  gridColumnStart: PropDef<(typeof gridColumnStartValues)[number]>;
  gridColumnEnd: PropDef<(typeof gridColumnEndValues)[number]>;
  gridRow: PropDef<(typeof gridRowValues)[number]>;
  gridRowStart: PropDef<(typeof gridRowStartValues)[number]>;
  gridRowEnd: PropDef<(typeof gridRowEndValues)[number]>;
};

type LayoutProps = GetPropDefTypes<typeof layoutPropDefs>;

function extractLayoutProps<T extends LayoutProps>(props: T) {
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(props);
  const {
    position = layoutPropDefs.position.default,
    width = layoutPropDefs.width.default,
    height = layoutPropDefs.height.default,
    inset = layoutPropDefs.inset.default,
    top = layoutPropDefs.top.default,
    bottom = layoutPropDefs.bottom.default,
    left = layoutPropDefs.left.default,
    right = layoutPropDefs.right.default,
    shrink = layoutPropDefs.shrink.default,
    grow = layoutPropDefs.grow.default,
    gridColumn = layoutPropDefs.gridColumn.default,
    gridColumnStart = layoutPropDefs.gridColumnStart.default,
    gridColumnEnd = layoutPropDefs.gridColumnEnd.default,
    gridRow = layoutPropDefs.gridRow.default,
    gridRowStart = layoutPropDefs.gridRowStart.default,
    gridRowEnd = layoutPropDefs.gridRowEnd.default,
    ...rest
  } = paddingRest;
  return {
    ...paddingProps,
    position,
    width,
    height,
    inset,
    top,
    bottom,
    left,
    right,
    shrink,
    grow,
    gridColumn,
    gridColumnStart,
    gridColumnEnd,
    gridRow,
    gridRowStart,
    gridRowEnd,
    rest,
  };
}

function withLayoutProps(props: LayoutProps) {
  return classNames(
    withPaddingProps(props),
    withBreakpoints(props.position, 'rt-r-position'),
    withBreakpoints(props.shrink, 'rt-r-fs'),
    withBreakpoints(props.grow, 'rt-r-fg'),
    withBreakpoints(props.width, 'rt-r-w'),
    withBreakpoints(props.height, 'rt-r-h'),
    withBreakpoints(props.inset, 'rt-r-inset'),
    withBreakpoints(props.top, 'rt-r-top'),
    withBreakpoints(props.bottom, 'rt-r-bottom'),
    withBreakpoints(props.left, 'rt-r-left'),
    withBreakpoints(props.right, 'rt-r-right')
  );
}

function getLayoutStyles(props: LayoutProps) {
  const baseLayoutClassNamess = withLayoutProps(props);

  const [gridColumnClassNames, gridColumnCustomProperties] = getResponsiveStyles({
    allowAribtraryValues: true,
    className: 'rt-r-gc',
    customProperty: '--grid-column',
    value: props.gridColumn,
    values: layoutPropDefs.gridColumn.values,
  });

  const [gridColumnStartClassNames, gridColumnStartCustomProperties] = getResponsiveStyles({
    allowAribtraryValues: true,
    className: 'rt-r-gcs',
    customProperty: '--grid-column-start',
    value: props.gridColumnStart,
    values: layoutPropDefs.gridColumnStart.values,
  });

  const [gridColumnEndClassNames, gridColumnEndCustomProperties] = getResponsiveStyles({
    allowAribtraryValues: true,
    className: 'rt-r-gce',
    customProperty: '--grid-column-end',
    value: props.gridColumnEnd,
    values: layoutPropDefs.gridColumnEnd.values,
  });

  const [gridRowClassNames, gridRowCustomProperties] = getResponsiveStyles({
    allowAribtraryValues: true,
    className: 'rt-r-gr',
    customProperty: '--grid-row',
    value: props.gridRow,
    values: layoutPropDefs.gridRow.values,
  });

  const [gridRowStartClassNames, gridRowStartCustomProperties] = getResponsiveStyles({
    allowAribtraryValues: true,
    className: 'rt-r-grs',
    customProperty: '--grid-row-start',
    value: props.gridRowStart,
    values: layoutPropDefs.gridRowStart.values,
  });

  const [gridRowEndClassNames, gridRowEndCustomProperties] = getResponsiveStyles({
    allowAribtraryValues: true,
    className: 'rt-r-gre',
    customProperty: '--grid-row-end',
    value: props.gridRowEnd,
    values: layoutPropDefs.gridRowEnd.values,
  });

  return [
    classNames(
      baseLayoutClassNamess,
      gridColumnClassNames,
      gridColumnStartClassNames,
      gridColumnEndClassNames,
      gridRowClassNames,
      gridRowStartClassNames,
      gridRowEndClassNames
    ),
    styles(
      gridColumnCustomProperties,
      gridColumnStartCustomProperties,
      gridColumnEndCustomProperties,
      gridRowCustomProperties,
      gridRowStartCustomProperties,
      gridRowEndCustomProperties
    ),
  ] as const;
}

export {
  paddingPropDefs,
  extractPaddingProps,
  withPaddingProps,
  layoutPropDefs,
  extractLayoutProps,
  withLayoutProps,
  getLayoutStyles,
};

export type { PaddingProps, LayoutProps };
