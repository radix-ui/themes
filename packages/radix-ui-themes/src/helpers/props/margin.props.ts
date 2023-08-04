import { withBreakpoints } from '../breakpoints';

import type { PropDef, GetPropDefTypes } from './prop-def';

// prettier-ignore
const marginValues = ['auto', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9'] as const;

const marginPropDefs = {
  m: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  mx: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  my: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  mt: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  mr: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  mb: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  ml: { type: 'enum', values: marginValues, default: undefined, responsive: true },
} satisfies {
  m: PropDef<(typeof marginValues)[number]>;
  mx: PropDef<(typeof marginValues)[number]>;
  my: PropDef<(typeof marginValues)[number]>;
  mt: PropDef<(typeof marginValues)[number]>;
  mr: PropDef<(typeof marginValues)[number]>;
  mb: PropDef<(typeof marginValues)[number]>;
  ml: PropDef<(typeof marginValues)[number]>;
};

type MarginProps = GetPropDefTypes<typeof marginPropDefs>;

function extractMarginProps<T extends MarginProps>(props: T) {
  const {
    m = marginPropDefs.m.default,
    mx = marginPropDefs.mx.default,
    my = marginPropDefs.my.default,
    mt = marginPropDefs.mt.default,
    mr = marginPropDefs.mr.default,
    mb = marginPropDefs.mb.default,
    ml = marginPropDefs.ml.default,
    ...rest
  } = props;
  return { m, mx, my, mt, mr, mb, ml, rest };
}

function withMarginProps(props: MarginProps) {
  return [
    withBreakpoints(props.m, 'rt-r-m'),
    withBreakpoints(props.mx, 'rt-r-mx'),
    withBreakpoints(props.my, 'rt-r-my'),
    withBreakpoints(props.mt, 'rt-r-mt'),
    withBreakpoints(props.mr, 'rt-r-mr'),
    withBreakpoints(props.mb, 'rt-r-mb'),
    withBreakpoints(props.ml, 'rt-r-ml'),
  ]
    .filter(Boolean)
    .join(' ');
}

export { marginPropDefs, extractMarginProps, withMarginProps };
export type { MarginProps };
