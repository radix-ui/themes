import * as React from 'react';
import { Toggle } from 'radix-ui';
import { IconButton } from './icon-button.js';
import type { BaseButtonProps } from './_internal/base-button.js';

// Extract the specific types we need
type ButtonVariant = 'classic' | 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
type ButtonSize = '1' | '2' | '3' | '4';
type ButtonColor =
  | 'gray'
  | 'gold'
  | 'bronze'
  | 'brown'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'lime'
  | 'mint'
  | 'sky';
type ButtonRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

interface ToggleIconButtonProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  defaultPressed?: boolean;
  'aria-label': string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  highContrast?: boolean;
  radius?: ButtonRadius;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ToggleIconButtonElement = React.ElementRef<typeof IconButton>;

const ToggleIconButton = React.forwardRef<ToggleIconButtonElement, ToggleIconButtonProps>(
  ({ pressed, onPressedChange, defaultPressed, ...iconButtonProps }, forwardedRef) => {
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
  },
);
ToggleIconButton.displayName = 'ToggleIconButton';

export { ToggleIconButton };
export type { ToggleIconButtonProps };
