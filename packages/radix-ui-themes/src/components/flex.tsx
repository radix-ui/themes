import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot.js';
import { flexPropDefs } from './flex.props.js';
import { extractProps } from '../helpers/index.js';
import { layoutPropDefs, marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { MarginProps, LayoutProps, FlexOwnProps } from '../props/index.js';

type FlexElement = React.ElementRef<'div'>;
interface CommonFlexProps extends MarginProps, LayoutProps, FlexOwnProps {}
type FlexDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type FlexSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type FlexProps = CommonFlexProps & (FlexSpanProps | FlexDivProps);

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
