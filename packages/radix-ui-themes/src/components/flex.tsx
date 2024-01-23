import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { flexPropDefs } from './flex.props';
import { extractProps, layoutPropDefs, marginPropDefs } from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>;
interface CommonFlexProps extends MarginProps, LayoutProps, FlexOwnProps {}
type FlexAsChildProps = { asChild?: boolean; as?: never } & PropsWithoutRefOrColor<'div'>;
type FlexDivProps = { as?: 'div'; asChild?: never } & PropsWithoutRefOrColor<'div'>;
type FlexSpanProps = { as: 'span'; asChild?: never } & PropsWithoutRefOrColor<'span'>;
type FlexProps = CommonFlexProps & (FlexAsChildProps | FlexSpanProps | FlexDivProps);

const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...flexProps
  } = extractProps(props, flexPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...flexProps} ref={forwardedRef} className={classNames('rt-Flex', className)} />;
});
Flex.displayName = 'Flex';

export { Flex };
export type { FlexProps };
