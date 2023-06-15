import * as React from 'react';
import classNames from 'classnames';
import { BaseButton } from './base-button';

type ButtonElement = React.ElementRef<typeof BaseButton>;
interface ButtonProps extends React.ComponentPropsWithoutRef<typeof BaseButton> {}
const Button = React.forwardRef<ButtonElement, ButtonProps>((props, forwardedRef) => {
  const { className, ...buttonProps } = props;

  return (
    <BaseButton
      {...buttonProps}
      ref={forwardedRef}
      className={classNames('rui-Button', className)}
    />
  );
});
Button.displayName = 'Button';

export { Button };
