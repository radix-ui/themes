'use client';

import * as React from 'react';
import classNames from 'classnames';
import { ContextMenu as ContextMenuPrimitive, Slot } from 'radix-ui';

import { ScrollArea } from './scroll-area.js';
import {
  contextMenuContentPropDefs,
  contextMenuItemPropDefs,
  contextMenuCheckboxItemPropDefs,
  contextMenuRadioItemPropDefs,
} from './context-menu.props.js';
import { Theme, useThemeContext } from './theme.js';
import { ThickCheckIcon, ThickChevronRightIcon } from './icons.js';
import { extractProps } from '../helpers/extract-props.js';
import { requireReactElement } from '../helpers/require-react-element.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

interface ContextMenuRootProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root> {}
const ContextMenuRoot: React.FC<ContextMenuRootProps> = (props) => (
  <ContextMenuPrimitive.Root {...props} />
);
ContextMenuRoot.displayName = 'ContextMenu.Root';

type ContextMenuTriggerElement = React.ElementRef<typeof ContextMenuPrimitive.Trigger>;
interface ContextMenuTriggerProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.Trigger, RemovedProps> {}
const ContextMenuTrigger = React.forwardRef<ContextMenuTriggerElement, ContextMenuTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <ContextMenuPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </ContextMenuPrimitive.Trigger>
  )
);
ContextMenuTrigger.displayName = 'ContextMenu.Trigger';

type ContextMenuContentOwnProps = GetPropDefTypes<typeof contextMenuContentPropDefs>;
type ContextMenuContentContextValue = ContextMenuContentOwnProps;
const ContextMenuContentContext = React.createContext<ContextMenuContentContextValue>({});
type ContextMenuContentElement = React.ElementRef<typeof ContextMenuPrimitive.Content>;
interface ContextMenuContentProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.Content, RemovedProps>,
    ContextMenuContentContextValue {
  container?: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal>['container'];
}
const ContextMenuContent = React.forwardRef<ContextMenuContentElement, ContextMenuContentProps>(
  (props, forwardedRef) => {
    const themeContext = useThemeContext();
    const {
      size = contextMenuContentPropDefs.size.default,
      variant = contextMenuContentPropDefs.variant.default,
      highContrast = contextMenuContentPropDefs.highContrast.default,
    } = props;
    const { className, children, color, container, forceMount, ...contentProps } = extractProps(
      props,
      contextMenuContentPropDefs
    );
    const resolvedColor = color || themeContext.accentColor;
    return (
      <ContextMenuPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <ContextMenuPrimitive.Content
            data-accent-color={resolvedColor}
            alignOffset={-Number(size) * 4}
            collisionPadding={10}
            {...contentProps}
            asChild={false}
            ref={forwardedRef}
            className={classNames(
              'rt-PopperContent',
              'rt-BaseMenuContent',
              'rt-ContextMenuContent',
              className
            )}
          >
            <ScrollArea type="auto">
              <div className={classNames('rt-BaseMenuViewport', 'rt-ContextMenuViewport')}>
                <ContextMenuContentContext.Provider
                  value={React.useMemo(
                    () => ({ size, variant, color: resolvedColor, highContrast }),
                    [size, variant, resolvedColor, highContrast]
                  )}
                >
                  {children}
                </ContextMenuContentContext.Provider>
              </div>
            </ScrollArea>
          </ContextMenuPrimitive.Content>
        </Theme>
      </ContextMenuPrimitive.Portal>
    );
  }
);
ContextMenuContent.displayName = 'ContextMenu.Content';

type ContextMenuLabelElement = React.ElementRef<typeof ContextMenuPrimitive.Label>;
interface ContextMenuLabelProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.Label, RemovedProps> {}
const ContextMenuLabel = React.forwardRef<ContextMenuLabelElement, ContextMenuLabelProps>(
  ({ className, ...props }, forwardedRef) => (
    <ContextMenuPrimitive.Label
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-BaseMenuLabel', 'rt-ContextMenuLabel', className)}
    />
  )
);
ContextMenuLabel.displayName = 'ContextMenu.Label';

type ContextMenuItemElement = React.ElementRef<typeof ContextMenuPrimitive.Item>;
type ContextMenuItemOwnProps = GetPropDefTypes<typeof contextMenuItemPropDefs>;
interface ContextMenuItemProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.Item, RemovedProps>,
    ContextMenuItemOwnProps {}
