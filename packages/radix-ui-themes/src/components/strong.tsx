import * as React from 'react';
import classNames from 'classnames';

type StrongElement = React.ElementRef<'strong'>;
interface StrongProps extends React.ComponentPropsWithoutRef<'strong'> {}
const Strong = React.forwardRef<StrongElement, StrongProps>((props, forwardedRef) => (
  <strong {...props} ref={forwardedRef} className={classNames('rui-Strong', props.className)} />
));
Strong.displayName = 'Strong';

export { Strong };
