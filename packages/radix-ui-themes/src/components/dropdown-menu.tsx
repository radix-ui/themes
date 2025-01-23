'use client';

import * as React from 'react';
import classNames from 'classnames';
import { DropdownMenu as DropdownMenuPrimitive, Slot } from 'radix-ui';

import { ScrollArea } from './scroll-area.js';
import {
  dropdownMenuContentPropDefs,
  dropdownMenuItemPropDefs,
  dropdownMenuCheckboxItemPropDefs,
  dropdownMenuRadioItemPropDefs,
} from './dropdown-menu.props.js';
import { Theme, useThemeContext } from './theme.js';
import { ChevronDownIcon, ThickCheckIcon, ThickChevronRightIcon } from './icons.js';
import { extractProps } from '../helpers/extract-props.js';
import { requireReactElement } from '../helpers/require-react-element.js';

import type { IconProps } from './icons.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

interface DropdownMenuRootProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {}
const DropdownMenuRoot: React.FC<DropdownMenuRootProps> = (props) => (
  <DropdownMenuPrimitive.Root {...props} />
);
DropdownMenuRoot.displayName = 'DropdownMenu.Root';

type DropdownMenuTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.Trigger>;
interface DropdownMenuTriggerProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.Trigger, RemovedProps> {}
const DropdownMenuTrigger = React.forwardRef<DropdownMenuTriggerElement, DropdownMenuTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </DropdownMenuPrimitive.Trigger>
  )
);
DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger';

