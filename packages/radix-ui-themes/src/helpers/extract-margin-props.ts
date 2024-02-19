import { marginPropDefs } from '../props/margin.props.js';
import type { MarginProps } from '../props/margin.props.js';

export function extractMarginProps<T extends MarginProps>(props: T) {
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
