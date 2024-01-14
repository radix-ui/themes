import classNames from 'classnames';
import { getResponsiveClassNames, getResponsiveStyles } from '../responsive';
import { mergeStyles } from '../merge-styles';
import { extractPaddingProps, getPaddingStyles, paddingPropDefs } from './padding.props';
import type { PropDef, GetPropDefTypes } from './prop-def';
import { extractHeightProps, getHeightStyles, heightPropDefs } from './height.props';
import { extractWidthProps, getWidthStyles, widthPropDefs } from './width.props';

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;
// prettier-ignore
const positionEdgeValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9'] as const;
const flexShrinkValues = ['0', '1'] as const;
const flexGrowValues = ['0', '1'] as const;

const layoutPropDefs = {
  ...paddingPropDefs,
  ...widthPropDefs,
  ...heightPropDefs,
  position: {
    type: 'enum',
    className: 'rt-r-position',
    values: positionValues,
    default: undefined,
    responsive: true,
  },
  inset: {
    type: 'enum | string',
    className: 'rt-r-inset',
    customProperty: '--inset',
    values: positionEdgeValues,
    default: undefined,
    responsive: true,
  },
  top: {
    type: 'enum | string',
    className: 'rt-r-top',
    customProperty: '--top',
    values: positionEdgeValues,
    default: undefined,
    responsive: true,
  },
  right: {
    type: 'enum | string',
    className: 'rt-r-right',
    customProperty: '--right',
    values: positionEdgeValues,
    default: undefined,
    responsive: true,
  },
  bottom: {
    type: 'enum | string',
    className: 'rt-r-bottom',
    customProperty: '--bottom',
    values: positionEdgeValues,
    default: undefined,
    responsive: true,
  },
  left: {
    type: 'enum | string',
    className: 'rt-r-left',
    customProperty: '--left',
    values: positionEdgeValues,
    default: undefined,
    responsive: true,
  },
  flexBasis: {
    type: 'string',
    className: 'rt-r-fb',
    customProperty: '--flex-basis',
    default: undefined,
    responsive: true,
  },
  flexShrink: {
    type: 'enum | string',
    className: 'rt-r-fs',
    customProperty: '--flex-shrink',
    values: flexShrinkValues,
    default: undefined,
    responsive: true,
  },
  flexGrow: {
    type: 'enum | string',
    className: 'rt-r-fg',
    customProperty: '--flex-grow',
    values: flexGrowValues,
    default: undefined,
    responsive: true,
  },
  gridColumn: {
    type: 'string',
    className: 'rt-r-gc',
    customProperty: '--grid-column',
    default: undefined,
    responsive: true,
  },
  gridColumnStart: {
    type: 'string',
    className: 'rt-r-gcs',
    customProperty: '--grid-column-start',
    default: undefined,
    responsive: true,
  },
  gridColumnEnd: {
    type: 'string',
    className: 'rt-r-gce',
    customProperty: '--grid-column-end',
    default: undefined,
    responsive: true,
  },
  gridRow: {
    type: 'string',
    className: 'rt-r-gr',
    customProperty: '--grid-row',
    default: undefined,
    responsive: true,
  },
  gridRowStart: {
    type: 'string',
    className: 'rt-r-grs',
    customProperty: '--grid-row-start',
    default: undefined,
    responsive: true,
  },
  gridRowEnd: {
    type: 'string',
    className: 'rt-r-gre',
    customProperty: '--grid-row-end',
    default: undefined,
    responsive: true,
  },
} satisfies {
  position: PropDef<(typeof positionValues)[number]>;
  inset: PropDef<(typeof positionEdgeValues)[number]>;
  top: PropDef<(typeof positionEdgeValues)[number]>;
  right: PropDef<(typeof positionEdgeValues)[number]>;
  bottom: PropDef<(typeof positionEdgeValues)[number]>;
  left: PropDef<(typeof positionEdgeValues)[number]>;
  flexBasis: PropDef<string>;
  flexShrink: PropDef<(typeof flexShrinkValues)[number]>;
  flexGrow: PropDef<(typeof flexGrowValues)[number]>;
  gridColumn: PropDef<string>;
  gridColumnStart: PropDef<string>;
  gridColumnEnd: PropDef<string>;
  gridRow: PropDef<string>;
  gridRowStart: PropDef<string>;
  gridRowEnd: PropDef<string>;
};

type LayoutProps = GetPropDefTypes<typeof layoutPropDefs> & {
  /** @deprecated Rename this prop to `flexShrink`. The `shrink` prop will be removed in the next major release. */
  shrink?: GetPropDefTypes<typeof layoutPropDefs>['flexShrink'];
  /** @deprecated Rename this prop to `flexGrow`. The `grow` prop will be removed in the next major release. */
  grow?: GetPropDefTypes<typeof layoutPropDefs>['flexGrow'];
};

