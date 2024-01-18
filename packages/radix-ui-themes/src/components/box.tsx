import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { boxPropDefs } from './box.props';
import { extractProps, layoutPropDefs, marginPropDefs, mergeStyles } from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type BoxElement = React.ElementRef<'div'>;
type BoxOwnProps = GetPropDefTypes<typeof boxPropDefs>;
interface BoxProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    BoxOwnProps {
  asChild?: boolean;
  as?: 'span' | 'div';
}

const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: asElem = 'div',
    ...boxProps
  } = extractProps(props, boxPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : asElem;
  return <Comp {...boxProps} ref={forwardedRef} className={classNames('rt-Box', className)} />;
});
Box.displayName = 'Box';

export { Box };
export type { BoxProps };
