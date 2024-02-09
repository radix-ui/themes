import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot.js';
import { gridPropDefs } from './grid.props.js';
import { extractProps } from '../helpers/index.js';
import { deprecatedLayoutPropDefs, layoutPropDefs, marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, LayoutProps, GetPropDefTypes } from '../props/index.js';

type GridElement = React.ElementRef<'div'>;
type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;
interface CommonGridProps extends MarginProps, LayoutProps, GridOwnProps {}
type GridAsChildProps = { asChild?: true; as?: never } & ComponentPropsWithoutColor<'div'>;
type GridDivProps = { as?: 'div'; asChild?: false } & ComponentPropsWithoutColor<'div'>;
type GridSpanProps = { as: 'span'; asChild?: false } & ComponentPropsWithoutColor<'span'>;
type GridProps = CommonGridProps & (GridAsChildProps | GridSpanProps | GridDivProps);

const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...gridProps
  } = extractProps(props, gridPropDefs, layoutPropDefs, deprecatedLayoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...gridProps} ref={forwardedRef} className={classNames('rt-Grid', className)} />;
});
Grid.displayName = 'Grid';

export { Grid };
export type { GridProps };
