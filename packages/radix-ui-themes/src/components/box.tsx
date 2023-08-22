import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { boxPropDefs } from './box.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type BoxElement = React.ElementRef<'div'>;
type BoxOwnProps = GetPropDefTypes<typeof boxPropDefs>;
interface BoxProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    BoxOwnProps {
  asChild?: boolean;
}
const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const { className, asChild, display = boxPropDefs.display.default, ...boxProps } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...boxProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Box',
        className,
        withBreakpoints(display, 'rt-r-display'),
        withLayoutProps(layoutProps),
        withMarginProps(marginProps)
      )}
    />
  );
});
Box.displayName = 'Box';

export { Box };
export type { BoxProps };
