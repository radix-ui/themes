import { withBreakpoints } from './breakpoints';

import type { Responsive } from './breakpoints';

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;
type Position = (typeof positionValues)[number];

const positionEdgeValues = ['auto', '0', '50%', '100%'] as const;
type PositionEdge = (typeof positionEdgeValues)[number];

const widthHeightValues = [
  'auto',
  'min-content',
  'max-content',
  '100%',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;
type Width = (typeof widthHeightValues)[number];
type Height = (typeof widthHeightValues)[number];

const flexShrinkValues = ['0', '1'] as const;
type FlexShrink = (typeof flexShrinkValues)[number];

const flexGrowValues = ['0', '1'] as const;
type FlexGrow = (typeof flexGrowValues)[number];

interface LayoutProps {
  position?: Responsive<Position>;
  inset?: Responsive<PositionEdge>;
  top?: Responsive<PositionEdge>;
  bottom?: Responsive<PositionEdge>;
  left?: Responsive<PositionEdge>;
  right?: Responsive<PositionEdge>;
  width?: Responsive<Width>;
  height?: Responsive<Height>;
  shrink?: Responsive<FlexShrink>;
  grow?: Responsive<FlexGrow>;
}

function extractLayoutProps<T extends LayoutProps>(props: T) {
  const { position, width, height, inset, top, bottom, left, right, shrink, grow, ...rest } = props;
  return { position, width, height, inset, top, bottom, left, right, shrink, grow, rest };
}

function withLayoutProps(props: LayoutProps) {
  return [
    withBreakpoints(props.position, 'rui-position'),
    withBreakpoints(props.shrink, 'rui-fs'),
    withBreakpoints(props.grow, 'rui-fg'),
    withBreakpoints(props.width, 'rui-w'),
    withBreakpoints(props.height, 'rui-h'),
    withBreakpoints(props.inset, 'rui-inset'),
    withBreakpoints(props.top, 'rui-top'),
    withBreakpoints(props.bottom, 'rui-bottom'),
    withBreakpoints(props.left, 'rui-left'),
    withBreakpoints(props.right, 'rui-right'),
  ]
    .filter(Boolean)
    .join(' ');
}

export {
  positionValues,
  positionEdgeValues,
  widthHeightValues,
  flexShrinkValues,
  flexGrowValues,
  extractLayoutProps,
  withLayoutProps,
};
export type { Position, PositionEdge, Width, Height, FlexShrink, FlexGrow, LayoutProps };
