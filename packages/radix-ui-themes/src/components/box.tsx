import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { boxPropDefs } from './box.props';
import { extractProps, layoutPropDefs, marginPropDefs } from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type BoxElement = React.ElementRef<'div'>;
type BoxOwnProps = GetPropDefTypes<typeof boxPropDefs>;
interface CommonBoxProps extends MarginProps, LayoutProps, BoxOwnProps {}
type BoxAsChildProps = { asChild?: boolean; as?: never } & PropsWithoutRefOrColor<'div'>;
type BoxDivProps = { as?: 'div'; asChild?: never } & PropsWithoutRefOrColor<'div'>;
type BoxSpanProps = { as: 'span'; asChild?: never } & PropsWithoutRefOrColor<'span'>;
type BoxProps = CommonBoxProps & (BoxAsChildProps | BoxSpanProps | BoxDivProps);

const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...boxProps
  } = extractProps(props, boxPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...boxProps} ref={forwardedRef} className={classNames('rt-Box', className)} />;
});
Box.displayName = 'Box';

export { Box };
export type { BoxProps };
