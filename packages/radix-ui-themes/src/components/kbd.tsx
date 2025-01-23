import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { kbdPropDefs } from './kbd.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type KbdElement = React.ElementRef<'kbd'>;
type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>;
interface KbdProps extends ComponentPropsWithout<'kbd', RemovedProps>, MarginProps, KbdOwnProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { asChild, className, ...kbdProps } = extractProps(props, kbdPropDefs, marginPropDefs);
  const Comp = asChild ? Slot.Root : 'kbd';
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
