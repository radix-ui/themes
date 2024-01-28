import * as React from 'react';
import classNames from 'classnames';
import { kbdPropDefs } from './kbd.props';
import { extractProps, GetPropDefTypes, marginPropDefs } from '../helpers';

import type { MarginProps } from '../helpers';
import { Slot } from '@radix-ui/react-slot';

type KbdElement = React.ElementRef<'kbd'>;
type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>;
interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, MarginProps, KbdOwnProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>(
  ({ asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'kbd';
    const { className, ...kbdProps } = extractProps(props, kbdPropDefs, marginPropDefs);
    return (
      <Comp {...kbdProps} ref={forwardedRef} className={classNames('rt-reset rt-Kbd', className)} />
    );
  }
);
Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };
