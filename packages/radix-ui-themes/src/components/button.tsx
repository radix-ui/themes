import * as React from 'react';
import classNames from 'classnames';

import { BaseButton } from './_internal/base-button.js';

type ButtonElement = React.ElementRef<typeof BaseButton>;
interface ButtonProps extends React.ComponentPropsWithoutRef<typeof BaseButton> {}
const Button = React.forwardRef<ButtonElement, ButtonProps>(
  ({ className, ...props }, forwardedRef) => (
    <BaseButton {...props} ref={forwardedRef} className={classNames('rt-Button', className)} />
  )
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
