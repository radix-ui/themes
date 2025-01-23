import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { emPropDefs } from './em.props';
import { extractProps } from '../helpers/extract-props';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props';
import type { GetPropDefTypes } from '../props/prop-def';

type EmElement = React.ElementRef<'em'>;
type EmOwnProps = GetPropDefTypes<typeof emPropDefs>;
interface EmProps extends ComponentPropsWithout<'em', RemovedProps>, EmOwnProps {}
const Em = React.forwardRef<EmElement, EmProps>((props, forwardedRef) => {
  const { asChild, className, ...emProps } = extractProps(props, emPropDefs);
  const Comp = asChild ? Slot.Root : 'em';
  return <Comp {...emProps} ref={forwardedRef} className={classNames('rt-Em', className)} />;
});
Em.displayName = 'Em';

export { Em };
export type { EmProps };
