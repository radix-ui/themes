import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import type { BoxDisplay } from './box.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';

import type { MarginProps, LayoutProps, Responsive } from '../helpers';

type BoxElement = React.ElementRef<'div'>;
interface BoxProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, LayoutProps {
  asChild?: boolean;
  display?: Responsive<BoxDisplay>;
}
const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const { className, asChild, display, ...boxProps } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...boxProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Box',
        withMarginProps(marginProps),
        withLayoutProps(layoutProps),
        withBreakpoints(display, 'rui-display'),
        className
      )}
    />
  );
});
Box.displayName = 'Box';

export { Box };
