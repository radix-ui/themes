import { withBreakpoints } from './breakpoints';

import type { Responsive } from './breakpoints';

interface LayoutProps {
  position?: Responsive<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>;
  inset?: Responsive<'auto' | '0' | '50%' | '100%'>;
  top?: Responsive<'auto' | '0' | '50%' | '100%'>;
  bottom?: Responsive<'auto' | '0' | '50%' | '100%'>;
  left?: Responsive<'auto' | '0' | '50%' | '100%'>;
  right?: Responsive<'auto' | '0' | '50%' | '100%'>;
  width?: Responsive<
    | 'auto'
    | 'min-content'
    | 'max-content'
    | '100%'
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
  >;
  height?: Responsive<
    | 'auto'
    | 'min-content'
    | 'max-content'
    | '100%'
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
  >;
  shrink?: Responsive<'0' | '1'>;
  grow?: Responsive<'0' | '1'>;
}

function extractLayoutProps<T extends LayoutProps>(props: T) {
  const { position, width, height, inset, top, bottom, left, right, shrink, grow, ...rest } = props;
  return { position, width, height, inset, top, bottom, left, right, shrink, grow, rest };
}

function withLayout(props: LayoutProps) {
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

export { extractLayoutProps, withLayout };
export type { LayoutProps };
