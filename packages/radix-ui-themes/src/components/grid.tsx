import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { gridPropDefs } from './grid.props';
import {
  extractLayoutProps,
  extractMarginProps,
  getLayoutStyles,
  getResponsiveStyles,
  mergeStyles,
  withBreakpoints,
  withMarginProps,
} from '../helpers';

import { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type GridElement = React.ElementRef<'div'>;
type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;
interface GridProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    GridOwnProps {
  asChild?: boolean;
}
const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    className,
    asChild,
    display = gridPropDefs.display.default,
    columns = gridPropDefs.columns.default,
    rows = gridPropDefs.rows.default,
    flow = gridPropDefs.flow.default,
    align = gridPropDefs.align.default,
    justify = gridPropDefs.justify.default,
    gap = gridPropDefs.gap.default,
    gapX = gridPropDefs.gapX.default,
    gapY = gridPropDefs.gapY.default,
    style,
    ...gridProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';

  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);

  const [columnsClassNames, columnsCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gtc',
    customProperty: '--grid-template-columns',
    value: columns,
    propValues: gridPropDefs.columns.values,
    parseValue: parseGridValue,
  });

  const [rowsClassNames, rowsCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gtr',
    customProperty: '--grid-template-rows',
    value: rows,
    propValues: gridPropDefs.rows.values,
    parseValue: parseGridValue,
  });

  return (
    <Comp
      {...gridProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Grid',
        className,
        withBreakpoints(display, 'rt-r-display'),
        withBreakpoints(flow, 'rt-r-gaf'),
        withBreakpoints(align, 'rt-r-ai'),
        withBreakpoints(justify, 'rt-r-jc', { between: 'space-between' }),
        withBreakpoints(gap, 'rt-r-gap'),
        withBreakpoints(gapX, 'rt-r-cg'),
        withBreakpoints(gapY, 'rt-r-rg'),
        withMarginProps(marginProps),
        layoutClassNames,
        columnsClassNames,
        rowsClassNames
      )}
      style={mergeStyles(
        layoutCustomProperties,
        columnsCustomProperties,
        rowsCustomProperties,
        style
      )}
    />
  );
});
Grid.displayName = 'Grid';

function parseGridValue(value: string | undefined) {
  return value?.match(/^\d+$/) ? `repeat(${value}, minmax(0, 1fr))` : value;
}

export { Grid };
export type { GridProps };
