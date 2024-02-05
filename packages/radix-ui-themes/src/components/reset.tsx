import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractProps, marginPropDefs, requireReactElement } from '../helpers/index.js';

import type { MarginProps, PropsWithoutRefOrColor } from '../helpers/index.js';

type ResetElement = React.ElementRef<'div'>;
interface ResetProps extends PropsWithoutRefOrColor<typeof Slot>, MarginProps {}
const Reset = React.forwardRef<ResetElement, ResetProps>((props, forwardedRef) => {
  const { className, children, ...resetProps } = extractProps(props, marginPropDefs);
  return (
    <Slot {...resetProps} ref={forwardedRef} className={classNames('rt-reset', className)}>
      {requireReactElement(children)}
    </Slot>
  );
});
Reset.displayName = 'Reset';

export { Reset };
export type { ResetProps };
