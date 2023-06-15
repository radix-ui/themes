import { withBreakpoints } from './breakpoints';

import type { Responsive } from './breakpoints';

const paddingValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

interface PaddingProps {
  p?: Responsive<(typeof paddingValues)[number]>;
  px?: Responsive<(typeof paddingValues)[number]>;
  py?: Responsive<(typeof paddingValues)[number]>;
  pt?: Responsive<(typeof paddingValues)[number]>;
  pr?: Responsive<(typeof paddingValues)[number]>;
  pb?: Responsive<(typeof paddingValues)[number]>;
  pl?: Responsive<(typeof paddingValues)[number]>;
}

function extractPaddingProps<T extends PaddingProps>(props: T) {
  const { p, px, py, pt, pr, pb, pl, ...rest } = props;
  return { p, px, py, pt, pr, pb, pl, rest };
}

function withPadding(props: PaddingProps) {
  return [
    withBreakpoints(props.p, 'rui-p'),
    withBreakpoints(props.px, 'rui-px'),
    withBreakpoints(props.py, 'rui-py'),
    withBreakpoints(props.pt, 'rui-pt'),
    withBreakpoints(props.pr, 'rui-pr'),
    withBreakpoints(props.pb, 'rui-pb'),
    withBreakpoints(props.pl, 'rui-pl'),
  ]
    .filter(Boolean)
    .join(' ');
}

export { extractPaddingProps, withPadding };
export type { PaddingProps };
