import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';

import { requireReactElement } from '../helpers/require-react-element.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

interface ResetProps extends ComponentPropsWithout<typeof Slot, RemovedProps> {}
const Reset = React.forwardRef<HTMLElement, ResetProps>(
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
