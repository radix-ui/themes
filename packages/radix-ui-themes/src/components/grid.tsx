import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot.js';
import { gridPropDefs } from './grid.props.js';
import { extractProps } from '../helpers/index.js';
import { layoutPropDefs, marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { MarginProps, LayoutProps, GridOwnProps } from '../props/index.js';

type GridElement = React.ElementRef<'div'>;
interface CommonGridProps extends MarginProps, LayoutProps, GridOwnProps {}
type GridDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type GridSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type GridProps = CommonGridProps & (GridSpanProps | GridDivProps);

const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...gridProps
  } = extractProps(props, gridPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...gridProps} ref={forwardedRef} className={classNames('rt-Grid', className)} />;
});
Grid.displayName = 'Grid';

export { Grid };
export type { GridProps };