function extractLayoutProps<T extends LayoutProps>(props: T) {
  const { rest: widthRest, ...widthProps } = extractWidthProps(props);
  const { rest: heightRest, ...heightProps } = extractHeightProps(widthRest);
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(heightRest);
  const {
    position = layoutPropDefs.position.default,
    inset = layoutPropDefs.inset.default,
    top = layoutPropDefs.top.default,
    bottom = layoutPropDefs.bottom.default,
    left = layoutPropDefs.left.default,
    right = layoutPropDefs.right.default,
    shrink = layoutPropDefs.flexShrink.default,
    grow = layoutPropDefs.flexGrow.default,
    flexBasis = layoutPropDefs.flexBasis.default,
    flexShrink = layoutPropDefs.flexShrink.default,
    flexGrow = layoutPropDefs.flexGrow.default,
    gridColumn = layoutPropDefs.gridColumn.default,
    gridColumnStart = layoutPropDefs.gridColumnStart.default,
    gridColumnEnd = layoutPropDefs.gridColumnEnd.default,
    gridRow = layoutPropDefs.gridRow.default,
    gridRowStart = layoutPropDefs.gridRowStart.default,
    gridRowEnd = layoutPropDefs.gridRowEnd.default,
    ...rest
  } = paddingRest;
  return {
    ...widthProps,
    ...heightProps,
    ...paddingProps,
    position,
    inset,
    top,
    bottom,
    left,
    right,
    shrink,
    grow,
    flexBasis,
    flexShrink,
    flexGrow,
    gridColumn,
    gridColumnStart,
    gridColumnEnd,
    gridRow,
    gridRowStart,
    gridRowEnd,
    rest,
  };
}

function getLayoutStyles(props: LayoutProps) {
  const [widthClassNames, widthCustomProperties] = getWidthStyles(props);
  const [heightClassNames, heightCustomProperties] = getHeightStyles(props);
  const [paddingClassNames, paddingCustomProperties] = getPaddingStyles(props);

  const positionClassNames = getResponsiveClassNames({
    className: 'rt-r-position',
    value: props.position,
    propValues: layoutPropDefs.position.values,
  });

  const [insetClassNames, insetCustomProperties] = getResponsiveStyles({
    className: 'rt-r-inset',
    customProperty: '--inset',
    propValues: layoutPropDefs.inset.values,
    value: props.inset,
  });

  const [insetTopClassNames, insetTopCustomProperties] = getResponsiveStyles({
    className: 'rt-r-top',
    customProperty: '--top',
    propValues: layoutPropDefs.top.values,
    value: props.top,
  });

  const [insetRightClassNames, insetRightCustomProperties] = getResponsiveStyles({
    className: 'rt-r-right',
    customProperty: '--right',
    propValues: layoutPropDefs.right.values,
    value: props.right,
  });

  const [insetBottomClassNames, insetBottomCustomProperties] = getResponsiveStyles({
    className: 'rt-r-bottom',
    customProperty: '--bottom',
    propValues: layoutPropDefs.bottom.values,
    value: props.bottom,
  });

  const [insetLeftClassNames, insetLeftCustomProperties] = getResponsiveStyles({
    className: 'rt-r-left',
    customProperty: '--left',
    propValues: layoutPropDefs.left.values,
    value: props.left,
  });

  const [flexBasisClassNames, flexBasisCustomProperties] = getResponsiveStyles({
    className: 'rt-r-fb',
    customProperty: '--flex-basis',
    propValues: [],
    value: props.flexBasis,
  });

  const [flexShrinkClassNames, flexShrinkCustomProperties] = getResponsiveStyles({
    className: 'rt-r-fs',
    customProperty: '--flex-shrink',
    propValues: layoutPropDefs.flexShrink.values,
    value: props.flexShrink ?? props.shrink,
  });

  const [flexGrowClassNames, flexGrowCustomProperties] = getResponsiveStyles({
    className: 'rt-r-fg',
    customProperty: '--flex-grow',
    propValues: layoutPropDefs.flexGrow.values,
    value: props.flexGrow ?? props.grow,
  });

  const [gridColumnClassNames, gridColumnCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gc',
    customProperty: '--grid-column',
    value: props.gridColumn,
    propValues: [],
  });

  const [gridColumnStartClassNames, gridColumnStartCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gcs',
    customProperty: '--grid-column-start',
    value: props.gridColumnStart,
    propValues: [],
  });

  const [gridColumnEndClassNames, gridColumnEndCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gce',
    customProperty: '--grid-column-end',
    value: props.gridColumnEnd,
    propValues: [],
  });

  const [gridRowClassNames, gridRowCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gr',
    customProperty: '--grid-row',
    value: props.gridRow,
    propValues: [],
  });

  const [gridRowStartClassNames, gridRowStartCustomProperties] = getResponsiveStyles({
    className: 'rt-r-grs',
    customProperty: '--grid-row-start',
    value: props.gridRowStart,
    propValues: [],
  });

  const [gridRowEndClassNames, gridRowEndCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gre',
    customProperty: '--grid-row-end',
    value: props.gridRowEnd,
    propValues: [],
  });

  return [
    classNames(
      widthClassNames,
      heightClassNames,
      paddingClassNames,
      positionClassNames,
      insetClassNames,
      insetTopClassNames,
      insetRightClassNames,
      insetBottomClassNames,
      insetLeftClassNames,
      flexBasisClassNames,
      flexShrinkClassNames,
      flexGrowClassNames,
      gridColumnClassNames,
      gridColumnStartClassNames,
      gridColumnEndClassNames,
      gridRowClassNames,
      gridRowStartClassNames,
      gridRowEndClassNames
    ),
    mergeStyles(
      widthCustomProperties,
      heightCustomProperties,
      paddingCustomProperties,
      insetCustomProperties,
      insetTopCustomProperties,
      insetRightCustomProperties,
      insetBottomCustomProperties,
      insetLeftCustomProperties,
      flexBasisCustomProperties,
      flexShrinkCustomProperties,
      flexGrowCustomProperties,
      gridColumnCustomProperties,
      gridColumnStartCustomProperties,
      gridColumnEndCustomProperties,
      gridRowCustomProperties,
      gridRowStartCustomProperties,
      gridRowEndCustomProperties
    ),
  ] as const;
}

export { layoutPropDefs, extractLayoutProps, getLayoutStyles };
export type { LayoutProps };
