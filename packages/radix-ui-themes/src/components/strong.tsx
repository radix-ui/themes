import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { strongPropDefs } from './strong.props.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { GetPropDefTypes } from '../props/index.js';

type StrongElement = React.ElementRef<'strong'>;
type StrongOwnProps = GetPropDefTypes<typeof strongPropDefs>;
interface StrongProps extends ComponentPropsWithoutColor<'strong'>, StrongOwnProps {}
const Strong = React.forwardRef<StrongElement, StrongProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'strong';
    return <Comp {...props} ref={forwardedRef} className={classNames('rt-Strong', className)} />;
  }
);
Strong.displayName = 'Strong';

export { Strong };
export type { StrongProps };
