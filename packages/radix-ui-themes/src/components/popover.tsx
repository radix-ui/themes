'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import classNames from 'classnames';

interface PopoverRootProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {}
const PopoverRoot = (props: PopoverRootProps) => <PopoverPrimitive.Root {...props} />;
PopoverRoot.displayName = 'PopoverRoot';

type PopoverTriggerElement = React.ElementRef<typeof PopoverPrimitive.Trigger>;
interface PopoverTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>, 'asChild'> {}
const PopoverTrigger = React.forwardRef<PopoverTriggerElement, PopoverTriggerProps>(
  (props, forwardedRef) => <PopoverPrimitive.Trigger {...props} ref={forwardedRef} asChild />
);
PopoverTrigger.displayName = 'PopoverTrigger';

type PopoverContentElement = React.ElementRef<typeof PopoverPrimitive.Content>;
interface PopoverContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'asChild'> {}
const PopoverContent = React.forwardRef<PopoverContentElement, PopoverContentProps>(
  (props, forwardedRef) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align="start"
        sideOffset={8}
        {...props}
        ref={forwardedRef}
        className={classNames('rui-PopperContent', 'rui-PopoverContent', props.className)}
      />
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = 'PopoverContent';

type PopoverCloseElement = React.ElementRef<typeof PopoverPrimitive.Close>;
interface PopoverCloseProps
  extends Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>, 'asChild'> {}
const PopoverClose = React.forwardRef<PopoverCloseElement, PopoverCloseProps>(
  (props, forwardedRef) => <PopoverPrimitive.Close {...props} ref={forwardedRef} asChild />
);
PopoverClose.displayName = 'PopoverClose';

export const Popover = {
  Root: PopoverRoot,
  Content: PopoverContent,
  Trigger: PopoverTrigger,
  Close: PopoverClose,
};
