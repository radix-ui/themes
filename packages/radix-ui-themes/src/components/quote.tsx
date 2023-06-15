import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin } from '../helpers';

import type { MarginProps } from '../helpers';

type QuoteElement = React.ElementRef<'q'>;
interface QuoteProps extends React.ComponentPropsWithoutRef<'q'>, MarginProps {}
const Quote = React.forwardRef<QuoteElement, QuoteProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, ...quoteProps } = marginRest;

  return (
    <q
      {...quoteProps}
      ref={forwardedRef}
      className={classNames('rui-Quote', withMargin(marginProps), className)}
    />
  );
});
Quote.displayName = 'Quote';

export { Quote };
