import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { kbdPropDefs } from './kbd.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type KbdElement = React.ElementRef<'kbd'>;
type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>;
interface KbdProps extends ComponentPropsWithoutColor<'kbd'>, MarginProps, KbdOwnProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { asChild, className, ...kbdProps } = extractProps(props, kbdPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : 'kbd';
  return (
    <Comp
      {...kbdProps}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-Kbd', className)}
    />
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };
