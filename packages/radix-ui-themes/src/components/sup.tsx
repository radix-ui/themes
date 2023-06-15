import * as React from 'react';
import classNames from 'classnames';

type SupElement = React.ElementRef<'sup'>;
interface SupProps extends React.ComponentPropsWithoutRef<'sup'> {}
const Sup = React.forwardRef<SupElement, SupProps>((props, forwardedRef) => {
  const { className, ...supProps } = props;

  return <sup {...supProps} ref={forwardedRef} className={classNames('rui-Sup', className)} />;
});
Sup.displayName = 'Sup';

export { Sup };
