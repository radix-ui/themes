'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Text } from './text';

type TooltipElement = React.ElementRef<typeof TooltipPrimitive.Content>;
interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
    Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, 'content'> {
  content: React.ReactNode;
  multiline?: boolean;
}
const Tooltip = React.forwardRef<TooltipElement, TooltipProps>((props, forwardedRef) => {
  const {
    children,
    className,
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    disableHoverableContent,
    content,
    multiline,
    ...tooltipContentProps
  } = props;
  const rootProps = { open, defaultOpen, onOpenChange, delayDuration, disableHoverableContent };

  return (
    <TooltipPrimitive.Root {...rootProps}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={4}
          {...tooltipContentProps}
          ref={forwardedRef}
          className={classNames('rui-TooltipContent', { multiline }, className)}
        >
          <Text className="rui-TooltipText" size="1">
            {content}
          </Text>
          <TooltipPrimitive.Arrow className="rui-TooltipArrow" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});
Tooltip.displayName = 'Tooltip';

export { Tooltip };
