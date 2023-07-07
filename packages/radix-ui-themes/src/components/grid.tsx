import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { gridPropDefs } from './grid.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

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
    flow = gridPropDefs.flow.default,
    align = gridPropDefs.align.default,
    justify = gridPropDefs.justify.default,
    gap = gridPropDefs.gap.default,
    gapX = gridPropDefs.gapX.default,
    gapY = gridPropDefs.gapY.default,
    ...gridProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...gridProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Grid',
        withMarginProps(marginProps),
        withLayoutProps(layoutProps),
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
