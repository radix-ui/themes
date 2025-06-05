import * as React from 'react';
import { Toggle } from 'radix-ui';
import { IconButton } from './icon-button.js';
import { BaseButton } from './_internal/base-button.js';
import type { BaseButtonProps } from './_internal/base-button.js';

type ToggleIconButtonElement = React.ElementRef<typeof BaseButton>;

// Extract toggle-specific props from Radix Toggle
type ToggleProps = React.ComponentPropsWithoutRef<typeof Toggle.Root>;

// Required accessibility props for icon buttons (same as IconButton)
type AccessibilityProps =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }
  | { 'aria-label'?: never; 'aria-labelledby'?: never; children: React.ReactNode };

// Combine BaseButton props with Toggle-specific props and accessibility requirements
interface ToggleIconButtonProps extends Omit<BaseButtonProps, 'as'> {
  pressed?: ToggleProps['pressed'];
  onPressedChange?: ToggleProps['onPressedChange'];
  defaultPressed?: ToggleProps['defaultPressed'];
}

// Intersection with accessibility props
type ToggleIconButtonPropsWithAccessibility = ToggleIconButtonProps & AccessibilityProps;

const ToggleIconButton = React.forwardRef<
  ToggleIconButtonElement,
  ToggleIconButtonPropsWithAccessibility
>(({ pressed, onPressedChange, defaultPressed, ...iconButtonProps }, forwardedRef) => {
  return (
    <Toggle.Root
      pressed={pressed}
      onPressedChange={onPressedChange}
      defaultPressed={defaultPressed}
      asChild
    >
      <IconButton {...iconButtonProps} ref={forwardedRef} />
    </Toggle.Root>
  );
});
ToggleIconButton.displayName = 'ToggleIconButton';

export { ToggleIconButton };
export type { ToggleIconButtonPropsWithAccessibility as ToggleIconButtonProps };
