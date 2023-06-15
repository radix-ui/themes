import * as React from 'react';
import classNames from 'classnames';

type EmElement = React.ElementRef<'em'>;
interface EmProps extends React.ComponentPropsWithoutRef<'em'> {}
const Em = React.forwardRef<EmElement, EmProps>((props, forwardedRef) => {
  const { className, ...emProps } = props;

  return <em {...emProps} ref={forwardedRef} className={classNames('rui-Em', className)} />;
});
Em.displayName = 'Em';

export { Em };
