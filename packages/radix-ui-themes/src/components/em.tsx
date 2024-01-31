import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';

import type { GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';
import { emPropDefs } from './em.props';

type EmElement = React.ElementRef<'em'>;
type EmOwnProps = GetPropDefTypes<typeof emPropDefs>;
interface EmProps extends PropsWithoutRefOrColor<'em'>, EmOwnProps {}
const Em = React.forwardRef<EmElement, EmProps>(({ asChild, ...props }, forwardedRef) => {
  const Comp = asChild ? Slot : 'em';
  return <Comp {...props} ref={forwardedRef} className={classNames('rt-Em', props.className)} />;
});
Em.displayName = 'Em';

export { Em };
export type { EmProps };
