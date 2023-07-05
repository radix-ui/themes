import { withBreakpoints } from './breakpoints';

import type { Responsive } from './breakpoints';

const marginValues = [
  'auto',
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
  '-1',
  '-2',
  '-3',
  '-4',
  '-5',
  '-6',
  '-7',
  '-8',
  '-9',
] as const;
type Margin = (typeof marginValues)[number];

interface MarginProps {
  m?: Responsive<Margin>;
  mx?: Responsive<Margin>;
  my?: Responsive<Margin>;
  mt?: Responsive<Margin>;
  mr?: Responsive<Margin>;
  mb?: Responsive<Margin>;
  ml?: Responsive<Margin>;
}

function extractMarginProps<T extends MarginProps>(props: T) {
  const { m, mx, my, mt, mr, mb, ml, ...rest } = props;
  return { m, mx, my, mt, mr, mb, ml, rest };
}

function withMarginProps(props: MarginProps) {
  return [
    withBreakpoints(props.m, 'rui-m'),
    withBreakpoints(props.mx, 'rui-mx'),
    withBreakpoints(props.my, 'rui-my'),
    withBreakpoints(props.mt, 'rui-mt'),
    withBreakpoints(props.mr, 'rui-mr'),
    withBreakpoints(props.mb, 'rui-mb'),
    withBreakpoints(props.ml, 'rui-ml'),
  ]
    .filter(Boolean)
    .join(' ');
}

export { marginValues, extractMarginProps, withMarginProps };
export type { Margin, MarginProps };
