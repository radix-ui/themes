'use client';

import * as React from 'react';
import classNames from 'classnames';

import { sidebarPropDefs } from './sidebar.props.js';

import { IconButton } from './icon-button.js';
import { ScrollArea } from './scroll-area.js';
import { Separator } from './separator.js';
import { Theme, useThemeContext } from './theme.js';
import { ChevronDownIcon } from './icons.js';
import { extractProps } from '../helpers/extract-props.js';


// Import base menu styling and components
import { baseMenuItemPropDefs } from './_internal/base-menu.props.js';
import { Slot } from 'radix-ui';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

// Context for sidebar state
type SidebarContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  collapsible: 'icon' | 'offcanvas' | 'none';
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar.Provider');
  }
  return context;
}

// Provider component
interface SidebarProviderProps extends React.ComponentPropsWithoutRef<'div'> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, children, ...props }, forwardedRef) => {
    // Internal state for uncontrolled mode
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    
    // Use controlled state if provided, otherwise internal state
    const open = openProp ?? internalOpen;
    
    const setOpen = React.useCallback((value: boolean) => {
      if (setOpenProp) {
        setOpenProp(value); // Controlled mode
      } else {
        setInternalOpen(value); // Uncontrolled mode
      }
    }, [setOpenProp]);

    return (
      <div {...props} ref={forwardedRef}>
        <SidebarContext.Provider value={{ open, setOpen, collapsible: 'icon' }}>
          {children}
        </SidebarContext.Provider>
      </div>
    );
  }
);
SidebarProvider.displayName = 'Sidebar.Provider';

// Root sidebar container
type SidebarRootOwnProps = GetPropDefTypes<typeof sidebarPropDefs>;
type SidebarRootElement = HTMLDivElement;
interface SidebarRootProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    SidebarRootOwnProps {}

const SidebarRoot = React.forwardRef<SidebarRootElement, SidebarRootProps>(
  (props, forwardedRef) => {
    const themeContext = useThemeContext();
    const { open } = useSidebar();
    
    const {
      size = sidebarPropDefs.size.default,
      variant = sidebarPropDefs.variant.default,
      side = sidebarPropDefs.side.default,
      collapsible = sidebarPropDefs.collapsible.default,
      floating: _floating = sidebarPropDefs.floating.default,
      color,
      highContrast = sidebarPropDefs.highContrast.default,
    } = props;

    const { className, children, ...rootProps } = extractProps(props, sidebarPropDefs);
    const resolvedColor = color || themeContext.accentColor;

    return (
      <div
        {...rootProps}
        ref={forwardedRef}
        data-accent-color={resolvedColor}
        data-state={open ? 'expanded' : 'collapsed'}
        data-side={side}
        data-collapsible={collapsible}
        className={classNames(
          'rt-SidebarRoot',
          className
        )}
      >
        <Theme asChild>
          <div 
            className={classNames('rt-SidebarContainer', `rt-variant-${variant}`, `rt-r-size-${size}`)}
            data-accent-color={resolvedColor}
            data-high-contrast={highContrast || undefined}
          >
            {children}
          </div>
        </Theme>
      </div>
    );
  }
);
SidebarRoot.displayName = 'Sidebar.Root';

// Sidebar content area
type SidebarContentElement = HTMLDivElement;
interface SidebarContentProps extends ComponentPropsWithout<'div', RemovedProps> {}

const SidebarContent = React.forwardRef<SidebarContentElement, SidebarContentProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <ScrollArea type="auto">
      <div
        {...props}
        ref={forwardedRef}
        className={classNames('rt-SidebarContent', 'rt-BaseMenuContent', className)}
      >
        {children}
      </div>
    </ScrollArea>
  )
);
SidebarContent.displayName = 'Sidebar.Content';

// Sidebar header
type SidebarHeaderElement = HTMLDivElement;
interface SidebarHeaderProps extends ComponentPropsWithout<'div', RemovedProps> {}

const SidebarHeader = React.forwardRef<SidebarHeaderElement, SidebarHeaderProps>(
  ({ className, ...props }, forwardedRef) => (
    <div
      {...props}
      ref={forwardedRef}
      className={classNames('rt-SidebarHeader', 'rt-BaseMenuContent', className)}
    />
  )
);
SidebarHeader.displayName = 'Sidebar.Header';

// Sidebar footer
type SidebarFooterElement = HTMLDivElement;
interface SidebarFooterProps extends ComponentPropsWithout<'div', RemovedProps> {}

