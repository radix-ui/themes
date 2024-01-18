import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { flexPropDefs } from './flex.props';
import { extractProps, layoutPropDefs, marginPropDefs } from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>;
interface FlexProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    FlexOwnProps {
  asChild?: boolean;
  as?: 'span' | 'div';
}
const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: asElem = 'div',
    ...flexProps
  } = extractProps(props, flexPropDefs, layoutPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : asElem;
  return <Comp {...flexProps} ref={forwardedRef} className={classNames('rt-Flex', className)} />;
});
Flex.displayName = 'Flex';

export { Flex };
export type { FlexProps };
