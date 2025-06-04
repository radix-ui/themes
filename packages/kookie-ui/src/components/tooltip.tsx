import * as React from 'react';
import classNames from 'classnames';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { Text } from './text.js';
import { Theme } from './theme.js';
import { extractProps } from '../helpers/extract-props.js';
import { tooltipPropDefs } from './tooltip.props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type TooltipElement = React.ElementRef<typeof TooltipPrimitive.Content>;
type TooltipOwnProps = GetPropDefTypes<typeof tooltipPropDefs>;
interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
    ComponentPropsWithout<typeof TooltipPrimitive.Content, RemovedProps | 'content'>,
    TooltipOwnProps {
  content: React.ReactNode;
  container?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Portal>['container'];
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
    container,
    forceMount,
    ...tooltipContentProps
  } = extractProps(props, tooltipPropDefs);
  const rootProps = { open, defaultOpen, onOpenChange, delayDuration, disableHoverableContent };
  return (
    <TooltipPrimitive.Root {...rootProps}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <TooltipPrimitive.Content
            sideOffset={4}
            collisionPadding={10}
            {...tooltipContentProps}
            asChild={false}
            ref={forwardedRef}
            className={classNames('rt-TooltipContent', className)}
          >
            <Text as="p" className="rt-TooltipText" size="1">
              {content}
            </Text>
            <TooltipPrimitive.Arrow className="rt-TooltipArrow" />
          </TooltipPrimitive.Content>
        </Theme>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});
Tooltip.displayName = 'Tooltip';

export { Tooltip };
export type { TooltipProps };
