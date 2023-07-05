import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import {
  flexDisplayDefault,
  flexDirectionDefault,
  flexAlignDefault,
  flexJustifyDefault,
  flexWrapDefault,
  flexGapDefault,
} from './flex.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';

import type {
  FlexDisplay,
  FlexDirection,
  FlexAlign,
  FlexJustify,
  FlexWrap,
  FlexGap,
} from './flex.props';
import type { MarginProps, LayoutProps, Responsive } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
interface FlexProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, LayoutProps {
  asChild?: boolean;
  display?: Responsive<FlexDisplay>;
  direction?: Responsive<FlexDirection>;
  align?: Responsive<FlexAlign>;
  justify?: Responsive<FlexJustify>;
  wrap?: Responsive<FlexWrap>;
  gap?: Responsive<FlexGap>;
}
const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    className,
    asChild,
    display = flexDisplayDefault,
    direction = flexDirectionDefault,
    align = flexAlignDefault,
    justify = flexJustifyDefault,
    wrap = flexWrapDefault,
    gap = flexGapDefault,
    ...flexProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...flexProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Flex',
        withMarginProps(marginProps),
        withLayoutProps(layoutProps),
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
