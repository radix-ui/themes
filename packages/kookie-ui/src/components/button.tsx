import * as React from 'react';
import classNames from 'classnames';

import { BaseButton } from './_internal/base-button.js';
import type { BaseButtonProps } from './_internal/base-button.js';

type ButtonElement = React.ElementRef<typeof BaseButton>;

// Polymorphic Button props
type ButtonOwnProps = Omit<BaseButtonProps, 'as'>;

type ButtonProps<C extends React.ElementType = 'button'> = ButtonOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonOwnProps>;

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C> & { ref?: React.ForwardedRef<ButtonElement> },
) => React.ReactElement | null;

const Button = React.forwardRef(
  ({ className, ...props }: ButtonProps, forwardedRef: React.ForwardedRef<ButtonElement>) => (
    <BaseButton {...props} ref={forwardedRef} className={classNames('rt-Button', className)} />
  ),
) as ButtonComponent & { displayName?: string };

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
