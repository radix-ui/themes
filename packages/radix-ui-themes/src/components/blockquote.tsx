import * as React from 'react';
import classNames from 'classnames';
import { Text } from './text';
import { extractMarginProps, withMarginProps } from '../helpers';

import type { MarginProps } from '../helpers';

type BlockquoteElement = React.ElementRef<'blockquote'>;
interface BlockquoteProps extends React.ComponentPropsWithoutRef<'blockquote'>, MarginProps {}
const Blockquote = React.forwardRef<BlockquoteElement, BlockquoteProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, ...blockquoteProps } = marginRest;
  return (
    <Text asChild>
      <blockquote
        {...blockquoteProps}
        ref={forwardedRef}
        className={classNames('rui-Blockquote', withMarginProps(marginProps), className)}
      />
    </Text>
  );
});
Blockquote.displayName = 'Blockquote';

export { Blockquote };
