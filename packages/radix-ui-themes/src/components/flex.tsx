import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { flexPropDefs } from './flex.props';
import { deprecatedLayoutPropDefs, extractProps, layoutPropDefs, marginPropDefs } from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>;
interface CommonFlexProps extends MarginProps, LayoutProps, FlexOwnProps {}
type FlexAsChildProps = { asChild?: true; as?: never } & PropsWithoutRefOrColor<'div'>;
type FlexDivProps = { as?: 'div'; asChild?: false } & PropsWithoutRefOrColor<'div'>;
type FlexSpanProps = { as: 'span'; asChild?: false } & PropsWithoutRefOrColor<'span'>;
type FlexProps = CommonFlexProps & (FlexAsChildProps | FlexSpanProps | FlexDivProps);

const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...flexProps
  } = extractProps(props, flexPropDefs, layoutPropDefs, deprecatedLayoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : Tag;
  return <Comp {...flexProps} ref={forwardedRef} className={classNames('rt-Flex', className)} />;
});
Flex.displayName = 'Flex';

export { Flex };
export type { FlexProps, CommonFlexProps, FlexAsChildProps };
