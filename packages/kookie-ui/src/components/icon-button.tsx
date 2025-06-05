import * as React from 'react';
import classNames from 'classnames';

import { BaseButton } from './_internal/base-button.js';
import type { BaseButtonProps } from './_internal/base-button.js';

type IconButtonElement = React.ElementRef<typeof BaseButton>;

// Required accessibility props for icon buttons
type AccessibilityProps =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }
  | { 'aria-label'?: never; 'aria-labelledby'?: never; children: React.ReactNode };

// Polymorphic IconButton props with required accessibility
type IconButtonOwnProps = Omit<BaseButtonProps, 'as'> & AccessibilityProps;

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
  ) => {
    // Warn in development if no accessibility attributes are provided
    if (process.env.NODE_ENV === 'development') {
      const hasAriaLabel = 'aria-label' in props && props['aria-label'];
      const hasAriaLabelledBy = 'aria-labelledby' in props && props['aria-labelledby'];
      const hasChildren = 'children' in props && props.children;

      if (!hasAriaLabel && !hasAriaLabelledBy && !hasChildren) {
        console.warn(
          'IconButton: Icon buttons must have an accessible name. Please provide either:' +
            '\n- aria-label prop with descriptive text' +
            '\n- aria-labelledby prop referencing a label element' +
            '\n- or visible text children',
        );
      }
    }

    return (
      <BaseButton
        {...props}
        ref={forwardedRef}
        className={classNames('rt-IconButton', className)}
      />
    );
  },
) as IconButtonComponent & { displayName?: string };

IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonProps };
