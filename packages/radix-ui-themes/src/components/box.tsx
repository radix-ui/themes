import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import {
  extractMarginProps,
  withMarginProps,
  extractPaddingProps,
  withPaddingProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';
import type { BoxDisplay } from './box.props';

import type { MarginProps, PaddingProps, LayoutProps, Responsive } from '../helpers';

type BoxElement = React.ElementRef<'div'>;
interface BoxProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    PaddingProps,
    LayoutProps {
  asChild?: boolean;
  display?: Responsive<BoxDisplay>;
}
const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(marginRest);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(paddingRest);
  const { className, asChild, display, ...boxProps } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...boxProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Box',
        withLayoutProps(layoutProps),
        withMarginProps(marginProps),
        withPaddingProps(paddingProps),
        withBreakpoints(display, 'rui-display'),
        className
      )}
    />
  );
});
Box.displayName = 'Box';

export { Box };
