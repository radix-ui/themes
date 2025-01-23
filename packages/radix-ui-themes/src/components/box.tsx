import * as React from 'react';
import classNames from 'classnames';

import { Slot } from './slot';
import { boxPropDefs } from './box.props';
import { extractProps } from '../helpers/extract-props';
import { layoutPropDefs } from '../props/layout.props';
import { marginPropDefs } from '../props/margin.props';

import type { LayoutProps } from '../props/layout.props';
import type { MarginProps } from '../props/margin.props';
import type { BoxOwnProps } from './box.props';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props';

type BoxElement = React.ElementRef<'div'>;
interface CommonBoxProps extends MarginProps, LayoutProps, BoxOwnProps {}
type BoxDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type BoxSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);

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
