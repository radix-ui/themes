import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import {
  defaultGridDisplay,
  defaultGridColumns,
  defaultGridFlow,
  defaultGridAlign,
  defaultGridJustify,
  defaultGridGap,
  defaultGridGapX,
  defaultGridGapY,
} from './grid.props';
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
  GridDisplay,
  GridColumns,
  GridFlow,
  GridAlign,
  GridJustify,
  GridCap,
} from './grid.props';
import type { MarginProps, PaddingProps, LayoutProps, Responsive } from '../helpers';

type GridElement = React.ElementRef<'div'>;
interface GridProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    PaddingProps,
    LayoutProps {
  asChild?: boolean;
  display?: Responsive<GridDisplay>;
  columns?: Responsive<GridColumns>;
  flow?: Responsive<GridFlow>;
  align?: Responsive<GridAlign>;
  justify?: Responsive<GridJustify>;
  gap?: Responsive<GridCap>;
  gapX?: Responsive<GridCap>;
  gapY?: Responsive<GridCap>;
}
const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(marginRest);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(paddingRest);
  const {
    className,
    asChild,
    display = defaultGridDisplay,
    columns = defaultGridColumns,
    flow = defaultGridFlow,
    align = defaultGridAlign,
    justify = defaultGridJustify,
    gap = defaultGridGap,
    gapX = defaultGridGapX,
    gapY = defaultGridGapY,
    ...gridProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...gridProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Grid',
        withLayoutProps(layoutProps),
        withMarginProps(marginProps),
        withPaddingProps(paddingProps),
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
