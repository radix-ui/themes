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
  isBreakpointsObject,
  hasOwnProperty,
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
    rows = gridPropDefs.rows.default,
    flow = gridPropDefs.flow.default,
    align = gridPropDefs.align.default,
    justify = gridPropDefs.justify.default,
    gap = gridPropDefs.gap.default,
    gapX = gridPropDefs.gapX.default,
    gapY = gridPropDefs.gapY.default,
    style: propStyle,
    ...gridProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';

  let style: React.CSSProperties | Record<string, string | undefined> = {
    ...propStyle,
  };

  if (typeof columns === 'string') {
    style = {
      '--grid-template-columns-initial': parseGridValue(columns),
      ...style,
    };
  }

  if (typeof rows === 'string') {
    style = {
      '--grid-template-rows-initial': parseGridValue(rows),
      ...style,
    };
  }

  if (isBreakpointsObject(columns)) {
    for (const breakpoint in columns) {
      if (hasOwnProperty(columns, breakpoint)) {
        const customProperty = `--grid-template-columns-${breakpoint}`;

        style = {
          [customProperty]: parseGridValue(columns[breakpoint]),
          ...style,
        };
      }
    }
  }

  if (isBreakpointsObject(rows)) {
    for (const breakpoint in rows) {
      if (hasOwnProperty(rows, breakpoint)) {
        const customProperty = `--grid-template-rows-${breakpoint}`;

        style = {
          [customProperty]: parseGridValue(rows[breakpoint]),
          ...style,
        };
      }
    }
  }

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
        withLayoutProps(layoutProps),
        withMarginProps(marginProps)
      )}
      style={Object.keys(style).length ? style : undefined}
    />
  );
});
Grid.displayName = 'Grid';

function parseGridValue(value: string | undefined) {
  return value?.match(/^\d+$/) ? `repeat(${value}, minmax(0, 1fr))` : value;
}

export { Grid };
export type { GridProps };
