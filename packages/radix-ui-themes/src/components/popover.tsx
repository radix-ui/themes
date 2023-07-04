'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { popoverContentAppearanceDefault } from './popover.props';
import { ThemeConfig } from '../theme-config';

import { ThemeAppearance } from '../theme';

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
  extends Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'asChild'> {
  appearance?: ThemeAppearance;
  container?: React.ComponentProps<typeof PopoverPrimitive.Portal>['container'];
}
const PopoverContent = React.forwardRef<PopoverContentElement, PopoverContentProps>(
  (props, forwardedRef) => {
    const {
      className,
      appearance = popoverContentAppearanceDefault,
      forceMount,
      container,
      ...contentProps
    } = props;
    return (
      <PopoverPrimitive.Portal container={container} forceMount={forceMount}>
        <ThemeConfig asChild appearance={appearance}>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={8}
            collisionPadding={10}
            {...contentProps}
            ref={forwardedRef}
            className={classNames('rui-PopperContent', 'rui-PopoverContent', className)}
          />
        </ThemeConfig>
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = 'PopoverContent';

type PopoverCloseElement = React.ElementRef<typeof PopoverPrimitive.Close>;
interface PopoverCloseProps
  extends Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>, 'asChild'> {}
const PopoverClose = React.forwardRef<PopoverCloseElement, PopoverCloseProps>(
  (props, forwardedRef) => <PopoverPrimitive.Close {...props} ref={forwardedRef} asChild />
);
PopoverClose.displayName = 'PopoverClose';

const Popover = Object.assign(
  {},
  {
    Root: PopoverRoot,
    Content: PopoverContent,
    Trigger: PopoverTrigger,
    Close: PopoverClose,
  }
);

export { Popover, PopoverRoot, PopoverContent, PopoverTrigger, PopoverClose };
