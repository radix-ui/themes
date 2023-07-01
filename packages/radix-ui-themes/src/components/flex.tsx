import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import {
  defaultFlexDisplay,
  defaultFlexDirection,
  defaultFlexAlign,
  defaultFlexJustify,
  defaultFlexWrap,
  defaultFlexGap,
} from './flex.props';
import {
  extractMarginProps,
  withMarginProps,
  extractPaddingProps,
  withPaddingProps,
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
import type { MarginProps, PaddingProps, LayoutProps, Responsive } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
interface FlexProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    PaddingProps,
    LayoutProps {
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
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(marginRest);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(paddingRest);
  const {
    className,
    asChild,
    display = defaultFlexDisplay,
    direction = defaultFlexDirection,
    align = defaultFlexAlign,
    justify = defaultFlexJustify,
    wrap = defaultFlexWrap,
    gap = defaultFlexGap,
    ...flexProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...flexProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Flex',
        withLayoutProps(layoutProps),
        withMarginProps(marginProps),
        withPaddingProps(paddingProps),
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
