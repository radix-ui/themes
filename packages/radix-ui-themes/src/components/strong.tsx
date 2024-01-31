import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { strongPropDefs } from './strong.props';

import type { GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type StrongElement = React.ElementRef<'strong'>;
type StrongOwnProps = GetPropDefTypes<typeof strongPropDefs>;
interface StrongProps extends PropsWithoutRefOrColor<'strong'>, StrongOwnProps {}
const Strong = React.forwardRef<StrongElement, StrongProps>(
  ({ asChild, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'strong';
    return (
      <Comp {...props} ref={forwardedRef} className={classNames('rt-Strong', props.className)} />
    );
  }
);
Strong.displayName = 'Strong';

export { Strong };
export type { StrongProps };
