import { withBreakpoints } from './breakpoints';

import type { Responsive } from './breakpoints';

const paddingValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type Padding = (typeof paddingValues)[number];

interface PaddingProps {
  p?: Responsive<Padding>;
  px?: Responsive<Padding>;
  py?: Responsive<Padding>;
  pt?: Responsive<Padding>;
  pr?: Responsive<Padding>;
  pb?: Responsive<Padding>;
  pl?: Responsive<Padding>;
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

export { paddingValues, extractPaddingProps, withPadding };
export type { Padding, PaddingProps };
