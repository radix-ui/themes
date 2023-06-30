'use client';

import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import classNames from 'classnames';
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import { withBreakpoints } from '../helpers';
import {
  defaultContextMenuContentSize,
  defaultContextMenuContentVariant,
  defaultContextMenuContentColor,
  defaultContextMenuContentHighContrast,
  defaultContextMenuItemColor,
} from './context-menu.props';

import type { Color, Responsive, PropsWithoutRefOrColor } from '../helpers';
import type { ContextMenuContentSize, ContextMenuContentVariant } from './context-menu.props';

interface ContextMenuRootProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root> {}
const ContextMenuRoot: React.FC<ContextMenuRootProps> = (props) => (
  <ContextMenuPrimitive.Root {...props} />
);
ContextMenuRoot.displayName = 'ContextMenuRoot';

type ContextMenuTriggerElement = React.ElementRef<typeof ContextMenuPrimitive.Trigger>;
interface ContextMenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>, 'asChild'> {}
const ContextMenuTrigger = React.forwardRef<ContextMenuTriggerElement, ContextMenuTriggerProps>(
  (props, forwardedRef) => <ContextMenuPrimitive.Trigger {...props} ref={forwardedRef} asChild />
);
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

type ContextMenuContentContextValue = {
  size?: Responsive<ContextMenuContentSize>;
  variant?: ContextMenuContentVariant;
  color?: Color;
  highContrast?: boolean;
};
const ContextMenuContentContext = React.createContext<ContextMenuContentContextValue>({});
type ContextMenuContentElement = React.ElementRef<typeof ContextMenuPrimitive.Content>;
interface ContextMenuContentProps
  extends PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Content>,
    ContextMenuContentContextValue {
  container: React.ComponentProps<typeof ContextMenuPrimitive.Portal>['container'];
}
const ContextMenuContent = React.forwardRef<ContextMenuContentElement, ContextMenuContentProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      size = defaultContextMenuContentSize,
      variant = defaultContextMenuContentVariant,
      color = defaultContextMenuContentColor,
      highContrast = defaultContextMenuContentHighContrast,
      container,
      forceMount,
      ...contentProps
    } = props;
    return (
      <ContextMenuPrimitive.Portal container={container} forceMount={forceMount}>
        <ContextMenuPrimitive.Content
          data-accent-scale={color}
          alignOffset={-Number(size) * 4}
          {...contentProps}
          ref={forwardedRef}
          className={classNames(
            'rui-PopperContent',
            'rui-BaseMenuContent',
            'rui-ContextMenuContent',
            withBreakpoints(size, 'size'),
            `variant-${variant}`,
            { highContrast },
            className
          )}
        >
          <ContextMenuContentContext.Provider
            value={React.useMemo(
              () => ({ size, variant, color, highContrast }),
              [size, variant, color, highContrast]
            )}
          >
            {children}
          </ContextMenuContentContext.Provider>
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    );
  }
);
ContextMenuContent.displayName = 'ContextMenuContent';

type ContextMenuLabelElement = React.ElementRef<typeof ContextMenuPrimitive.Label>;
interface ContextMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> {}
const ContextMenuLabel = React.forwardRef<ContextMenuLabelElement, ContextMenuLabelProps>(
  (props, forwardedRef) => (
    <ContextMenuPrimitive.Label
      {...props}
      ref={forwardedRef}
      className={classNames('rui-BaseMenuLabel', 'rui-ContextMenuLabel', props.className)}
    />
  )
);
ContextMenuLabel.displayName = 'ContextMenuLabel';

type ContextMenuItemElement = React.ElementRef<typeof ContextMenuPrimitive.Item>;
interface ContextMenuItemProps extends PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Item> {
  color?: Color;
  shortcut?: string;
}
const ContextMenuItem = React.forwardRef<ContextMenuItemElement, ContextMenuItemProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      color = defaultContextMenuItemColor,
      shortcut,
      ...itemProps
    } = props;
    return (
      <ContextMenuPrimitive.Item
        data-accent-scale={color}
        {...itemProps}
        ref={forwardedRef}
        className={classNames('rui-BaseMenuItem', 'rui-ContextMenuItem', className)}
      >
        {children}
        {shortcut && <div className="rui-BaseMenuShortcut rui-ContextMenuShortcut">{shortcut}</div>}
      </ContextMenuPrimitive.Item>
    );
  }
);
ContextMenuItem.displayName = 'ContextMenuItem';

type ContextMenuGroupElement = React.ElementRef<typeof ContextMenuPrimitive.Group>;
interface ContextMenuGroupProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group> {}
const ContextMenuGroup = React.forwardRef<ContextMenuGroupElement, ContextMenuGroupProps>(
  (props, forwardedRef) => (
    <ContextMenuPrimitive.Group
      {...props}
      ref={forwardedRef}
      className={classNames('rui-BaseMenuGroup', 'rui-ContextMenuGroup', props.className)}
    />
  )
);
ContextMenuGroup.displayName = 'ContextMenuGroup';

type ContextMenuRadioGroupElement = React.ElementRef<typeof ContextMenuPrimitive.RadioGroup>;
interface ContextMenuRadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup> {}
const ContextMenuRadioGroup = React.forwardRef<
  ContextMenuRadioGroupElement,
  ContextMenuRadioGroupProps
>((props, forwardedRef) => (
  <ContextMenuPrimitive.RadioGroup
    {...props}
    ref={forwardedRef}
    className={classNames('rui-BaseMenuRadioGroup', 'rui-ContextMenuRadioGroup', props.className)}
  />
));
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

