'use client';

import * as React from 'react';
import classNames from 'classnames';
import { DropdownMenu as DropdownMenuPrimitive, Slot } from 'radix-ui';

import { ScrollArea } from './scroll-area.js';
import {
  dropdownMenuContentPropDefs,
  dropdownMenuSubContentPropDefs,
  dropdownMenuItemPropDefs,
  dropdownMenuCheckboxItemPropDefs,
  dropdownMenuRadioItemPropDefs,
} from './dropdown-menu.props.js';
import { Theme, useThemeContext } from './theme.js';
import { ChevronDownIcon, ThickCheckIcon, ThickChevronLeftIcon, ThickChevronRightIcon, ThickDotIcon } from './icons.js';
import { extractProps } from '../helpers/extract-props.js';
import {
  DrillDownProvider,
  SubContext,
  useDrillDown,
  useDrillDownOptional,
  useSubContext,
} from './_internal/dropdown-menu-drill-down.js';
import type { SubmenuBehavior } from './_internal/dropdown-menu-drill-down.js';
import { requireReactElement } from '../helpers/require-react-element.js';
import { Kbd } from './kbd.js';

import type { IconProps } from './icons.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes, Responsive } from '../props/prop-def.js';

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
  ),
);
DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger';

/**
 * Internal component that wraps root menu items and handles visibility in drill-down mode.
 * In drill-down mode, this hides when a submenu is active.
 */
function DrillDownRoot({ children }: { children: React.ReactNode }) {
  const drillDown = useDrillDownOptional();

  // In cascade mode or when no drill-down context, always show
  if (!drillDown || drillDown.behavior === 'cascade') {
    return <>{children}</>;
  }

  // In drill-down mode, hide root when a submenu is active
  return (
    <div
      className="rt-DropdownMenuDrillDownRoot"
      data-drill-down-active={drillDown.isRoot ? undefined : true}
      data-animation-direction={drillDown.animationDirection ?? undefined}
    >
      {children}
    </div>
  );
}

type DropdownMenuContentOwnProps = GetPropDefTypes<typeof dropdownMenuContentPropDefs> & {
  /**
   * Controls how submenus behave.
   * - `cascade`: Default cascading behavior where submenus open to the side (portal-based)
   * - `drill-down`: Mobile-friendly behavior where submenus replace the content inline
   * Supports responsive values: `{ initial: 'drill-down', md: 'cascade' }`
   */
  submenuBehavior?: Responsive<SubmenuBehavior>;
};
type DropdownMenuContentContextValue = Omit<DropdownMenuContentOwnProps, 'submenuBehavior'>;
const DropdownMenuContentContext = React.createContext<DropdownMenuContentContextValue>({});
type DropdownMenuContentElement = React.ElementRef<typeof DropdownMenuPrimitive.Content>;
interface DropdownMenuContentProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.Content, RemovedProps>,
    DropdownMenuContentContextValue {
  container?: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>['container'];
  /**
   * Controls how submenus behave.
   * - `cascade`: Default cascading behavior where submenus open to the side (portal-based)
   * - `drill-down`: Mobile-friendly behavior where submenus replace the content inline
   * Supports responsive values: `{ initial: 'drill-down', md: 'cascade' }`
   */
  submenuBehavior?: Responsive<SubmenuBehavior>;
}
const DropdownMenuContent = React.forwardRef<DropdownMenuContentElement, DropdownMenuContentProps>(
  (props, forwardedRef) => {
    const themeContext = useThemeContext();

    // Show deprecation warning for panelBackground when used
    React.useEffect(() => {
      if (props.panelBackground !== undefined) {
        console.warn(
          'Warning: The `panelBackground` prop is deprecated and will be removed in a future version. Use `material` prop instead.',
        );
      }
    }, [props.panelBackground]);

    // Material takes precedence over panelBackground
    const effectiveMaterial =
      props.material ?? props.panelBackground ?? themeContext.panelBackground;

    // Memoize theme context values to prevent unnecessary re-renders
    const memoizedThemeContext = React.useMemo(
      () => ({
        material: effectiveMaterial,
        accentColor: themeContext.accentColor,
      }),
      [effectiveMaterial, themeContext.accentColor],
    );

    const {
      size = dropdownMenuContentPropDefs.size.default,
      variant = dropdownMenuContentPropDefs.variant.default,
      highContrast = dropdownMenuContentPropDefs.highContrast.default,
      material = memoizedThemeContext.material,
      submenuBehavior,
    } = props;
    const {
      className,
      children,
      color,
      container,
      forceMount,
      material: _,
      panelBackground: __,
      submenuBehavior: ___,
      ...contentProps
    } = extractProps(props, dropdownMenuContentPropDefs);

    // Memoize color resolution to prevent unnecessary re-renders
    const resolvedColor = React.useMemo(
      () => color || memoizedThemeContext.accentColor,
      [color, memoizedThemeContext.accentColor],
    );
    return (
      <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <DropdownMenuPrimitive.Content
            data-accent-color={resolvedColor}
            data-material={material}
            data-panel-background={material}
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
              className,
            )}
          >
            <ScrollArea type="auto">
              <div className={classNames('rt-BaseMenuViewport', 'rt-DropdownMenuViewport')}>
                <DropdownMenuContentContext.Provider
                  value={React.useMemo(
                    () => ({ size, variant, color: resolvedColor, highContrast, material }),
                    [size, variant, resolvedColor, highContrast, material],
                  )}
                >
                  <DrillDownProvider submenuBehavior={submenuBehavior}>
                    <DrillDownRoot>{children}</DrillDownRoot>
                  </DrillDownProvider>
                </DropdownMenuContentContext.Provider>
              </div>
            </ScrollArea>
          </DropdownMenuPrimitive.Content>
        </Theme>
      </DropdownMenuPrimitive.Portal>
    );
  },
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
  ),
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
        {shortcut && (
          <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">
            <Kbd size="1">{shortcut}</Kbd>
          </div>
        )}
      </DropdownMenuPrimitive.Item>
    );
  },
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
  ),
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
        className,
      )}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator">
        <ThickDotIcon className="rt-BaseMenuItemIndicatorIcon rt-DropdownMenuItemIndicatorIcon" />
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
        className,
      )}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator">
        <ThickCheckIcon className="rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" />
      </DropdownMenuPrimitive.ItemIndicator>
      {shortcut && (
        <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">
          <Kbd size="1">{shortcut}</Kbd>
        </div>
      )}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = 'DropdownMenu.CheckboxItem';

