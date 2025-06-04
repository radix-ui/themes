import * as React from 'react';
import { Toggle } from 'radix-ui';
import { IconButton } from './icon-button.js';

interface ToggleIconButtonProps extends React.ComponentPropsWithoutRef<typeof IconButton> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  defaultPressed?: boolean;
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
