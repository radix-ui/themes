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

const gridDisplayValues = ['none', 'inline-grid', 'grid'] as const;
type GridDisplay = (typeof gridDisplayValues)[number];

const gridColumnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type GridColumns = (typeof gridColumnsValues)[number];

const gridFlowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
type GridFlow = (typeof gridFlowValues)[number];

const gridAlignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
type GridAlign = (typeof gridAlignValues)[number];

const gridJustifyValues = ['start', 'center', 'end', 'between'] as const;
type GridJustify = (typeof gridJustifyValues)[number];

const gridGapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type GridCap = (typeof gridGapValues)[number];

type GridElement = React.ElementRef<'div'>;
interface GridProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    PaddingProps,
    LayoutProps {
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

export {
  gridDisplayValues,
  gridColumnsValues,
  gridFlowValues,
  gridAlignValues,
  gridJustifyValues,
  gridGapValues,
  Grid,
};
export { GridDisplay, GridColumns, GridFlow, GridAlign, GridJustify, GridCap };