const ContextMenuItem = React.forwardRef<ContextMenuItemElement, ContextMenuItemProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      color = contextMenuItemPropDefs.color.default,
      shortcut,
      ...itemProps
    } = props;
    return (
      <ContextMenuPrimitive.Item
        data-accent-color={color}
        {...itemProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseMenuItem', 'rt-ContextMenuItem', className)}
      >
        <Slot.Slottable>{children}</Slot.Slottable>
        {shortcut && <div className="rt-BaseMenuShortcut rt-ContextMenuShortcut">{shortcut}</div>}
      </ContextMenuPrimitive.Item>
    );
  }
);
ContextMenuItem.displayName = 'ContextMenu.Item';

type ContextMenuGroupElement = React.ElementRef<typeof ContextMenuPrimitive.Group>;
interface ContextMenuGroupProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.Group, RemovedProps> {}
const ContextMenuGroup = React.forwardRef<ContextMenuGroupElement, ContextMenuGroupProps>(
  ({ className, ...props }, forwardedRef) => (
    <ContextMenuPrimitive.Group
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-BaseMenuGroup', 'rt-ContextMenuGroup', className)}
    />
  )
);
ContextMenuGroup.displayName = 'ContextMenu.Group';

type ContextMenuRadioGroupElement = React.ElementRef<typeof ContextMenuPrimitive.RadioGroup>;
interface ContextMenuRadioGroupProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.RadioGroup, RemovedProps> {}
const ContextMenuRadioGroup = React.forwardRef<
  ContextMenuRadioGroupElement,
  ContextMenuRadioGroupProps
>(({ className, ...props }, forwardedRef) => (
  <ContextMenuPrimitive.RadioGroup
    {...props}
    asChild={false}
    ref={forwardedRef}
    className={classNames('rt-BaseMenuRadioGroup', 'rt-ContextMenuRadioGroup', className)}
  />
));
ContextMenuRadioGroup.displayName = 'ContextMenu.RadioGroup';

type ContextMenuRadioItemElement = React.ElementRef<typeof ContextMenuPrimitive.RadioItem>;
type ContextMenuRadioItemOwnProps = GetPropDefTypes<typeof contextMenuRadioItemPropDefs>;
interface ContextMenuRadioItemProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.RadioItem, RemovedProps>,
    ContextMenuRadioItemOwnProps {}
const ContextMenuRadioItem = React.forwardRef<
  ContextMenuRadioItemElement,
  ContextMenuRadioItemProps
>((props, forwardedRef) => {
  const {
    children,
    className,
    color = contextMenuRadioItemPropDefs.color.default,
    ...itemProps
  } = props;
  return (
    <ContextMenuPrimitive.RadioItem
      {...itemProps}
      asChild={false}
      ref={forwardedRef}
      data-accent-color={color}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuRadioItem',
        'rt-ContextMenuItem',
        'rt-ContextMenuRadioItem',
        className
      )}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <ContextMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator">
        <ThickCheckIcon className="rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" />
      </ContextMenuPrimitive.ItemIndicator>
    </ContextMenuPrimitive.RadioItem>
  );
});
ContextMenuRadioItem.displayName = 'ContextMenu.RadioItem';

type ContextMenuCheckboxItemElement = React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>;
type ContextMenuCheckboxItemOwnProps = GetPropDefTypes<typeof contextMenuCheckboxItemPropDefs>;
interface ContextMenuCheckboxItemProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.CheckboxItem, RemovedProps>,
    ContextMenuCheckboxItemOwnProps {}
const ContextMenuCheckboxItem = React.forwardRef<
  ContextMenuCheckboxItemElement,
  ContextMenuCheckboxItemProps
>((props, forwardedRef) => {
  const {
    children,
    className,
    shortcut,
    color = contextMenuCheckboxItemPropDefs.color.default,
    ...itemProps
  } = props;
  return (
    <ContextMenuPrimitive.CheckboxItem
      {...itemProps}
      asChild={false}
      ref={forwardedRef}
      data-accent-color={color}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuCheckboxItem',
        'rt-ContextMenuItem',
        'rt-ContextMenuCheckboxItem',
        className
      )}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <ContextMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator">
        <ThickCheckIcon className="rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" />
      </ContextMenuPrimitive.ItemIndicator>
      {shortcut && <div className="rt-BaseMenuShortcut rt-ContextMenuShortcut">{shortcut}</div>}
    </ContextMenuPrimitive.CheckboxItem>
  );
});
ContextMenuCheckboxItem.displayName = 'ContextMenu.CheckboxItem';

interface ContextMenuSubProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.Sub, RemovedProps> {}
const ContextMenuSub: React.FC<ContextMenuSubProps> = (props) => (
  <ContextMenuPrimitive.Sub {...props} />
);
ContextMenuSub.displayName = 'ContextMenu.Sub';

