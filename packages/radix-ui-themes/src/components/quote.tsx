import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { emPropDefs } from './em.props';

import type { GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type QuoteElement = React.ElementRef<'q'>;
type QuoteOwnProps = GetPropDefTypes<typeof emPropDefs>;
interface QuoteProps extends PropsWithoutRefOrColor<'q'>, QuoteOwnProps {}
const Quote = React.forwardRef<QuoteElement, QuoteProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'q';
    return <Comp {...props} ref={forwardedRef} className={classNames('rt-Quote', className)} />;
  }
);
Quote.displayName = 'Quote';

export { Quote };
export type { QuoteProps };
