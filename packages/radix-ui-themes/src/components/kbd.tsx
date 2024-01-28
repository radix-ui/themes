import * as React from 'react';
import classNames from 'classnames';
import { kbdPropDefs } from './kbd.props';
import { extractProps, GetPropDefTypes, marginPropDefs } from '../helpers';

import type { MarginProps, PropsWithoutRefOrColor } from '../helpers';

type KbdElement = React.ElementRef<'kbd'>;
type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>;
interface KbdProps extends PropsWithoutRefOrColor<'kbd'>, MarginProps, KbdOwnProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { className, ...kbdProps } = extractProps(props, kbdPropDefs, marginPropDefs);
  return <kbd {...kbdProps} ref={forwardedRef} className={classNames('rt-Kbd', className)} />;
});
Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };
