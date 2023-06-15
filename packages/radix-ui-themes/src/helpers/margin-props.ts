import { withBreakpoints } from './breakpoints';

import type { Responsive } from './breakpoints';

const marginValues = [
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

interface MarginProps {
  m?: Responsive<(typeof marginValues)[number]>;
  mx?: Responsive<(typeof marginValues)[number]>;
  my?: Responsive<(typeof marginValues)[number]>;
  mt?: Responsive<(typeof marginValues)[number]>;
  mr?: Responsive<(typeof marginValues)[number]>;
  mb?: Responsive<(typeof marginValues)[number]>;
  ml?: Responsive<(typeof marginValues)[number]>;
}

function extractMarginProps<T extends MarginProps>(props: T) {
  const { m, mx, my, mt, mr, mb, ml, ...rest } = props;
  return { m, mx, my, mt, mr, mb, ml, rest };
}

function withMargin(props: MarginProps) {
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

export { extractMarginProps, withMargin };
export type { MarginProps };