// Generate unique submenu IDs using React 18's useId for SSR safety
function useSubId() {
  return React.useId();
}

interface DropdownMenuSubProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub> {
  /**
   * Label displayed in the back button when using drill-down mode.
   * If not provided, defaults to "Back".
   */
  label?: React.ReactNode;
}
const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({ label = 'Back', ...props }) => {
  const drillDown = useDrillDownOptional();
  const subId = useSubId();

  // Create context value for SubContent and SubTrigger
  const subContextValue = React.useMemo(
    () => ({ id: subId, label }),
    [subId, label]
  );

  // In drill-down mode, we don't use Radix's Sub component
  // We just provide the SubContext and render children
  if (drillDown?.behavior === 'drill-down') {
    return (
      <SubContext.Provider value={subContextValue}>
        {props.children}
      </SubContext.Provider>
    );
  }

  // In cascade mode, use Radix's Sub component normally
  return (
    <SubContext.Provider value={subContextValue}>
      <DropdownMenuPrimitive.Sub {...props} />
    </SubContext.Provider>
  );
};
DropdownMenuSub.displayName = 'DropdownMenu.Sub';

type DropdownMenuSubTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>;
interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.SubTrigger, RemovedProps> {}
const DropdownMenuSubTrigger = React.forwardRef<
  DropdownMenuSubTriggerElement,
  DropdownMenuSubTriggerProps
