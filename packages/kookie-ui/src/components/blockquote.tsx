import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { Text } from './text.js';

import type { blockquotePropDefs } from './blockquote.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type BlockquoteElement = React.ElementRef<'blockquote'>;
type BlockQuoteOwnProps = GetPropDefTypes<typeof blockquotePropDefs>;
interface BlockquoteProps
  extends ComponentPropsWithout<'blockquote', RemovedProps>,
    MarginProps,
    BlockQuoteOwnProps {}
const Blockquote = React.forwardRef<BlockquoteElement, BlockquoteProps>((props, forwardedRef) => {
  const { asChild, children, className, ...blockquoteProps } = props;
  const Comp = asChild ? Slot.Root : 'blockquote';
  return (
    <Text
      asChild
      {...blockquoteProps}
      ref={forwardedRef}
      className={classNames('rt-Blockquote', className)}
    >
      <Comp>{children}</Comp>
    </Text>
  );
});
Blockquote.displayName = 'Blockquote';

export { Blockquote };
export type { BlockquoteProps };
