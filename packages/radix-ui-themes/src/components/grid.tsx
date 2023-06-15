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

type GridElement = React.ElementRef<'div'>;
interface GridProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    PaddingProps,
    LayoutProps {
  display?: Responsive<'none' | 'inline-grid' | 'grid'>;
  columns?: Responsive<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  flow?: Responsive<'row' | 'column' | 'dense' | 'row-dense' | 'column-dense'>;
  align?: Responsive<'start' | 'center' | 'end' | 'baseline' | 'stretch'>;
  justify?: Responsive<'start' | 'center' | 'end' | 'between'>;
  gap?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  gapX?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  gapY?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
}
const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(marginRest);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(paddingRest);
  const {
    className,
    display = 'grid',
    columns = '1',
    flow,
    align = 'stretch',
    justify = 'start',
    gap,
    gapX,
    gapY,
    ...gridProps
  } = layoutRest;

  return (
    <div
      {...gridProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Grid',
        withLayout(layoutProps),
        withMargin(marginProps),
        withPadding(paddingProps),
        withBreakpoints(display, 'rui-display'),
        withBreakpoints(columns, 'rui-gtc'),
        withBreakpoints(flow, 'rui-gaf'),
        withBreakpoints(align, 'rui-ai'),
        withBreakpoints(justify, 'rui-jc', { between: 'sb' }),
        withBreakpoints(gap, 'rui-gap'),
        withBreakpoints(gapX, 'rui-cg'),
        withBreakpoints(gapY, 'rui-rg'),
        className
      )}
    />
  );
});
Grid.displayName = 'Grid';

export { Grid };
