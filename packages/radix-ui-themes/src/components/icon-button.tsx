import * as React from 'react';
import classNames from 'classnames';
import { BaseButton } from './base-button';

type IconButtonElement = React.ElementRef<typeof BaseButton>;
interface IconButtonProps extends React.ComponentPropsWithoutRef<typeof BaseButton> {}
const IconButton = React.forwardRef<IconButtonElement, IconButtonProps>((props, forwardedRef) => {
  const { className, ...iconButtonProps } = props;

  return (
    <BaseButton
      {...iconButtonProps}
      ref={forwardedRef}
      className={classNames('rui-IconButton', className)}
    />
  );
});
IconButton.displayName = 'IconButton';

export { IconButton };
export {
  baseButtonSizes as iconButtonSizes,
  baseButtonVariants as iconButtonVariants,
} from './base-button';
export type {
  BaseButtonSize as IconButtonSize,
  BaseButtonVariant as IconButtonVariant,
} from './base-button';
