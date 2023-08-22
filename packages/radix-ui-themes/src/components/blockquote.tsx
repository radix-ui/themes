import * as React from 'react';
import classNames from 'classnames';
import { Text } from './text';
import { blockquotePropDefs } from './blockquote.props';

import type { MarginProps, PropsWithoutRefOrColor, GetPropDefTypes } from '../helpers';

type BlockquoteElement = React.ElementRef<'blockquote'>;
type BlockQuoteOwnProps = GetPropDefTypes<typeof blockquotePropDefs>;
interface BlockquoteProps
  extends PropsWithoutRefOrColor<'blockquote'>,
    MarginProps,
    BlockQuoteOwnProps {}
const Blockquote = React.forwardRef<BlockquoteElement, BlockquoteProps>((props, forwardedRef) => {
  const { children, className, ...blockquoteProps } = props;
  return (
    <Text
      asChild
      {...blockquoteProps}
      ref={forwardedRef}
      className={classNames('rt-Blockquote', className)}
    >
      <blockquote>{children}</blockquote>
    </Text>
  );
});
Blockquote.displayName = 'Blockquote';

export { Blockquote };
export type { BlockquoteProps };
