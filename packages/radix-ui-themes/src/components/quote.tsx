import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { emPropDefs } from './em.props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes } from '../props/index.js';

type QuoteElement = React.ElementRef<'q'>;
type QuoteOwnProps = GetPropDefTypes<typeof emPropDefs>;
interface QuoteProps extends ComponentPropsWithout<RemovedProps, 'q'>, QuoteOwnProps {}
const Quote = React.forwardRef<QuoteElement, QuoteProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'q';
    return <Comp {...props} ref={forwardedRef} className={classNames('rt-Quote', className)} />;
  }
);
Quote.displayName = 'Quote';

export { Quote };
export type { QuoteProps };
