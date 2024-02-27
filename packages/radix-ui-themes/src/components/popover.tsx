'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { popoverContentPropDefs } from './popover.props.js';
import { extractProps, requireReactElement } from '../helpers/index.js';
import { Theme } from './theme.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { PopoverContentOwnProps } from '../props/index.js';

interface PopoverRootProps extends ComponentPropsWithoutColor<typeof PopoverPrimitive.Root> {}
const PopoverRoot: React.FC<PopoverRootProps> = (props: PopoverRootProps) => (
  <PopoverPrimitive.Root {...props} />
);
PopoverRoot.displayName = 'PopoverRoot';

type PopoverTriggerElement = React.ElementRef<typeof PopoverPrimitive.Trigger>;
interface PopoverTriggerProps
  extends Omit<ComponentPropsWithoutColor<typeof PopoverPrimitive.Trigger>, 'asChild'> {}
const PopoverTrigger = React.forwardRef<PopoverTriggerElement, PopoverTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </PopoverPrimitive.Trigger>
  )
);
PopoverTrigger.displayName = 'PopoverTrigger';

type PopoverContentElement = React.ElementRef<typeof PopoverPrimitive.Content>;
interface PopoverContentProps
  extends ComponentPropsWithoutColor<typeof PopoverPrimitive.Content>,
    PopoverContentOwnProps {
  container?: React.ComponentProps<typeof PopoverPrimitive.Portal>['container'];
}
const PopoverContent = React.forwardRef<PopoverContentElement, PopoverContentProps>(
  (props, forwardedRef) => {
    const { className, forceMount, container, ...contentProps } = extractProps(
      props,
      popoverContentPropDefs
    );
    return (
      <PopoverPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={8}
            collisionPadding={10}
            {...contentProps}
            ref={forwardedRef}
            className={classNames('rt-PopperContent', 'rt-PopoverContent', className)}
          />
        </Theme>
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = 'PopoverContent';

type PopoverCloseElement = React.ElementRef<typeof PopoverPrimitive.Close>;
interface PopoverCloseProps
  extends Omit<ComponentPropsWithoutColor<typeof PopoverPrimitive.Close>, 'asChild'> {}
const PopoverClose = React.forwardRef<PopoverCloseElement, PopoverCloseProps>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Close {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </PopoverPrimitive.Close>
  )
);
PopoverClose.displayName = 'PopoverClose';

export { PopoverRoot, PopoverContent, PopoverTrigger, PopoverClose };
export type { PopoverRootProps, PopoverContentProps, PopoverTriggerProps, PopoverCloseProps };
