import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { insetPropDefs } from './inset.props';
import { extractProps } from '../helpers/extract-props';
import { marginPropDefs } from '../props/margin.props';

import type { MarginProps } from '../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props';
import type { GetPropDefTypes } from '../props/prop-def';

type InsetElement = React.ElementRef<'div'>;
type InsetOwnProps = GetPropDefTypes<typeof insetPropDefs>;
interface InsetProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps,
    InsetOwnProps {}

const Inset = React.forwardRef<InsetElement, InsetProps>((props, forwardedRef) => {
  const { asChild, className, ...insetProps } = extractProps(props, insetPropDefs, marginPropDefs);
  const Comp = asChild ? Slot.Root : 'div';
  return <Comp {...insetProps} ref={forwardedRef} className={classNames('rt-Inset', className)} />;
});
Inset.displayName = 'Inset';

export { Inset };
export type { InsetProps };
