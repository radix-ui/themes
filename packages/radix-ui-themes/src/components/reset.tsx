import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractProps, requireReactElement } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps } from '../props/index.js';

type ResetElement = React.ElementRef<'div'>;
interface ResetProps extends ComponentPropsWithoutColor<typeof Slot>, MarginProps {}
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
