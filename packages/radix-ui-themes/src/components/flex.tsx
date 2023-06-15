import * as React from 'react';
import classNames from 'classnames';
import {
  extractMarginProps,
  withMargin,
  extractPaddingProps,
  withPadding,
  extractLayoutProps,
  withLayout,
  withBreakpoints,
} from '../helpers';

import type { MarginProps, PaddingProps, LayoutProps, Responsive } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
interface FlexProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    PaddingProps,
    LayoutProps {
  display?: Responsive<'none' | 'inline-flex' | 'flex'>;
  direction?: Responsive<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  align?: Responsive<'start' | 'center' | 'end' | 'baseline' | 'stretch'>;
  justify?: Responsive<'start' | 'center' | 'end' | 'between'>;
  wrap?: Responsive<'nowrap' | 'wrap' | 'wrap-reverse'>;
  gap?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
}
const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(marginRest);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(paddingRest);
  const {
    className,
    display = 'flex',
    direction,
    align,
    justify = 'start',
    wrap,
    gap,
    ...flexProps
  } = layoutRest;

  return (
    <div
      {...flexProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Flex',
        withLayout(layoutProps),
        withMargin(marginProps),
        withPadding(paddingProps),
        withBreakpoints(display, 'rui-display'),
        withBreakpoints(direction, 'rui-fd'),
        withBreakpoints(align, 'rui-ai'),
        withBreakpoints(justify, 'rui-jc', { between: 'space-between' }),
        withBreakpoints(wrap, 'rui-fw'),
        withBreakpoints(gap, 'rui-gap'),
        className
      )}
    />
  );
});
Flex.displayName = 'Flex';

export { Flex };
