import { withBreakpoints } from '../breakpoints';

import type { PropDef, GetPropDefTypes } from './prop-def';

const paddingValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;
const positionEdgeValues = ['auto', '0', '50%', '100%'] as const;
// prettier-ignore
const widthHeightValues = ['auto', 'min-content', 'max-content', '100%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const flexShrinkValues = ['0', '1'] as const;
const flexGrowValues = ['0', '1'] as const;

const layoutPropDefs = {
  p: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  px: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  py: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pt: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pr: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pb: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pl: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
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
};

type LayoutProps = GetPropDefTypes<typeof layoutPropDefs>;

function extractLayoutProps<T extends LayoutProps>(props: T) {
  const {
    p = layoutPropDefs.p.default,
    px = layoutPropDefs.px.default,
    py = layoutPropDefs.py.default,
    pt = layoutPropDefs.pt.default,
    pr = layoutPropDefs.pr.default,
    pb = layoutPropDefs.pb.default,
    pl = layoutPropDefs.pl.default,
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
    ...rest
  } = props;
  return {
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
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
    rest,
  };
}

function withLayoutProps(props: LayoutProps) {
  return [
    withBreakpoints(props.p, 'rui-p'),
    withBreakpoints(props.px, 'rui-px'),
    withBreakpoints(props.py, 'rui-py'),
    withBreakpoints(props.pt, 'rui-pt'),
    withBreakpoints(props.pr, 'rui-pr'),
    withBreakpoints(props.pb, 'rui-pb'),
    withBreakpoints(props.pl, 'rui-pl'),
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

export { layoutPropDefs, extractLayoutProps, withLayoutProps };
export type { LayoutProps };
