import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot.js';
import { boxPropDefs } from './box.props.js';
import { extractProps } from '../helpers/index.js';
import { deprecatedLayoutPropDefs, layoutPropDefs, marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, LayoutProps, GetPropDefTypes } from '../props/index.js';

type BoxElement = React.ElementRef<'div'>;
type BoxOwnProps = GetPropDefTypes<typeof boxPropDefs>;
interface CommonBoxProps extends MarginProps, LayoutProps, BoxOwnProps {}
type BoxAsChildProps = { asChild: true; as?: never } & ComponentPropsWithoutColor<'div'>;
type BoxDivProps = { as?: 'div'; asChild?: false } & ComponentPropsWithoutColor<'div'>;
type BoxSpanProps = { as: 'span'; asChild?: false } & ComponentPropsWithoutColor<'span'>;
type BoxProps = CommonBoxProps & (BoxAsChildProps | BoxSpanProps | BoxDivProps);

const Box = React.forwardRef<BoxElement, BoxProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...boxProps
  } = extractProps(props, boxPropDefs, layoutPropDefs, deprecatedLayoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...boxProps} ref={forwardedRef} className={classNames('rt-Box', className)} />;
});
Box.displayName = 'Box';

export { Box };
export type { BoxProps };
