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
import type { BoxDisplay } from './box.props';

import type { MarginProps, PaddingProps, LayoutProps, Responsive } from '../helpers';

type BoxElement = React.ElementRef<'div'>;
interface BoxProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    PaddingProps,
    LayoutProps {
  display?: Responsive<BoxDisplay>;
}
const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(marginRest);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(paddingRest);
  const { className, display, ...boxProps } = layoutRest;
  return (
    <div
      {...boxProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Box',
        withLayout(layoutProps),
        withMargin(marginProps),
        withPadding(paddingProps),
        withBreakpoints(display, 'rui-display'),
        className
      )}
    />
  );
});
Box.displayName = 'Box';

export { Box };