>((props, forwardedRef) => {
  const { className, children, onClick, ...subTriggerProps } = props;
  const drillDown = useDrillDownOptional();
  const subContext = useSubContext();

  // In drill-down mode, render a button that navigates to the submenu
  if (drillDown?.behavior === 'drill-down' && subContext) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      drillDown.push(subContext.id);
      (onClick as React.MouseEventHandler<HTMLDivElement> | undefined)?.(e);
    };

    return (
      <div
        role="menuitem"
        tabIndex={0}
        ref={forwardedRef as React.Ref<HTMLDivElement>}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            drillDown.push(subContext.id);
          }
        }}
        className={classNames(
          'rt-reset',
          'rt-BaseMenuItem',
          'rt-BaseMenuSubTrigger',
          'rt-DropdownMenuItem',
          'rt-DropdownMenuSubTrigger',
          'rt-DropdownMenuDrillDownSubTrigger',
          className,
        )}
      >
        {children}
        <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">
          <ThickChevronRightIcon className="rt-BaseMenuSubTriggerIcon rt-DropdownMenuSubtriggerIcon" />
        </div>
      </div>
    );
  }

  // In cascade mode, use Radix's SubTrigger
  return (
    <DropdownMenuPrimitive.SubTrigger
      {...subTriggerProps}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement> | undefined}
      asChild={false}
      ref={forwardedRef}
      className={classNames(
        'rt-BaseMenuItem',
        'rt-BaseMenuSubTrigger',
        'rt-DropdownMenuItem',
        'rt-DropdownMenuSubTrigger',
        className,
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

// Separator is defined here (before SubContent) because it's used in drill-down mode
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

/**
 * Internal component for the drill-down back button.
 */
function DrillDownBackItem({ label }: { label: React.ReactNode }) {
  const drillDown = useDrillDown();

  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        drillDown.pop();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          drillDown.pop();
        }
      }}
      className={classNames(
        'rt-reset',
        'rt-BaseMenuItem',
        'rt-DropdownMenuItem',
        'rt-DropdownMenuDrillDownBackItem',
      )}
    >
      <ThickChevronLeftIcon className="rt-DropdownMenuDrillDownBackIcon" />
      <span className="rt-DropdownMenuDrillDownBackLabel">{label}</span>
    </div>
  );
}

type DropdownMenuSubContentElement = React.ElementRef<typeof DropdownMenuPrimitive.SubContent>;
interface DropdownMenuSubContentProps
  extends ComponentPropsWithout<typeof DropdownMenuPrimitive.SubContent, RemovedProps>,
    DropdownMenuContentContextValue {
  container?: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>['container'];
}
const DropdownMenuSubContent = React.forwardRef<
  DropdownMenuSubContentElement,
  DropdownMenuSubContentProps
>((props, forwardedRef) => {
  // Memoize context consumption to prevent unnecessary re-renders
  const contextValue = React.useContext(DropdownMenuContentContext);
  const { size, variant, color, highContrast, material } = React.useMemo(
    () => contextValue,
    [contextValue],
  );
  const drillDown = useDrillDownOptional();
  const subContext = useSubContext();

  const {
    className,
    children,
    container,
    forceMount,
    material: _,
    panelBackground: __,
    ...subContentProps
  } = extractProps(
    { size, variant, color, highContrast, material, ...props },
    dropdownMenuSubContentPropDefs,
  );

  // In drill-down mode, render inline instead of in a portal
  if (drillDown?.behavior === 'drill-down' && subContext) {
    const isActive = drillDown.isActive(subContext.id);

    return (
      <div
        ref={forwardedRef as React.Ref<HTMLDivElement>}
        role="menu"
        aria-label={typeof subContext.label === 'string' ? subContext.label : undefined}
        data-drill-down-active={isActive ? true : undefined}
        data-animation-direction={drillDown.animationDirection ?? undefined}
        className={classNames(
          'rt-DropdownMenuDrillDownPanel',
          className,
        )}
      >
        <DrillDownBackItem label={subContext.label} />
        <DropdownMenuSeparator />
        {children}
      </div>
    );
  }

  // In cascade mode, use Portal and Radix's SubContent
  return (
    <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
      <Theme asChild>
        <DropdownMenuPrimitive.SubContent
          data-accent-color={color}
          data-material={material}
          data-panel-background={material}
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
            className,
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

type DropdownMenuTriggerIconElement = React.ElementRef<'svg'>;
interface DropdownMenuTriggerIconProps extends IconProps {}
const DropdownMenuTriggerIcon = React.forwardRef<
  DropdownMenuTriggerIconElement,
  DropdownMenuTriggerIconProps
>((props, forwardedRef) => (
  <ChevronDownIcon {...props} ref={forwardedRef} className="rt-DropdownMenuTriggerIcon" />
));
DropdownMenuTriggerIcon.displayName = 'DropdownMenu.TriggerIcon';

export {
  DropdownMenuRoot as Root,
  DropdownMenuTrigger as Trigger,
  DropdownMenuTriggerIcon as TriggerIcon,
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
  DropdownMenuTriggerIconProps as TriggerIconProps,
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
  SubmenuBehavior,
};
