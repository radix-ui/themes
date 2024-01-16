import * as React from 'react';
import classNames from 'classnames';
import { insetPropDefs } from './inset.props';
import { extractProps, marginPropDefs } from '../helpers';

import type { MarginProps, GetPropDefTypes } from '../helpers';

type InsetElement = React.ElementRef<'div'>;
type InsetOwnProps = GetPropDefTypes<typeof insetPropDefs>;
interface InsetProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, InsetOwnProps {}

const Inset = React.forwardRef<InsetElement, InsetProps>((props, forwardedRef) => {
  const { className, ...insetProps } = extractProps(props, insetPropDefs, marginPropDefs);
  return <div {...insetProps} ref={forwardedRef} className={classNames('rt-Inset', className)} />;
});
Inset.displayName = 'Inset';

export { Inset };
export type { InsetProps };