type ContextMenuRadioItemElement = React.ElementRef<typeof ContextMenuPrimitive.RadioItem>;
interface ContextMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> {}
const ContextMenuRadioItem = React.forwardRef<
  ContextMenuRadioItemElement,
  ContextMenuRadioItemProps
>((props, forwardedRef) => {
  const { children, className, ...itemProps } = props;
  return (
    <ContextMenuPrimitive.RadioItem
      {...itemProps}
      ref={forwardedRef}
      className={classNames(
        'rui-BaseMenuItem',
        'rui-BaseMenuRadioItem',
        'rui-ContextMenuItem',
        'rui-ContextMenuRadioItem',
        className
      )}
    >
      {children}
      <ContextMenuPrimitive.ItemIndicator className="rui-BaseMenuItemIndicator rui-ContextMenuItemIndicator">
        <DotFilledIcon />
      </ContextMenuPrimitive.ItemIndicator>
    </ContextMenuPrimitive.RadioItem>
  );
});
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

type ContextMenuCheckboxItemElement = React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>;
interface ContextMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> {
  shortcut?: string;
}
const ContextMenuCheckboxItem = React.forwardRef<
  ContextMenuCheckboxItemElement,
  ContextMenuCheckboxItemProps
>((props, forwardedRef) => {
  const { children, className, shortcut, ...itemProps } = props;
  return (
    <ContextMenuPrimitive.CheckboxItem
      {...itemProps}
      ref={forwardedRef}
      className={classNames(
        'rui-BaseMenuItem',
        'rui-BaseMenuCheckboxItem',
        'rui-ContextMenuItem',
        'rui-ContextMenuCheckboxItem',
        className
      )}
    >
      {children}
      <ContextMenuPrimitive.ItemIndicator className="rui-BaseMenuItemIndicator rui-ContextMenuItemIndicator">
        <CheckIcon />
      </ContextMenuPrimitive.ItemIndicator>
      {shortcut && <div className="rui-BaseMenuShortcut rui-ContextMenuShortcut">{shortcut}</div>}
    </ContextMenuPrimitive.CheckboxItem>
  );
});
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

interface ContextMenuSubProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub> {}
const ContextMenuSub = (props: ContextMenuSubProps) => <ContextMenuPrimitive.Sub {...props} />;
ContextMenuSub.displayName = 'ContextMenuSub';

type ContextMenuSubTriggerElement = React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>;
interface ContextMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> {}
const ContextMenuSubTrigger = React.forwardRef<
  ContextMenuSubTriggerElement,
  ContextMenuSubTriggerProps
>((props, forwardedRef) => {
  const { className, children, ...subTriggerProps } = props;
  return (
    <ContextMenuPrimitive.SubTrigger
      {...subTriggerProps}
      ref={forwardedRef}
      className={classNames(
        'rui-BaseMenuItem',
        'rui-BaseMenuSubTrigger',
        'rui-ContextMenuItem',
        'rui-ContextMenuSubTrigger',
        className
      )}
    >
      {children}
      <div className="rui-BaseMenuShortcut rui-ContextMenuShortcut">
        <ChevronRightIcon />
      </div>
    </ContextMenuPrimitive.SubTrigger>
  );
});
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

type ContextMenuSubContentElement = React.ElementRef<typeof ContextMenuPrimitive.SubContent>;
interface ContextMenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> {
  container: React.ComponentProps<typeof ContextMenuPrimitive.Portal>['container'];
}
const ContextMenuSubContent = React.forwardRef<
  ContextMenuSubContentElement,
  ContextMenuSubContentProps
>((props, forwardedRef) => {
  const { className, container, forceMount, ...subContentProps } = props;
  const { size, variant, color, highContrast } = React.useContext(ContextMenuContentContext);
  return (
    <ContextMenuPrimitive.Portal container={container} forceMount={forceMount}>
      <ContextMenuPrimitive.SubContent
        data-accent-scale={color}
        alignOffset={-Number(size) * 4}
        {...subContentProps}
        ref={forwardedRef}
        className={classNames(
          'rui-PopperContent',
          'rui-BaseMenuContent',
          'rui-BaseMenuSubContent',
          'rui-ContextMenuContent',
          'rui-ContextMenuSubContent',
          withBreakpoints(size, 'size'),
          `variant-${variant}`,
          { highContrast },
          className
        )}
      />
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

type ContextMenuSeparatorElement = React.ElementRef<typeof ContextMenuPrimitive.Separator>;
interface ContextMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> {}
const ContextMenuSeparator = React.forwardRef<
  ContextMenuSeparatorElement,
  ContextMenuSeparatorProps
>((props, forwardedRef) => (
  <ContextMenuPrimitive.Separator
    {...props}
    ref={forwardedRef}
    className={classNames('rui-BaseMenuSeparator', 'rui-ContextMenuSeparator', props.className)}
  />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

const ContextMenu = Object.assign(
  {},
  {
    Root: ContextMenuRoot,
    Trigger: ContextMenuTrigger,
    Content: ContextMenuContent,
    Label: ContextMenuLabel,
    Item: ContextMenuItem,
    Group: ContextMenuGroup,
    RadioGroup: ContextMenuRadioGroup,
    RadioItem: ContextMenuRadioItem,
    CheckboxItem: ContextMenuCheckboxItem,
    Sub: ContextMenuSub,
    SubTrigger: ContextMenuSubTrigger,
    SubContent: ContextMenuSubContent,
    Separator: ContextMenuSeparator,
  }
);

export {
  ContextMenu,
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuGroup,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuCheckboxItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuSeparator,
};
