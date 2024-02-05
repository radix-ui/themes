'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { Slottable } from '@radix-ui/react-slot';
import { ScrollArea } from './scroll-area.js';
import {
  contextMenuContentPropDefs,
  contextMenuItemPropDefs,
  contextMenuCheckboxItemPropDefs,
  contextMenuRadioItemPropDefs,
} from './context-menu.props.js';
import { extractProps, requireReactElement } from '../helpers/index.js';
import { Theme, useThemeContext } from '../theme.js';
import { ThickCheckIcon, ThickChevronRightIcon } from '../icons.js';

import type { PropsWithoutRefOrColor, GetPropDefTypes } from '../helpers/index.js';
import { baseMenuContentPropDefs } from './base-menu.props.js';

interface ContextMenuRootProps extends PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Root> {}
const ContextMenuRoot: React.FC<ContextMenuRootProps> = (props) => (
  <ContextMenuPrimitive.Root {...props} />
);
ContextMenuRoot.displayName = 'ContextMenuRoot';

type ContextMenuTriggerElement = React.ElementRef<typeof ContextMenuPrimitive.Trigger>;
interface ContextMenuTriggerProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Trigger>, 'asChild'> {}
const ContextMenuTrigger = React.forwardRef<ContextMenuTriggerElement, ContextMenuTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <ContextMenuPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </ContextMenuPrimitive.Trigger>
  )
);
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

type ContextMenuContentOwnProps = GetPropDefTypes<typeof contextMenuContentPropDefs>;
type ContextMenuContentContextValue = ContextMenuContentOwnProps;
const ContextMenuContentContext = React.createContext<ContextMenuContentContextValue>({});
type ContextMenuContentElement = React.ElementRef<typeof ContextMenuPrimitive.Content>;
interface ContextMenuContentProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Content>, 'asChild'>,
    ContextMenuContentContextValue {
  container?: React.ComponentProps<typeof ContextMenuPrimitive.Portal>['container'];
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
      baseMenuContentPropDefs
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
                    () => ({ size, variant, color, highContrast }),
                    [size, variant, color, highContrast]
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
ContextMenuContent.displayName = 'ContextMenuContent';

type ContextMenuLabelElement = React.ElementRef<typeof ContextMenuPrimitive.Label>;
interface ContextMenuLabelProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Label>, 'asChild'> {}
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
ContextMenuLabel.displayName = 'ContextMenuLabel';

type ContextMenuItemElement = React.ElementRef<typeof ContextMenuPrimitive.Item>;
type ContextMenuItemOwnProps = GetPropDefTypes<typeof contextMenuItemPropDefs>;
interface ContextMenuItemProps
  extends PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Item>,
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
        <Slottable>{children}</Slottable>
        {shortcut && <div className="rt-BaseMenuShortcut rt-ContextMenuShortcut">{shortcut}</div>}
      </ContextMenuPrimitive.Item>
    );
  }
);
ContextMenuItem.displayName = 'ContextMenuItem';

type ContextMenuGroupElement = React.ElementRef<typeof ContextMenuPrimitive.Group>;
interface ContextMenuGroupProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Group>, 'asChild'> {}
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
ContextMenuGroup.displayName = 'ContextMenuGroup';

type ContextMenuRadioGroupElement = React.ElementRef<typeof ContextMenuPrimitive.RadioGroup>;
interface ContextMenuRadioGroupProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.RadioGroup>, 'asChild'> {}
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
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

type ContextMenuRadioItemElement = React.ElementRef<typeof ContextMenuPrimitive.RadioItem>;
type ContextMenuRadioItemOwnProps = GetPropDefTypes<typeof contextMenuRadioItemPropDefs>;
interface ContextMenuRadioItemProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.RadioItem>, 'asChild'>,
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
      <Slottable>{children}</Slottable>
      <ContextMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator">
        <ThickCheckIcon className="rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" />
      </ContextMenuPrimitive.ItemIndicator>
    </ContextMenuPrimitive.RadioItem>
  );
});
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

type ContextMenuCheckboxItemElement = React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>;
type ContextMenuCheckboxItemOwnProps = GetPropDefTypes<typeof contextMenuCheckboxItemPropDefs>;
interface ContextMenuCheckboxItemProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.CheckboxItem>, 'asChild'>,
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
      <Slottable>{children}</Slottable>
      <ContextMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator">
        <ThickCheckIcon className="rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" />
      </ContextMenuPrimitive.ItemIndicator>
      {shortcut && <div className="rt-BaseMenuShortcut rt-ContextMenuShortcut">{shortcut}</div>}
    </ContextMenuPrimitive.CheckboxItem>
  );
});
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

interface ContextMenuSubProps extends PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Sub> {}
const ContextMenuSub: React.FC<ContextMenuSubProps> = (props) => (
  <ContextMenuPrimitive.Sub {...props} />
);
ContextMenuSub.displayName = 'ContextMenuSub';

type ContextMenuSubTriggerElement = React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>;
interface ContextMenuSubTriggerProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.SubTrigger>, 'asChild'> {}
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
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

type ContextMenuSubContentElement = React.ElementRef<typeof ContextMenuPrimitive.SubContent>;
interface ContextMenuSubContentProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.SubContent>, 'asChild'> {
  container?: React.ComponentProps<typeof ContextMenuPrimitive.Portal>['container'];
}
const ContextMenuSubContent = React.forwardRef<
  ContextMenuSubContentElement,
  ContextMenuSubContentProps
>((props, forwardedRef) => {
  const { size, variant, color, highContrast } = React.useContext(ContextMenuContentContext);
  const { className, children, container, forceMount, ...subContentProps } = extractProps(
    { size, variant, color, highContrast, ...props },
    baseMenuContentPropDefs
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
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

type ContextMenuSeparatorElement = React.ElementRef<typeof ContextMenuPrimitive.Separator>;
interface ContextMenuSeparatorProps
  extends Omit<PropsWithoutRefOrColor<typeof ContextMenuPrimitive.Separator>, 'asChild'> {}
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
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export {
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

export type {
  ContextMenuRootProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuLabelProps,
  ContextMenuItemProps,
  ContextMenuGroupProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuCheckboxItemProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
  ContextMenuSeparatorProps,
};