const SidebarFooter = React.forwardRef<SidebarFooterElement, SidebarFooterProps>(
  ({ className, ...props }, forwardedRef) => (
    <div
      {...props}
      ref={forwardedRef}
      className={classNames('rt-SidebarFooter', 'rt-BaseMenuContent', className)}
    />
  )
);
SidebarFooter.displayName = 'Sidebar.Footer';

// Sidebar trigger button
type SidebarTriggerElement = React.ElementRef<typeof IconButton>;
interface SidebarTriggerProps extends ComponentPropsWithout<typeof IconButton, RemovedProps> {}

const SidebarTrigger = React.forwardRef<SidebarTriggerElement, SidebarTriggerProps>(
  ({ onClick, ...props }, forwardedRef) => {
    const { setOpen, open } = useSidebar();
    
    return (
      <IconButton
        {...props}
        ref={forwardedRef}
        variant="ghost"
        onClick={(event) => {
          onClick?.(event);
          setOpen(!open);
        }}
      >
        <ChevronDownIcon />
      </IconButton>
    );
  }
);
SidebarTrigger.displayName = 'Sidebar.Trigger';

// Main content area (pushes to make room for sidebar)
type SidebarInsetElement = HTMLDivElement;
interface SidebarInsetProps extends ComponentPropsWithout<'main', RemovedProps> {}

const SidebarInset = React.forwardRef<SidebarInsetElement, SidebarInsetProps>(
  ({ className, ...props }, forwardedRef) => (
    <main
      {...props}
      ref={forwardedRef}
      className={classNames('rt-SidebarInset', className)}
    />
  )
);
SidebarInset.displayName = 'Sidebar.Inset';

// Create sidebar-specific menu components that don't require DropdownMenu context
interface SidebarLabelProps extends React.ComponentPropsWithoutRef<'div'> {}

const SidebarLabel = React.forwardRef<HTMLDivElement, SidebarLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames('rt-BaseMenuLabel', className)}
      {...props}
    />
  )
);
SidebarLabel.displayName = 'Sidebar.Label';

type SidebarItemOwnProps = GetPropDefTypes<typeof baseMenuItemPropDefs>;
interface SidebarItemProps 
  extends ComponentPropsWithout<'div', RemovedProps>,
    SidebarItemOwnProps {}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  (props, ref) => {
    const {
      className,
      children,
      color = baseMenuItemPropDefs.color.default,
      shortcut,
      asChild = false,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...itemProps
    } = props;
    
    const [highlighted, setHighlighted] = React.useState(false);
    
    const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setHighlighted(true);
      onMouseEnter?.(e);
    }, [onMouseEnter]);
    
    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setHighlighted(false);
      onMouseLeave?.(e);
    }, [onMouseLeave]);
    
    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
      setHighlighted(true);
      onFocus?.(e);
    }, [onFocus]);
    
    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
      setHighlighted(false);
      onBlur?.(e);
    }, [onBlur]);
    
    if (asChild) {
      return (
        <Slot.Root
          ref={ref}
          data-accent-color={color}
          data-highlighted={highlighted || undefined}
          className={classNames('rt-reset', 'rt-BaseMenuItem', className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...itemProps}
        >
          {children}
        </Slot.Root>
      );
    }
    
    return (
      <div
        ref={ref}
        data-accent-color={color}
        data-highlighted={highlighted || undefined}
        className={classNames('rt-reset', 'rt-BaseMenuItem', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        {...itemProps}
      >
        <Slot.Slottable>{children}</Slot.Slottable>
        {shortcut && <div className="rt-BaseMenuShortcut">{shortcut}</div>}
      </div>
    );
  }
);
SidebarItem.displayName = 'Sidebar.Item';

interface SidebarGroupProps extends React.ComponentPropsWithoutRef<'div'> {}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames('rt-BaseMenuGroup', className)}
      {...props}
    />
  )
);
SidebarGroup.displayName = 'Sidebar.Group';

interface SidebarSeparatorProps extends React.ComponentPropsWithoutRef<'div'> {}

const SidebarSeparator = React.forwardRef<HTMLDivElement, SidebarSeparatorProps>(
  ({ className, ..._props }, ref) => (
    <Separator
      ref={ref}
      className={classNames('rt-BaseMenuSeparator', className)}
    />
  )
);
SidebarSeparator.displayName = 'Sidebar.Separator';

