import * as React from 'react';
import classNames from 'classnames';

type QuoteElement = React.ElementRef<'q'>;
interface QuoteProps extends React.ComponentPropsWithoutRef<'q'> {}
const Quote = React.forwardRef<QuoteElement, QuoteProps>((props, forwardedRef) => {
  const { className, ...quoteProps } = props;

  return <q {...quoteProps} ref={forwardedRef} className={classNames('rui-Quote', className)} />;
});
Quote.displayName = 'Quote';

export { Quote };
