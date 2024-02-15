import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { requireReactElement } from '../helpers/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';

type ResetElement = React.ElementRef<'div'>;
interface ResetProps extends ComponentPropsWithoutColor<typeof Slot> {}
const Reset = React.forwardRef<ResetElement, ResetProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <Slot {...props} ref={forwardedRef} className={classNames('rt-reset', className)}>
        {requireReactElement(children)}
      </Slot>
    );
  }
);
Reset.displayName = 'Reset';

export { Reset };
export type { ResetProps };
