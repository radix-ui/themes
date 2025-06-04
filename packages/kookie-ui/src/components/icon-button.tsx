import * as React from 'react';
import classNames from 'classnames';

import { BaseButton } from './_internal/base-button.js';
import type { BaseButtonProps } from './_internal/base-button.js';

type IconButtonElement = React.ElementRef<typeof BaseButton>;

// Polymorphic IconButton props
type IconButtonOwnProps = Omit<BaseButtonProps, 'as'>;

type IconButtonProps<C extends React.ElementType = 'button'> = IconButtonOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof IconButtonOwnProps>;

type IconButtonComponent = <C extends React.ElementType = 'button'>(
  props: IconButtonProps<C> & { ref?: React.ForwardedRef<IconButtonElement> },
) => React.ReactElement | null;

const IconButton = React.forwardRef(
  (
    { className, ...props }: IconButtonProps,
    forwardedRef: React.ForwardedRef<IconButtonElement>,
  ) => (
    <BaseButton {...props} ref={forwardedRef} className={classNames('rt-IconButton', className)} />
  ),
) as IconButtonComponent & { displayName?: string };

IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonProps };
