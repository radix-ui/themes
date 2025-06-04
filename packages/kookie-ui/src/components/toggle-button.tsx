import * as React from 'react';
import { Toggle } from 'radix-ui';
import { Button } from './button.js';

interface ToggleButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  defaultPressed?: boolean;
}

type ToggleButtonElement = React.ElementRef<typeof Button>;

const ToggleButton = React.forwardRef<ToggleButtonElement, ToggleButtonProps>(
  ({ pressed, onPressedChange, defaultPressed, ...buttonProps }, forwardedRef) => {
    return (
      <Toggle.Root
        pressed={pressed}
        onPressedChange={onPressedChange}
        defaultPressed={defaultPressed}
        asChild
      >
        <Button {...buttonProps} ref={forwardedRef} />
      </Toggle.Root>
    );
  },
);
ToggleButton.displayName = 'ToggleButton';

export { ToggleButton };
export type { ToggleButtonProps };