type DropdownMenuContentOwnProps = GetPropDefTypes<typeof dropdownMenuContentPropDefs>;
type DropdownMenuContentContextValue = DropdownMenuContentOwnProps;
const DropdownMenuContentContext = React.createContext<DropdownMenuContentContextValue>({});
type DropdownMenuContentElement = React.ElementRef<typeof DropdownMenuPrimitive.Content>;
interface DropdownMenuContentProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.Content, RemovedProps>,
    DropdownMenuContentContextValue {
  container?: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>['container'];
}
const DropdownMenuContent = React.forwardRef<DropdownMenuContentElement, DropdownMenuContentProps>(
  (props, forwardedRef) => {
    const themeContext = useThemeContext();
    const {
      size = dropdownMenuContentPropDefs.size.default,
      variant = dropdownMenuContentPropDefs.variant.default,
      highContrast = dropdownMenuContentPropDefs.highContrast.default,
    } = props;
    const { className, children, color, container, forceMount, ...contentProps } = extractProps(
      props,
      dropdownMenuContentPropDefs
    );
    const resolvedColor = color || themeContext.accentColor;
    return (
      <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <DropdownMenuPrimitive.Content
            data-accent-color={resolvedColor}
            align="start"
            sideOffset={4}
            collisionPadding={10}
            {...contentProps}
            asChild={false}
            ref={forwardedRef}
            className={classNames(
              'rt-PopperContent',
              'rt-BaseMenuContent',
              'rt-DropdownMenuContent',
              className
            )}
          >
            <ScrollArea type="auto">
              <div className={classNames('rt-BaseMenuViewport', 'rt-DropdownMenuViewport')}>
                <DropdownMenuContentContext.Provider
                  value={React.useMemo(
                    () => ({ size, variant, color: resolvedColor, highContrast }),
                    [size, variant, resolvedColor, highContrast]
                  )}
                >
                  {children}
                </DropdownMenuContentContext.Provider>
              </div>
            </ScrollArea>
          </DropdownMenuPrimitive.Content>
        </Theme>
      </DropdownMenuPrimitive.Portal>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenu.Content';

type DropdownMenuLabelElement = React.ElementRef<typeof DropdownMenuPrimitive.Label>;
interface DropdownMenuLabelProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.Label, RemovedProps> {}
const DropdownMenuLabel = React.forwardRef<DropdownMenuLabelElement, DropdownMenuLabelProps>(
  ({ className, ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Label
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-BaseMenuLabel', 'rt-DropdownMenuLabel', className)}
    />
  )
);
DropdownMenuLabel.displayName = 'DropdownMenu.Label';

type DropdownMenuItemElement = React.ElementRef<typeof DropdownMenuPrimitive.Item>;
type DropdownMenuItemOwnProps = GetPropDefTypes<typeof dropdownMenuItemPropDefs>;
interface DropdownMenuItemProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.Item, RemovedProps>,
    DropdownMenuItemOwnProps {}
const DropdownMenuItem = React.forwardRef<DropdownMenuItemElement, DropdownMenuItemProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      color = dropdownMenuItemPropDefs.color.default,
      shortcut,
      ...itemProps
    } = props;
    return (
      <DropdownMenuPrimitive.Item
        data-accent-color={color}
        {...itemProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseMenuItem', 'rt-DropdownMenuItem', className)}
      >
        <Slot.Slottable>{children}</Slot.Slottable>
        {shortcut && <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">{shortcut}</div>}
      </DropdownMenuPrimitive.Item>
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenu.Item';

type DropdownMenuGroupElement = React.ElementRef<typeof DropdownMenuPrimitive.Group>;
interface DropdownMenuGroupProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.Group, RemovedProps> {}
const DropdownMenuGroup = React.forwardRef<DropdownMenuGroupElement, DropdownMenuGroupProps>(
  ({ className, ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Group
      {...props}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-BaseMenuGroup', 'rt-DropdownMenuGroup', className)}
    />
  )
);
DropdownMenuGroup.displayName = 'DropdownMenu.Group';

type DropdownMenuRadioGroupElement = React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>;
interface DropdownMenuRadioGroupProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.RadioGroup, RemovedProps> {}
const DropdownMenuRadioGroup = React.forwardRef<
  DropdownMenuRadioGroupElement,
  DropdownMenuRadioGroupProps
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.RadioGroup
    {...props}
    asChild={false}
    ref={forwardedRef}
    className={classNames('rt-BaseMenuRadioGroup', 'rt-DropdownMenuRadioGroup', className)}
  />
));
DropdownMenuRadioGroup.displayName = 'DropdownMenu.RadioGroup';

type DropdownMenuRadioItemElement = React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>;
type DropdownMenuRadioItemOwnProps = GetPropDefTypes<typeof dropdownMenuRadioItemPropDefs>;
interface DropdownMenuRadioItemProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.RadioItem, RemovedProps>,
    DropdownMenuRadioItemOwnProps {}
const DropdownMenuRadioItem = React.forwardRef<
  DropdownMenuRadioItemElement,
  DropdownMenuRadioItemProps
>((props, forwardedRef) => {
  const {
    children,
    className,
    color = dropdownMenuRadioItemPropDefs.color.default,
    ...itemProps
  } = props;
  return (
    <DropdownMenuPrimitive.RadioItem
      {...itemProps}
      asChild={false}
      ref={forwardedRef}
      data-accent-color={color}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuRadioItem',
        'rt-DropdownMenuItem',
        'rt-DropdownMenuRadioItem',
        className
      )}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator">
        <ThickCheckIcon className="rt-BaseMenuItemIndicatorIcon rt-DropdownMenuItemIndicatorIcon" />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = 'DropdownMenu.RadioItem';

type DropdownMenuCheckboxItemElement = React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>;
type DropdownMenuCheckboxItemOwnProps = GetPropDefTypes<typeof dropdownMenuCheckboxItemPropDefs>;
interface DropdownMenuCheckboxItemProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.CheckboxItem, RemovedProps>,
    DropdownMenuCheckboxItemOwnProps {}
const DropdownMenuCheckboxItem = React.forwardRef<
  DropdownMenuCheckboxItemElement,
  DropdownMenuCheckboxItemProps
>((props, forwardedRef) => {
  const {
    children,
    className,
    shortcut,
    color = dropdownMenuCheckboxItemPropDefs.color.default,
    ...itemProps
  } = props;
  return (
    <DropdownMenuPrimitive.CheckboxItem
      {...itemProps}
      asChild={false}
      ref={forwardedRef}
      data-accent-color={color}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuCheckboxItem',
        'rt-DropdownMenuItem',
        'rt-DropdownMenuCheckboxItem',
        className
      )}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator">
        <ThickCheckIcon className="rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" />
      </DropdownMenuPrimitive.ItemIndicator>
      {shortcut && <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">{shortcut}</div>}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = 'DropdownMenu.CheckboxItem';

interface DropdownMenuSubProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub> {}
const DropdownMenuSub: React.FC<DropdownMenuSubProps> = (props) => (
  <DropdownMenuPrimitive.Sub {...props} />
);
DropdownMenuSub.displayName = 'DropdownMenu.Sub';

type DropdownMenuSubTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>;
interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.SubTrigger, RemovedProps> {}
const DropdownMenuSubTrigger = React.forwardRef<
  DropdownMenuSubTriggerElement,
  DropdownMenuSubTriggerProps
>((props, forwardedRef) => {
  const { className, children, ...subTriggerProps } = props;
  return (
    <DropdownMenuPrimitive.SubTrigger
      {...subTriggerProps}
      asChild={false}
      ref={forwardedRef}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuSubTrigger',
        'rt-DropdownMenuItem',
        'rt-DropdownMenuSubTrigger',
        className
      )}
    >
      {children}
      <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">
        <ThickChevronRightIcon className="rt-BaseMenuSubTriggerIcon rt-DropdownMenuSubtriggerIcon" />
      </div>
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = 'DropdownMenu.SubTrigger';

type DropdownMenuSubContentElement = React.ElementRef<typeof DropdownMenuPrimitive.SubContent>;
interface DropdownMenuSubContentProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.SubContent, RemovedProps> {
  container?: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>['container'];
}
const DropdownMenuSubContent = React.forwardRef<
  DropdownMenuSubContentElement,
  DropdownMenuSubContentProps
>((props, forwardedRef) => {
  const { size, variant, color, highContrast } = React.useContext(DropdownMenuContentContext);
  const { className, children, container, forceMount, ...subContentProps } = extractProps(
    { size, variant, color, highContrast, ...props },
    dropdownMenuContentPropDefs
  );
  return (
    <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
      <Theme asChild>
        <DropdownMenuPrimitive.SubContent
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
            'rt-DropdownMenuContent',
            'rt-DropdownMenuSubContent',
            className
          )}
        >
          <ScrollArea type="auto">
            <div className={classNames('rt-BaseMenuViewport', 'rt-DropdownMenuViewport')}>
              {children}
            </div>
          </ScrollArea>
        </DropdownMenuPrimitive.SubContent>
      </Theme>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuSubContent.displayName = 'DropdownMenu.SubContent';

type DropdownMenuSeparatorElement = React.ElementRef<typeof DropdownMenuPrimitive.Separator>;
interface DropdownMenuSeparatorProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.Separator, RemovedProps> {}
const DropdownMenuSeparator = React.forwardRef<
  DropdownMenuSeparatorElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.Separator
    {...props}
    asChild={false}
    ref={forwardedRef}
    className={classNames('rt-BaseMenuSeparator', 'rt-DropdownMenuSeparator', className)}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenu.Separator';

export {
  DropdownMenuRoot as Root,
  DropdownMenuTrigger as Trigger,
  ChevronDownIcon as TriggerIcon,
  DropdownMenuContent as Content,
  DropdownMenuLabel as Label,
  DropdownMenuItem as Item,
  DropdownMenuGroup as Group,
  DropdownMenuRadioGroup as RadioGroup,
  DropdownMenuRadioItem as RadioItem,
  DropdownMenuCheckboxItem as CheckboxItem,
  DropdownMenuSub as Sub,
  DropdownMenuSubTrigger as SubTrigger,
  DropdownMenuSubContent as SubContent,
  DropdownMenuSeparator as Separator,
};

export type {
  DropdownMenuRootProps as RootProps,
  DropdownMenuTriggerProps as TriggerProps,
  IconProps as TriggerIconProps,
  DropdownMenuContentProps as ContentProps,
  DropdownMenuLabelProps as LabelProps,
  DropdownMenuItemProps as ItemProps,
  DropdownMenuGroupProps as GroupProps,
  DropdownMenuRadioGroupProps as RadioGroupProps,
  DropdownMenuRadioItemProps as RadioItemProps,
  DropdownMenuCheckboxItemProps as CheckboxItemProps,
  DropdownMenuSubProps as SubProps,
  DropdownMenuSubTriggerProps as SubTriggerProps,
  DropdownMenuSubContentProps as SubContentProps,
  DropdownMenuSeparatorProps as SeparatorProps,
};
