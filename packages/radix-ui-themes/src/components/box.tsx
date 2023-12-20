import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { boxPropDefs } from './box.props';
import {
  extractLayoutProps,
  extractMarginProps,
  getLayoutStyles,
  mergeStyles,
  withBreakpoints,
  withMarginProps,
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
  const {
    className,
    asChild,
    style,
    display = boxPropDefs.display.default,
    ...boxProps
  } = layoutRest;
  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...boxProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Box',
        className,
        withBreakpoints(display, 'rt-r-display'),
        withMarginProps(marginProps),
        layoutClassNames
      )}
      style={mergeStyles(layoutCustomProperties, style)}
    />
  );
});
Box.displayName = 'Box';

export { Box };
export type { BoxProps };
