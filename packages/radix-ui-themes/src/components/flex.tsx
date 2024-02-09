import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot.js';
import { flexPropDefs } from './flex.props.js';
import { extractProps } from '../helpers/index.js';
import { deprecatedLayoutPropDefs, layoutPropDefs, marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, LayoutProps, GetPropDefTypes } from '../props/index.js';

type FlexElement = React.ElementRef<'div'>;
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>;
interface CommonFlexProps extends MarginProps, LayoutProps, FlexOwnProps {}
type FlexAsChildProps = { asChild?: true; as?: never } & ComponentPropsWithoutColor<'div'>;
type FlexDivProps = { as?: 'div'; asChild?: false } & ComponentPropsWithoutColor<'div'>;
type FlexSpanProps = { as: 'span'; asChild?: false } & ComponentPropsWithoutColor<'span'>;
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