type ContextMenuSubTriggerElement = React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>;
interface ContextMenuSubTriggerProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.SubTrigger, RemovedProps> {}
const ContextMenuSubTrigger = React.forwardRef<
  ContextMenuSubTriggerElement,
  ContextMenuSubTriggerProps
>((props, forwardedRef) => {
  const { className, children, ...subTriggerProps } = props;
  return (
    <ContextMenuPrimitive.SubTrigger
      {...subTriggerProps}
      asChild={false}
      ref={forwardedRef}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuSubTrigger',
        'rt-ContextMenuItem',
        'rt-ContextMenuSubTrigger',
        className
      )}
    >
      {children}
      <div className="rt-BaseMenuShortcut rt-ContextMenuShortcut">
        <ThickChevronRightIcon className="rt-BaseMenuSubTriggerIcon rt-ContextMenuSubTriggerIcon" />
      </div>
    </ContextMenuPrimitive.SubTrigger>
  );
});
ContextMenuSubTrigger.displayName = 'ContextMenu.SubTrigger';

type ContextMenuSubContentElement = React.ElementRef<typeof ContextMenuPrimitive.SubContent>;
interface ContextMenuSubContentProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.SubContent, RemovedProps> {
  container?: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal>['container'];
}
const ContextMenuSubContent = React.forwardRef<
  ContextMenuSubContentElement,
  ContextMenuSubContentProps
>((props, forwardedRef) => {
  const { size, variant, color, highContrast } = React.useContext(ContextMenuContentContext);
  const { className, children, container, forceMount, ...subContentProps } = extractProps(
    { size, variant, color, highContrast, ...props },
    contextMenuContentPropDefs
  );
  return (
    <ContextMenuPrimitive.Portal container={container} forceMount={forceMount}>
      <Theme asChild>
        <ContextMenuPrimitive.SubContent
          data-accent-color={color}
          alignOffset={-Number(size) * 4}
          // Side offset accounts for the outer solid box-shadow
          sideOffset={1}
          collisionPadding={10}
          {...subContentProps}
          asChild={false}
          ref={forwardedRef}
          className={classNames(
            'rt-PopperContent',
            'rt-BaseMenuContent',
            'rt-BaseMenuSubContent',
            'rt-ContextMenuContent',
            'rt-ContextMenuSubContent',
            className
          )}
        >
          <ScrollArea type="auto">
            <div className={classNames('rt-BaseMenuViewport', 'rt-ContextMenuViewport')}>
              {children}
            </div>
          </ScrollArea>
        </ContextMenuPrimitive.SubContent>
      </Theme>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuSubContent.displayName = 'ContextMenu.SubContent';

type ContextMenuSeparatorElement = React.ElementRef<typeof ContextMenuPrimitive.Separator>;
interface ContextMenuSeparatorProps
  extends ComponentPropsWithout<typeof ContextMenuPrimitive.Separator, RemovedProps> {}
const ContextMenuSeparator = React.forwardRef<
  ContextMenuSeparatorElement,
  ContextMenuSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <ContextMenuPrimitive.Separator
    {...props}
    asChild={false}
    ref={forwardedRef}
    className={classNames('rt-BaseMenuSeparator', 'rt-ContextMenuSeparator', className)}
  />
));
ContextMenuSeparator.displayName = 'ContextMenu.Separator';

export {
  ContextMenuRoot as Root,
  ContextMenuTrigger as Trigger,
  ContextMenuContent as Content,
  ContextMenuLabel as Label,
  ContextMenuItem as Item,
  ContextMenuGroup as Group,
  ContextMenuRadioGroup as RadioGroup,
  ContextMenuRadioItem as RadioItem,
  ContextMenuCheckboxItem as CheckboxItem,
  ContextMenuSub as Sub,
  ContextMenuSubTrigger as SubTrigger,
  ContextMenuSubContent as SubContent,
  ContextMenuSeparator as Separator,
};

export type {
  ContextMenuRootProps as RootProps,
  ContextMenuTriggerProps as TriggerProps,
  ContextMenuContentProps as ContentProps,
  ContextMenuLabelProps as LabelProps,
  ContextMenuItemProps as ItemProps,
  ContextMenuGroupProps as GroupProps,
  ContextMenuRadioGroupProps as RadioGroupProps,
  ContextMenuRadioItemProps as RadioItemProps,
  ContextMenuCheckboxItemProps as CheckboxItemProps,
  ContextMenuSubProps as SubProps,
  ContextMenuSubTriggerProps as SubTriggerProps,
  ContextMenuSubContentProps as SubContentProps,
  ContextMenuSeparatorProps as SeparatorProps,
};
