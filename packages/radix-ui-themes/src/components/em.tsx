import * as React from 'react';
import classNames from 'classnames';

type EmElement = React.ElementRef<'em'>;
interface EmProps extends React.ComponentPropsWithoutRef<'em'> {}
const Em = React.forwardRef<EmElement, EmProps>((props, forwardedRef) => (
  <em {...props} ref={forwardedRef} className={classNames('rt-Em', props.className)} />
));
Em.displayName = 'Em';

export { Em };
export type { EmProps };
