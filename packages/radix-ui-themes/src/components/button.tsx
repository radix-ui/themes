import * as React from 'react';
import classNames from 'classnames';
import { BaseButton } from './base-button';

type ButtonElement = React.ElementRef<typeof BaseButton>;
interface ButtonProps extends React.ComponentPropsWithoutRef<typeof BaseButton> {}
const Button = React.forwardRef<ButtonElement, ButtonProps>((props, forwardedRef) => (
  <BaseButton {...props} ref={forwardedRef} className={classNames('rui-Button', props.className)} />
));
Button.displayName = 'Button';

export { Button };
export {
  baseButtonSizes as buttonSizes,
  defaultBaseButtonSize as defaultButtonSize,
  baseButtonVariants as buttonVariants,
  defaultBaseButtonVariant as defaultButtonVariant,
  defaultBaseButtonColor as defaultButtonColor,
  defaultBaseButtonRadius as defaultButtonRadius,
} from './base-button';
export type {
  BaseButtonSize as ButtonSize,
  BaseButtonVariant as ButtonVariant,
} from './base-button';
