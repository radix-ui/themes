import { paddingPropDefs } from './padding.props';
import type { PropDef, GetPropDefTypes } from './prop-def';
import { heightPropDefs } from './height.props';
import { widthPropDefs } from './width.props';

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

export { layoutPropDefs };
export type { LayoutProps };