// Sidebar checkbox item with proper prop filtering
interface SidebarCheckboxItemProps extends React.ComponentPropsWithoutRef<'div'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  color?: string;
  shortcut?: string;
}

const SidebarCheckboxItem = React.forwardRef<HTMLDivElement, SidebarCheckboxItemProps>(
  ({ 
    className, 
    checked, 
    onCheckedChange, 
    children, 
    color, 
    shortcut, 
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onClick,
    ...props 
  }, ref) => {
    const [highlighted, setHighlighted] = React.useState(false);
    
    const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setHighlighted(true);
      onMouseEnter?.(e);
    }, [onMouseEnter]);
    
    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setHighlighted(false);
      onMouseLeave?.(e);
    }, [onMouseLeave]);
    
    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
      setHighlighted(true);
      onFocus?.(e);
    }, [onFocus]);
    
    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
      setHighlighted(false);
      onBlur?.(e);
    }, [onBlur]);
    
    const handleClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      onCheckedChange?.(!checked);
      onClick?.(e);
    }, [checked, onCheckedChange, onClick]);
    
    return (
      <div
        ref={ref}
        data-accent-color={color}
        data-highlighted={highlighted || undefined}
        className={classNames(
          'rt-reset',
          'rt-BaseMenuItem',
          'rt-BaseMenuCheckboxItem',
          className
        )}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as any);
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="menuitemcheckbox"
        aria-checked={checked}
        {...props}
      >
        <Slot.Slottable>{children}</Slot.Slottable>
        {checked && <div className="rt-BaseMenuItemIndicator">✓</div>}
        {shortcut && <div className="rt-BaseMenuShortcut">{shortcut}</div>}
      </div>
    );
  }
);
SidebarCheckboxItem.displayName = 'Sidebar.CheckboxItem';

// Sidebar radio group with proper prop filtering  
interface SidebarRadioGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const SidebarRadioGroup = React.forwardRef<HTMLDivElement, SidebarRadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames('rt-BaseMenuGroup', className)}
      {...props}
    >
      {children}
    </div>
  )
);
SidebarRadioGroup.displayName = 'Sidebar.RadioGroup';

// Sidebar radio item with proper prop filtering
interface SidebarRadioItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value?: string;
  color?: string;
  shortcut?: string;
}

const SidebarRadioItem = React.forwardRef<HTMLDivElement, SidebarRadioItemProps>(
  ({ 
    className, 
    value, 
    children, 
    color, 
    shortcut, 
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [highlighted, setHighlighted] = React.useState(false);
    
    const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setHighlighted(true);
      onMouseEnter?.(e);
    }, [onMouseEnter]);
    
    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setHighlighted(false);
      onMouseLeave?.(e);
    }, [onMouseLeave]);
    
    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
      setHighlighted(true);
      onFocus?.(e);
    }, [onFocus]);
    
    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
      setHighlighted(false);
      onBlur?.(e);
    }, [onBlur]);
    
    return (
      <div
        ref={ref}
        data-accent-color={color}
        data-highlighted={highlighted || undefined}
        className={classNames('rt-reset', 'rt-BaseMenuItem', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="menuitemradio"
        aria-checked={false}
        {...props}
      >
        <Slot.Slottable>{children}</Slot.Slottable>
        {shortcut && <div className="rt-BaseMenuShortcut">{shortcut}</div>}
      </div>
    );
  }
);
SidebarRadioItem.displayName = 'Sidebar.RadioItem';

// Export all components
export {
  SidebarProvider as Provider,
  SidebarRoot as Root,
  SidebarContent as Content,
  SidebarHeader as Header,
  SidebarFooter as Footer,
  SidebarTrigger as Trigger,
  SidebarInset as Inset,
  // Re-export DropdownMenu components as sidebar menu components
  SidebarLabel as Label,
  SidebarItem as Item,
  SidebarGroup as Group,
  SidebarSeparator as Separator,
  SidebarCheckboxItem as CheckboxItem,
  SidebarRadioGroup as RadioGroup,
  SidebarRadioItem as RadioItem,
  // Export hook
  useSidebar,
};

export type {
  SidebarProviderProps as ProviderProps,
  SidebarRootProps as RootProps,
  SidebarContentProps as ContentProps,
  SidebarHeaderProps as HeaderProps,
  SidebarFooterProps as FooterProps,
  SidebarTriggerProps as TriggerProps,
  SidebarInsetProps as InsetProps,
}; 