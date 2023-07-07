import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { flexPropDefs } from './flex.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>;
interface FlexProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    FlexOwnProps {
  asChild?: boolean;
}
const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    className,
    asChild,
    display = flexPropDefs.display.default,
    direction = flexPropDefs.direction.default,
    align = flexPropDefs.align.default,
    justify = flexPropDefs.justify.default,
    wrap = flexPropDefs.wrap.default,
    gap = flexPropDefs.gap.default,
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
