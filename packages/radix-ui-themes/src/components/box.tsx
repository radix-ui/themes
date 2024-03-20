import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot.js';
import { boxPropDefs } from './box.props.js';
import { extractProps } from '../helpers/index.js';
import { layoutPropDefs, marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { MarginProps, LayoutProps, BoxOwnProps } from '../props/index.js';

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
