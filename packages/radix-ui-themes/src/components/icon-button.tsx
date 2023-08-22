import * as React from 'react';
import classNames from 'classnames';
import { BaseButton } from './base-button';

type IconButtonElement = React.ElementRef<typeof BaseButton>;
interface IconButtonProps extends React.ComponentPropsWithoutRef<typeof BaseButton> {}
const IconButton = React.forwardRef<IconButtonElement, IconButtonProps>((props, forwardedRef) => (
  <BaseButton
    {...props}
    ref={forwardedRef}
    className={classNames('rt-IconButton', props.className)}
  />
));
IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonProps };
