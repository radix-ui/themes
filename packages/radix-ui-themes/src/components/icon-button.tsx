import * as React from 'react';
import classNames from 'classnames';
import { BaseButton } from './base-button';

type IconButtonElement = React.ElementRef<typeof BaseButton>;
interface IconButtonProps extends React.ComponentPropsWithoutRef<typeof BaseButton> {}
const IconButton = React.forwardRef<IconButtonElement, IconButtonProps>((props, forwardedRef) => (
  <BaseButton
    {...props}
    ref={forwardedRef}
    className={classNames('rui-IconButton', props.className)}
  />
));
IconButton.displayName = 'IconButton';

export { IconButton };
export {
  baseButtonSizes as iconButtonSizes,
  defaultBaseButtonSize as defaultIconButtonSize,
  baseButtonVariants as iconButtonVariants,
  defaultBaseButtonVariant as defaultIconButtonVariant,
  defaultBaseButtonColor as defaultIconButtonColor,
  defaultBaseButtonRadius as defaultIconButtonRadius,
} from './base-button';
export type {
  BaseButtonSize as IconButtonSize,
  BaseButtonVariant as IconButtonVariant,
} from './base-button';
