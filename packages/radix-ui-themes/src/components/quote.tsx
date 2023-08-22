import * as React from 'react';
import classNames from 'classnames';

type QuoteElement = React.ElementRef<'q'>;
interface QuoteProps extends React.ComponentPropsWithoutRef<'q'> {}
const Quote = React.forwardRef<QuoteElement, QuoteProps>((props, forwardedRef) => (
  <q {...props} ref={forwardedRef} className={classNames('rt-Quote', props.className)} />
));
Quote.displayName = 'Quote';

export { Quote };
export type { QuoteProps };
