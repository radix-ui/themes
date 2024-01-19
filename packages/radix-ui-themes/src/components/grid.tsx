import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { gridPropDefs } from './grid.props';
import { extractProps, layoutPropDefs, marginPropDefs } from '../helpers';

import { MarginProps, LayoutProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type GridElement = React.ElementRef<'div'>;
type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;
interface CommonGridProps extends MarginProps, LayoutProps, GridOwnProps {}
type GridAsChildProps = { asChild?: boolean; as?: never } & PropsWithoutRefOrColor<'div'>;
type GridSpanProps = { as?: 'span'; asChild?: never } & PropsWithoutRefOrColor<'span'>;
type GridDivProps = { as?: 'div'; asChild?: never } & PropsWithoutRefOrColor<'div'>;
type GridProps = CommonGridProps & (GridAsChildProps | GridSpanProps | GridDivProps);

const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: asElem = 'div',
    ...gridProps
  } = extractProps(props, gridPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : asElem;
  return <Comp {...gridProps} ref={forwardedRef} className={classNames('rt-Grid', className)} />;
});
Grid.displayName = 'Grid';

export { Grid };
export type { GridProps };
