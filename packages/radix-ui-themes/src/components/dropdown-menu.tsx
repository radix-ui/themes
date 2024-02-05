'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Slottable } from '@radix-ui/react-slot';
import { ScrollArea } from './scroll-area.js';
import {
  dropdownMenuContentPropDefs,
  dropdownMenuItemPropDefs,
  dropdownMenuCheckboxItemPropDefs,
  dropdownMenuRadioItemPropDefs,
} from './dropdown-menu.props.js';
import { extractProps, requireReactElement } from '../helpers/index.js';
import { Theme, useThemeContext } from '../theme.js';
import { ThickCheckIcon, ThickChevronRightIcon } from '../icons.js';

import type { PropsWithoutRefOrColor, GetPropDefTypes } from '../helpers/index.js';
import { baseMenuContentPropDefs } from './base-menu.props.js';

interface DropdownMenuRootProps extends PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Root> {}
const DropdownMenuRoot: React.FC<DropdownMenuRootProps> = (props) => (
  <DropdownMenuPrimitive.Root {...props} />
);
DropdownMenuRoot.displayName = 'DropdownMenuRoot';

type DropdownMenuTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.Trigger>;
interface DropdownMenuTriggerProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Trigger>, 'asChild'> {}
const DropdownMenuTrigger = React.forwardRef<DropdownMenuTriggerElement, DropdownMenuTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <DropdownMenuPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </DropdownMenuPrimitive.Trigger>
  )
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

type DropdownMenuContentOwnProps = GetPropDefTypes<typeof dropdownMenuContentPropDefs>;
type DropdownMenuContentContextValue = DropdownMenuContentOwnProps;
const DropdownMenuContentContext = React.createContext<DropdownMenuContentContextValue>({});
type DropdownMenuContentElement = React.ElementRef<typeof DropdownMenuPrimitive.Content>;
interface DropdownMenuContentProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Content>, 'asChild'>,
    DropdownMenuContentContextValue {
  container?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
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
                    () => ({ size, variant, color, highContrast }),
                    [size, variant, color, highContrast]
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
DropdownMenuContent.displayName = 'DropdownMenuContent';

type DropdownMenuLabelElement = React.ElementRef<typeof DropdownMenuPrimitive.Label>;
interface DropdownMenuLabelProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Label>, 'asChild'> {}
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
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

type DropdownMenuItemElement = React.ElementRef<typeof DropdownMenuPrimitive.Item>;
type DropdownMenuItemOwnProps = GetPropDefTypes<typeof dropdownMenuItemPropDefs>;
interface DropdownMenuItemProps
  extends PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Item>,
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
        <Slottable>{children}</Slottable>
        {shortcut && <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">{shortcut}</div>}
      </DropdownMenuPrimitive.Item>
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

type DropdownMenuGroupElement = React.ElementRef<typeof DropdownMenuPrimitive.Group>;
interface DropdownMenuGroupProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Group>, 'asChild'> {}
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
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

type DropdownMenuRadioGroupElement = React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>;
interface DropdownMenuRadioGroupProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.RadioGroup>, 'asChild'> {}
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
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

type DropdownMenuRadioItemElement = React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>;
type DropdownMenuRadioItemOwnProps = GetPropDefTypes<typeof dropdownMenuRadioItemPropDefs>;
interface DropdownMenuRadioItemProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.RadioItem>, 'asChild'>,
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
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

type DropdownMenuCheckboxItemElement = React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>;
type DropdownMenuCheckboxItemOwnProps = GetPropDefTypes<typeof dropdownMenuCheckboxItemPropDefs>;
interface DropdownMenuCheckboxItemProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.CheckboxItem>, 'asChild'>,
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
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

interface DropdownMenuSubProps extends PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Sub> {}
const DropdownMenuSub: React.FC<DropdownMenuSubProps> = (props) => (
  <DropdownMenuPrimitive.Sub {...props} />
);
DropdownMenuSub.displayName = 'DropdownMenuSub';

type DropdownMenuSubTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>;
interface DropdownMenuSubTriggerProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.SubTrigger>, 'asChild'> {}
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
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

type DropdownMenuSubContentElement = React.ElementRef<typeof DropdownMenuPrimitive.SubContent>;
interface DropdownMenuSubContentProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.SubContent>, 'asChild'> {
  container?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
}
const DropdownMenuSubContent = React.forwardRef<
  DropdownMenuSubContentElement,
  DropdownMenuSubContentProps
>((props, forwardedRef) => {
  const { size, variant, color, highContrast } = React.useContext(DropdownMenuContentContext);
  const { className, children, container, forceMount, ...subContentProps } = extractProps(
    { size, variant, color, highContrast, ...props },
    baseMenuContentPropDefs
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
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

type DropdownMenuSeparatorElement = React.ElementRef<typeof DropdownMenuPrimitive.Separator>;
interface DropdownMenuSeparatorProps
  extends Omit<PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Separator>, 'asChild'> {}
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
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
};

export type {
  DropdownMenuRootProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuLabelProps,
  DropdownMenuItemProps,
  DropdownMenuGroupProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuSeparatorProps,
};
