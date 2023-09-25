'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Slottable } from '@radix-ui/react-slot';
import { ScrollArea } from './scroll-area';
import {
  dropdownMenuContentPropDefs,
  dropdownMenuItemPropDefs,
  dropdownMenuCheckboxItemPropDefs,
} from './dropdown-menu.props';
import { withBreakpoints } from '../helpers';
import { Theme, useThemeContext } from '../theme';
import { ThickCheckIcon, ThickChevronRightIcon } from '../icons';

import type { PropsWithoutRefOrColor, GetPropDefTypes } from '../helpers';

interface DropdownMenuRootProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {}
const DropdownMenuRoot: React.FC<DropdownMenuRootProps> = (props) => (
  <DropdownMenuPrimitive.Root {...props} />
);
DropdownMenuRoot.displayName = 'DropdownMenuRoot';

type DropdownMenuTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.Trigger>;
interface DropdownMenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>, 'asChild'> {}
const DropdownMenuTrigger = React.forwardRef<DropdownMenuTriggerElement, DropdownMenuTriggerProps>(
  (props, forwardedRef) => <DropdownMenuPrimitive.Trigger {...props} ref={forwardedRef} asChild />
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

type DropdownMenuContentOwnProps = GetPropDefTypes<typeof dropdownMenuContentPropDefs>;
type DropdownMenuContentContextValue = DropdownMenuContentOwnProps;
const DropdownMenuContentContext = React.createContext<DropdownMenuContentContextValue>({});
type DropdownMenuContentElement = React.ElementRef<typeof DropdownMenuPrimitive.Content>;
interface DropdownMenuContentProps
  extends PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentContextValue {
  container?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
}
const DropdownMenuContent = React.forwardRef<DropdownMenuContentElement, DropdownMenuContentProps>(
  (props, forwardedRef) => {
    const themeContext = useThemeContext();
    const {
      className,
      children,
      size = dropdownMenuContentPropDefs.size.default,
      variant = dropdownMenuContentPropDefs.variant.default,
      highContrast = dropdownMenuContentPropDefs.highContrast.default,
      color = dropdownMenuItemPropDefs.color.default,
      container,
      forceMount,
      ...contentProps
    } = props;
    const resolvedColor = color ?? themeContext.accentColor;
    return (
      <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <DropdownMenuPrimitive.Content
            data-accent-color={resolvedColor}
            align="start"
            sideOffset={4}
            collisionPadding={10}
            {...contentProps}
            ref={forwardedRef}
            className={classNames(
              'rt-PopperContent',
              'rt-BaseMenuContent',
              'rt-DropdownMenuContent',
              className,
              withBreakpoints(size, 'rt-r-size'),
              `rt-variant-${variant}`,
              { 'rt-high-contrast': highContrast }
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
DropdownMenuContent.displayName = 'DropdownMenuContent';

type DropdownMenuLabelElement = React.ElementRef<typeof DropdownMenuPrimitive.Label>;
interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {}
const DropdownMenuLabel = React.forwardRef<DropdownMenuLabelElement, DropdownMenuLabelProps>(
  (props, forwardedRef) => (
    <DropdownMenuPrimitive.Label
      {...props}
      ref={forwardedRef}
      className={classNames('rt-BaseMenuLabel', 'rt-DropdownMenuLabel', props.className)}
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
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> {}
const DropdownMenuGroup = React.forwardRef<DropdownMenuGroupElement, DropdownMenuGroupProps>(
  (props, forwardedRef) => (
    <DropdownMenuPrimitive.Group
      {...props}
      ref={forwardedRef}
      className={classNames('rt-BaseMenuGroup', 'rt-DropdownMenuGroup', props.className)}
    />
  )
);
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

type DropdownMenuRadioGroupElement = React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>;
interface DropdownMenuRadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup> {}
const DropdownMenuRadioGroup = React.forwardRef<
  DropdownMenuRadioGroupElement,
  DropdownMenuRadioGroupProps
>((props, forwardedRef) => (
  <DropdownMenuPrimitive.RadioGroup
    {...props}
    ref={forwardedRef}
    className={classNames('rt-BaseMenuRadioGroup', 'rt-DropdownMenuRadioGroup', props.className)}
  />
));
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

type DropdownMenuRadioItemElement = React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>;
interface DropdownMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {}
const DropdownMenuRadioItem = React.forwardRef<
  DropdownMenuRadioItemElement,
  DropdownMenuRadioItemProps
>((props, forwardedRef) => {
  const { children, className, ...itemProps } = props;
  return (
    <DropdownMenuPrimitive.RadioItem
      {...itemProps}
      ref={forwardedRef}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuRadioItem',
        'rt-DropdownMenuItem',
        'rt-DropdownMenuRadioItem',
        className
      )}
    >
      <Slottable>{children}</Slottable>
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
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    DropdownMenuCheckboxItemOwnProps {}
const DropdownMenuCheckboxItem = React.forwardRef<
  DropdownMenuCheckboxItemElement,
  DropdownMenuCheckboxItemProps
>((props, forwardedRef) => {
  const { children, className, shortcut, ...itemProps } = props;
  return (
    <DropdownMenuPrimitive.CheckboxItem
      {...itemProps}
      ref={forwardedRef}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuCheckboxItem',
        'rt-DropdownMenuItem',
        'rt-DropdownMenuCheckboxItem',
        className
      )}
    >
      <Slottable>{children}</Slottable>
      <DropdownMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator">
        <ThickCheckIcon className="rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" />
      </DropdownMenuPrimitive.ItemIndicator>
      {shortcut && <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">{shortcut}</div>}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

interface DropdownMenuSubProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub> {}
const DropdownMenuSub: React.FC<DropdownMenuSubProps> = (props) => (
  <DropdownMenuPrimitive.Sub {...props} />
);
DropdownMenuSub.displayName = 'DropdownMenuSub';

type DropdownMenuSubTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>;
interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {}
const DropdownMenuSubTrigger = React.forwardRef<
  DropdownMenuSubTriggerElement,
  DropdownMenuSubTriggerProps
>((props, forwardedRef) => {
  const { className, children, ...subTriggerProps } = props;
  return (
    <DropdownMenuPrimitive.SubTrigger
      {...subTriggerProps}
      ref={forwardedRef}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuSubTrigger',
        'rt-DropdownMenuItem',
        'rt-DropdownMenuSubTrigger',
        className
      )}
    >
      <Slottable>{children}</Slottable>
      <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">
        <ThickChevronRightIcon className="rt-BaseMenuSubTriggerIcon rt-DropdownMenuSubtriggerIcon" />
      </div>
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

type DropdownMenuSubContentElement = React.ElementRef<typeof DropdownMenuPrimitive.SubContent>;
interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {
  container?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
}
const DropdownMenuSubContent = React.forwardRef<
  DropdownMenuSubContentElement,
  DropdownMenuSubContentProps
>((props, forwardedRef) => {
  const { className, children, container, forceMount, ...subContentProps } = props;
  const { size, variant, color, highContrast } = React.useContext(DropdownMenuContentContext);
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
          ref={forwardedRef}
          className={classNames(
            'rt-PopperContent',
            'rt-BaseMenuContent',
            'rt-BaseMenuSubContent',
            'rt-DropdownMenuContent',
            'rt-DropdownMenuSubContent',
            className,
            withBreakpoints(size, 'rt-r-size'),
            `rt-variant-${variant}`,
            { 'rt-high-contrast': highContrast }
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
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {}
const DropdownMenuSeparator = React.forwardRef<
  DropdownMenuSeparatorElement,
  DropdownMenuSeparatorProps
>((props, forwardedRef) => (
  <DropdownMenuPrimitive.Separator
    {...props}
    ref={forwardedRef}
    className={classNames('rt-BaseMenuSeparator', 'rt-DropdownMenuSeparator', props.className)}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenu = Object.assign(
  {},
  {
    Root: DropdownMenuRoot,
    Trigger: DropdownMenuTrigger,
    Content: DropdownMenuContent,
    Label: DropdownMenuLabel,
    Item: DropdownMenuItem,
    Group: DropdownMenuGroup,
    RadioGroup: DropdownMenuRadioGroup,
    RadioItem: DropdownMenuRadioItem,
    CheckboxItem: DropdownMenuCheckboxItem,
    Sub: DropdownMenuSub,
    SubTrigger: DropdownMenuSubTrigger,
    SubContent: DropdownMenuSubContent,
    Separator: DropdownMenuSeparator,
  }
);

export {
  DropdownMenu,
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
