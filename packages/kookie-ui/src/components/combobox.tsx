'use client';

/**
 * Combobox is a compound component built on top of Popover and cmdk's Command list.
 * It mirrors the Select API while adding search-first behaviors including filtering,
 * async-friendly state management, and design token support for trigger, content,
 * and input variants.
 */

import * as React from 'react';
import classNames from 'classnames';
import { useControllableState } from 'radix-ui/internal';
import { Command as CommandPrimitive } from 'cmdk';

import { extractProps } from '../helpers/extract-props.js';
import { comboboxRootPropDefs, comboboxTriggerPropDefs, comboboxContentPropDefs } from './combobox.props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { ChevronDownIcon, ThickCheckIcon } from './icons.js';
import { Theme, useThemeContext } from './theme.js';
import { requireReactElement } from '../helpers/require-react-element.js';
import * as Popover from './popover.js';
import { ScrollArea } from './scroll-area.js';
import { Slottable } from './slot.js';
import { textFieldRootPropDefs } from './text-field.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

/**
 * Pre-compiled regex for className sanitization.
 * Matches size classes like "rt-r-size-1", "rt-r-size-2", etc.
 * Pre-compiling avoids regex compilation on every render.
 */
const SIZE_CLASS_REGEX = /^rt-r-size-\d$/;

type TextFieldVariant = (typeof textFieldRootPropDefs.variant.values)[number];
type ComboboxValue = string | null;
/**
 * Custom filter function for Combobox search.
 * @param value - The item's value being tested
 * @param search - The current search string
 * @param keywords - Optional keywords associated with the item
 * @returns A number between 0 and 1 where 0 means no match and 1 means exact match.
 *          Fractional values indicate relevance for sorting.
 */
type CommandFilter = (value: string, search: string, keywords?: string[]) => number;

/**
 * Additional props supported by Combobox.Root beyond the Radix Popover surface.
 */
type ComboboxRootOwnProps = GetPropDefTypes<typeof comboboxRootPropDefs> & {
  value?: ComboboxValue;
  defaultValue?: ComboboxValue;
  onValueChange?: (value: ComboboxValue) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchValueChange?: (value: string) => void;
  filter?: CommandFilter;
  shouldFilter?: boolean;
  loop?: boolean;
  disabled?: boolean;
  /**
   * Whether to reset the search value when an option is selected.
   * @default true
   */
  resetSearchOnSelect?: boolean;
  /**
   * Accent color for the combobox trigger and content.
   */
  color?: (typeof comboboxTriggerPropDefs.color.values)[number];
  /**
   * Display value shown in the trigger. This is the recommended approach for
   * best performance as it avoids needing to mount items to register labels.
   * 
   * Can be either:
   * - A string: Static display value
   * - A function: `(value: string | null) => string | undefined` - Called with current value
   * 
   * Use this when:
   * - You have the selected item's label available (e.g., from your data source)
   * - Items haven't mounted yet (e.g., on initial render with a defaultValue)
   * - You want optimal performance with forceMount={false} (default)
   * 
   * @example
   * // Static string
   * <Combobox.Root value="usa" displayValue="United States">
   * 
   * // Function (recommended for dynamic data)
   * <Combobox.Root 
   *   value={selectedCountry}
   *   displayValue={(value) => countries.find(c => c.code === value)?.name}
   * >
   * 
   * If not provided, falls back to the label registered by the selected item
   * (requires forceMount={true}), then to the raw value.
   */
  displayValue?: string | ((value: ComboboxValue) => string | undefined);
};

/**
 * Split contexts to minimize re-renders. Each context changes independently:
 * - ConfigContext: Static config that rarely changes (size, color, placeholders, etc.)
 * - OpenContext: Open state - separated to prevent item re-renders on open/close
 * - SelectionContext: Changes when user selects an item (items subscribe to this)
 * - SearchContext: Changes on every keystroke in the search input
 * - NavigationContext: Changes during keyboard navigation (items do NOT subscribe)
 */

/** Static configuration - rarely changes after mount */
interface ComboboxConfigContextValue {
  size?: ComboboxRootOwnProps['size'];
  highContrast?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  filter?: CommandFilter;
  shouldFilter?: boolean;
  loop?: boolean;
  disabled?: boolean;
  resetSearchOnSelect?: boolean;
  color?: ComboboxRootOwnProps['color'];
  listboxId: string;
}

/** Open state - separated from selection to prevent item re-renders */
interface ComboboxOpenContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

/** Selection state - changes when user picks an option */
interface ComboboxSelectionContextValue {
  value: ComboboxValue;
  /** Label registered by the selected item */
  selectedLabel?: string;
  /** Resolved display value (already computed from string or function) */
  resolvedDisplayValue?: string;
  registerItemLabel: (value: string, label: string) => void;
  unregisterItemLabel: (value: string) => void;
  handleSelect: (value: string) => void;
}

/** Search state - changes on every keystroke */
interface ComboboxSearchContextValue {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

/** Navigation state - changes during keyboard navigation */
interface ComboboxNavigationContextValue {
  activeDescendantId: string | undefined;
  setActiveDescendantId: (id: string | undefined) => void;
}

const ComboboxConfigContext = React.createContext<ComboboxConfigContextValue | null>(null);
const ComboboxOpenContext = React.createContext<ComboboxOpenContextValue | null>(null);
const ComboboxSelectionContext = React.createContext<ComboboxSelectionContextValue | null>(null);
const ComboboxSearchContext = React.createContext<ComboboxSearchContextValue | null>(null);
const ComboboxNavigationContext = React.createContext<ComboboxNavigationContextValue | null>(null);

/**
 * Utility hooks that ensure consumers are wrapped in Combobox.Root.
 * Components should use only the contexts they need to minimize re-renders.
 */
const useComboboxConfigContext = (caller: string) => {
  const ctx = React.useContext(ComboboxConfigContext);
  if (!ctx) {
    throw new Error(`${caller} must be used within Combobox.Root`);
  }
  return ctx;
};

const useComboboxOpenContext = (caller: string) => {
  const ctx = React.useContext(ComboboxOpenContext);
  if (!ctx) {
    throw new Error(`${caller} must be used within Combobox.Root`);
  }
  return ctx;
};

const useComboboxSelectionContext = (caller: string) => {
  const ctx = React.useContext(ComboboxSelectionContext);
  if (!ctx) {
    throw new Error(`${caller} must be used within Combobox.Root`);
  }
  return ctx;
};

const useComboboxSearchContext = (caller: string) => {
  const ctx = React.useContext(ComboboxSearchContext);
  if (!ctx) {
    throw new Error(`${caller} must be used within Combobox.Root`);
  }
  return ctx;
};

const useComboboxNavigationContext = (caller: string) => {
  const ctx = React.useContext(ComboboxNavigationContext);
  if (!ctx) {
    throw new Error(`${caller} must be used within Combobox.Root`);
  }
  return ctx;
};

/**
 * Combined context hook for components that need multiple contexts.
 * Use sparingly - prefer individual context hooks when possible.
 */
const useComboboxContext = (caller: string) => {
  const config = useComboboxConfigContext(caller);
  const open = useComboboxOpenContext(caller);
  const selection = useComboboxSelectionContext(caller);
  const search = useComboboxSearchContext(caller);
  const navigation = useComboboxNavigationContext(caller);
  return { ...config, ...open, ...selection, ...search, ...navigation };
};

/**
 * Context for values that are only available inside Content (e.g., variant, color)
 * so that Input/Item can style themselves consistently.
 */
const ComboboxContentContext = React.createContext<{ variant: 'solid' | 'soft'; size?: string; color?: string; material?: string; highContrast?: boolean } | null>(null);
const useComboboxContentContext = () => {
  const ctx = React.useContext(ComboboxContentContext);
  return ctx; // Optional - Input might not always be in Content
};

type PopoverRootProps = React.ComponentPropsWithoutRef<typeof Popover.Root>;
interface ComboboxRootProps extends PopoverRootProps, ComboboxRootOwnProps {}
/**
 * Root component that wires up Popover behavior, controllable state,
 * and shared context for trigger/content/input sub-components.
 */
const ComboboxRoot: React.FC<ComboboxRootProps> = (props) => {
  const {
    children,
    size = comboboxRootPropDefs.size.default,
    highContrast = comboboxRootPropDefs.highContrast.default,
    value: valueProp,
    defaultValue = null,
    onValueChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    placeholder = 'Select an option',
    searchPlaceholder = 'Search options...',
    searchValue: searchValueProp,
    defaultSearchValue = '',
    onSearchValueChange,
    filter,
    shouldFilter = true,
    loop = true,
    disabled,
    resetSearchOnSelect = true,
    color,
    displayValue: displayValueProp,
    ...rootProps
  } = props;

  // Generate stable IDs for accessibility
  const generatedId = React.useId();
  const listboxId = `combobox-listbox-${generatedId}`;
  const [activeDescendantId, setActiveDescendantId] = React.useState<string | undefined>(undefined);

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const [value, setValue] = useControllableState<ComboboxValue>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [searchValue, setSearchValue] = useControllableState<string>({
    prop: searchValueProp,
    defaultProp: defaultSearchValue,
    onChange: onSearchValueChange,
  });

  const labelMapRef = React.useRef(new Map<string, string>());
  // Track the selected label in state so it triggers re-renders when items register
  const [selectedLabel, setSelectedLabel] = React.useState<string | undefined>(undefined);

  const registerItemLabel = React.useCallback((itemValue: string, label: string) => {
    labelMapRef.current.set(itemValue, label);
    // If this item matches the current value, update the selected label
    if (itemValue === value) {
      setSelectedLabel(label);
    }
  }, [value]);

  const unregisterItemLabel = React.useCallback((itemValue: string) => {
    labelMapRef.current.delete(itemValue);
  }, []);

  // Update selected label when value changes
  React.useEffect(() => {
    if (value != null) {
      const label = labelMapRef.current.get(value);
      setSelectedLabel(label);
    } else {
      setSelectedLabel(undefined);
    }
  }, [value]);

  const handleSelect = React.useCallback(
    (nextValue: string) => {
      // Batch state updates to minimize re-renders
      // React 18+ automatically batches these, but we use flushSync-free pattern
      // to ensure predictable update order
      setValue(nextValue);
      setOpen(false);
      if (resetSearchOnSelect) {
        setSearchValue('');
      }
    },
    [setOpen, setSearchValue, setValue, resetSearchOnSelect],
  );

  // Development mode warning for value not matching any registered item
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && value != null && !labelMapRef.current.has(value)) {
      // Defer the check to allow items to register first
      const timeoutId = setTimeout(() => {
        if (value != null && !labelMapRef.current.has(value)) {
          console.warn(
            `[Combobox] The value "${value}" does not match any Combobox.Item. ` +
              `Make sure each Item has a matching value prop.`,
          );
        }
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [value]);

  // Resolve displayValue: compute if function, use directly if string
  const resolvedDisplayValue = React.useMemo(() => {
    if (displayValueProp == null) return undefined;
    if (typeof displayValueProp === 'function') {
      return displayValueProp(value);
    }
    return displayValueProp;
  }, [displayValueProp, value]);

  // Split context values for optimal re-render performance
  // Each context only triggers re-renders for components that use it

  const configContextValue = React.useMemo<ComboboxConfigContextValue>(
    () => ({
      size,
      highContrast,
      placeholder,
      searchPlaceholder,
      filter,
      shouldFilter,
      loop,
      disabled,
      resetSearchOnSelect,
      color,
      listboxId,
    }),
    [size, highContrast, placeholder, searchPlaceholder, filter, shouldFilter, loop, disabled, resetSearchOnSelect, color, listboxId],
  );

  // Separate open context - only Trigger/Content need this, not Items
  const openContextValue = React.useMemo<ComboboxOpenContextValue>(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen],
  );

  // Selection context - Items subscribe to this for value checks
  // Note: handleSelect is stable (useCallback) so this only changes when value/label changes
  const selectionContextValue = React.useMemo<ComboboxSelectionContextValue>(
    () => ({
      value,
      selectedLabel,
      resolvedDisplayValue,
      registerItemLabel,
      unregisterItemLabel,
      handleSelect,
    }),
    [value, selectedLabel, resolvedDisplayValue, registerItemLabel, unregisterItemLabel, handleSelect],
  );

  const searchContextValue = React.useMemo<ComboboxSearchContextValue>(
    () => ({
      searchValue,
      setSearchValue,
    }),
    [searchValue, setSearchValue],
  );

  const navigationContextValue = React.useMemo<ComboboxNavigationContextValue>(
    () => ({
      activeDescendantId,
      setActiveDescendantId,
    }),
    [activeDescendantId, setActiveDescendantId],
  );

  return (
    <ComboboxConfigContext.Provider value={configContextValue}>
      <ComboboxOpenContext.Provider value={openContextValue}>
        <ComboboxSelectionContext.Provider value={selectionContextValue}>
          <ComboboxSearchContext.Provider value={searchContextValue}>
            <ComboboxNavigationContext.Provider value={navigationContextValue}>
              <Popover.Root open={open} onOpenChange={setOpen} {...rootProps}>
                {children}
              </Popover.Root>
            </ComboboxNavigationContext.Provider>
          </ComboboxSearchContext.Provider>
        </ComboboxSelectionContext.Provider>
      </ComboboxOpenContext.Provider>
    </ComboboxConfigContext.Provider>
  );
};
ComboboxRoot.displayName = 'Combobox.Root';

type ComboboxTriggerElement = HTMLButtonElement;
type ComboboxTriggerOwnProps = GetPropDefTypes<typeof comboboxTriggerPropDefs>;
type NativeTriggerProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>;
interface ComboboxTriggerProps extends NativeTriggerProps, MarginProps, ComboboxTriggerOwnProps {}
/**
 * Trigger behaves like a styled button that opens the Popover,
 * syncing size/highContrast from Root while exposing select-like states.
 */
const ComboboxTrigger = React.forwardRef<ComboboxTriggerElement, ComboboxTriggerProps>((props, forwardedRef) => {
  // Use specific contexts to minimize re-renders
  const configContext = useComboboxConfigContext('Combobox.Trigger');
  const openContext = useComboboxOpenContext('Combobox.Trigger');
  const navigationContext = useComboboxNavigationContext('Combobox.Trigger');

  const { children, className, placeholder, disabled, readOnly, error, loading, color, radius, ...triggerProps } = extractProps(
    { size: configContext.size, highContrast: configContext.highContrast, ...props },
    { size: comboboxRootPropDefs.size, highContrast: comboboxRootPropDefs.highContrast },
    comboboxTriggerPropDefs,
    marginPropDefs,
  );

  // Extract material and panelBackground separately since they need to be passed as data attributes
  const { material, panelBackground } = props;

  const isDisabled = disabled ?? configContext.disabled;

  // Use color from props or fall back to context color
  const resolvedColor = color ?? configContext.color;

  // Comprehensive ARIA attributes for combobox pattern (WAI-ARIA 1.2)
  const ariaProps = React.useMemo(
    () => ({
      role: 'combobox' as const,
      'aria-expanded': openContext.open,
      'aria-disabled': isDisabled || undefined,
      'aria-haspopup': 'listbox' as const,
      'aria-controls': openContext.open ? configContext.listboxId : undefined,
      'aria-activedescendant': openContext.open ? navigationContext.activeDescendantId : undefined,
      'aria-autocomplete': 'list' as const,
    }),
    [openContext.open, configContext.listboxId, navigationContext.activeDescendantId, isDisabled],
  );

  const defaultContent = (
    <>
      <span className="rt-SelectTriggerInner">
        <ComboboxValue placeholder={placeholder ?? configContext.placeholder} />
      </span>
      {loading ? (
        <div className="rt-SelectIcon rt-SelectLoadingIcon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 34" strokeDashoffset="0" className="rt-SelectLoadingSpinner" />
          </svg>
        </div>
      ) : (
        <ChevronDownIcon className="rt-SelectIcon" />
      )}
    </>
  );

  const { type: buttonType, ...restTriggerProps } = triggerProps;
  const resolvedButtonType = buttonType ?? 'button';

  const triggerChild = (
    <button
      data-accent-color={resolvedColor}
      data-radius={radius}
      data-panel-background={panelBackground}
      data-material={material}
      data-error={error}
      data-loading={loading}
      data-disabled={isDisabled || undefined}
      data-read-only={readOnly || undefined}
      {...restTriggerProps}
      {...ariaProps}
      type={resolvedButtonType}
      disabled={isDisabled}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-SelectTrigger', 'rt-ComboboxTrigger', className)}
    >
      {children ? requireReactElement(children) : defaultContent}
    </button>
  );

  return <Popover.Trigger disabled={isDisabled}>{triggerChild}</Popover.Trigger>;
});
ComboboxTrigger.displayName = 'Combobox.Trigger';

type ComboboxValueElement = HTMLSpanElement;
interface ComboboxValueProps extends React.ComponentPropsWithoutRef<'span'> {
  placeholder?: string;
}
/**
 * Value mirrors Select.Value by showing the selected item's label
 * or falling back to placeholder text supplied by the consumer or context.
 *
 * Priority: resolvedDisplayValue (explicit) > selectedLabel (from items) > raw value > children > placeholder
 */
const ComboboxValue = React.forwardRef<ComboboxValueElement, ComboboxValueProps>(({ placeholder, children, className, ...valueProps }, forwardedRef) => {
  // Only use the contexts we need - config for placeholder, selection for value display
  const configContext = useComboboxConfigContext('Combobox.Value');
  const selectionContext = useComboboxSelectionContext('Combobox.Value');
  // Priority: explicit displayValue (resolved) > registered label > raw value
  const displayValue = selectionContext.resolvedDisplayValue ?? selectionContext.selectedLabel ?? selectionContext.value ?? undefined;
  const fallback = placeholder ?? configContext.placeholder;
  return (
    <span {...valueProps} ref={forwardedRef} className={classNames('rt-ComboboxValue', className)}>
      {displayValue ?? children ?? fallback}
    </span>
  );
});
ComboboxValue.displayName = 'Combobox.Value';

type ComboboxContentElement = React.ElementRef<typeof Popover.Content>;
type ComboboxContentOwnProps = GetPropDefTypes<typeof comboboxContentPropDefs> & {
  container?: React.ComponentPropsWithoutRef<typeof Popover.Content>['container'];
};
interface ComboboxContentProps extends Omit<ComponentPropsWithout<typeof Popover.Content, RemovedProps>, 'size'>, ComboboxContentOwnProps {}
/**
 * Content renders the dropdown surface, syncing tokens from the current Theme
 * and instantiating cmdk's Command list for roving focus + filtering.
 */
const ComboboxContent = React.forwardRef<ComboboxContentElement, ComboboxContentProps>((props, forwardedRef) => {
  // Only use config context - Content doesn't need selection/search/navigation state
  const configContext = useComboboxConfigContext('Combobox.Content');
  const themeContext = useThemeContext();
  const effectiveMaterial = themeContext.panelBackground;

  const sizeProp = props.size ?? configContext.size ?? comboboxContentPropDefs.size.default;
  const variantProp = props.variant ?? comboboxContentPropDefs.variant.default;
  const highContrastProp = props.highContrast ?? configContext.highContrast ?? comboboxContentPropDefs.highContrast.default;

  const { className, children, color, forceMount, container, ...contentProps } = extractProps(
    { ...props, size: sizeProp, variant: variantProp, highContrast: highContrastProp },
    comboboxContentPropDefs,
  );
  const resolvedColor = color || configContext.color || themeContext.accentColor;
  
  // Memoize className sanitization to avoid string operations on every render
  // Uses pre-compiled SIZE_CLASS_REGEX for better performance
  const sanitizedClassName = React.useMemo(() => {
    if (typeof sizeProp !== 'string') return className;
    return className
      ?.split(/\s+/)
      .filter(Boolean)
      .filter((token) => !SIZE_CLASS_REGEX.test(token))
      .join(' ') || undefined;
  }, [className, sizeProp]);

  /**
   * forceMount behavior:
   * - When true: Content stays mounted when closed, allowing items to register labels
   *   for display in the trigger. Use this if you need dynamic label resolution.
   * - When false/undefined (default): Content unmounts when closed for better performance.
   *   Use the `displayValue` prop on Root to show the selected label instead.
   * 
   * For best performance with large lists, keep forceMount=undefined and provide displayValue.
   */
  const shouldForceMount = forceMount === true ? true : undefined;

  return (
    <Popover.Content
      size={sizeProp}
      data-accent-color={resolvedColor}
      data-material={effectiveMaterial}
      data-panel-background={effectiveMaterial}
      align="start"
      sideOffset={4}
      collisionPadding={10}
      {...contentProps}
      forceMount={shouldForceMount}
      container={container}
      ref={forwardedRef}
      className={classNames('rt-PopperContent', 'rt-BaseMenuContent', 'rt-ComboboxContent', sanitizedClassName)}
    >
      <Theme asChild>
        <ComboboxContentContext.Provider value={{ variant: variantProp, size: String(sizeProp), color: resolvedColor, material: effectiveMaterial, highContrast: highContrastProp }}>
          <CommandPrimitive
            loop={configContext.loop}
            shouldFilter={configContext.shouldFilter}
            filter={configContext.filter}
            className="rt-ComboboxCommand"
          >
            {children}
          </CommandPrimitive>
        </ComboboxContentContext.Provider>
      </Theme>
    </Popover.Content>
  );
});
ComboboxContent.displayName = 'Combobox.Content';

type ComboboxInputElement = React.ElementRef<typeof CommandPrimitive.Input>;
interface ComboboxInputProps extends Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>, 'value' | 'onValueChange'> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: TextFieldVariant;
  /** Controlled search value. Falls back to Root's searchValue if not provided. */
  value?: string;
  /** Callback when search value changes. Falls back to Root's onSearchValueChange if not provided. */
  onValueChange?: (value: string) => void;
}
/**
 * Input composes TextField tokens with cmdk's Command.Input to provide
 * automatic focus management and optional adornments.
 */
const ComboboxInput = React.forwardRef<ComboboxInputElement, ComboboxInputProps>(({ className, startAdornment, endAdornment, placeholder, variant: inputVariant, value, onValueChange, ...inputProps }, forwardedRef) => {
  // Use specific contexts - config for size/placeholder, search for search state
  const configContext = useComboboxConfigContext('Combobox.Input');
  const searchContext = useComboboxSearchContext('Combobox.Input');
  const contentContext = useComboboxContentContext();
  const contentVariant = contentContext?.variant ?? 'solid';
  const color = contentContext?.color;
  const material = contentContext?.material;

  /**
   * Map combobox content variant to TextField variant:
   * - Content 'solid' → Input 'surface' (elevated input on solid background)
   * - Content 'soft' → Input 'soft' (subtle input on soft background)
   * This ensures visual harmony between the input and surrounding content.
   */
  const textFieldVariant = inputVariant ?? (contentVariant === 'solid' ? 'surface' : 'soft');

  // Use controlled search value from context, allow override via props
  const searchValue = value ?? searchContext.searchValue;
  const handleSearchChange = onValueChange ?? searchContext.setSearchValue;

  const inputField = (
    <div
      className={classNames('rt-TextFieldRoot', 'rt-ComboboxInputRoot', `rt-r-size-${configContext.size}`, `rt-variant-${textFieldVariant}`)}
      data-accent-color={color}
      data-material={material}
      data-panel-background={material}
    >
      {startAdornment ? <div className="rt-TextFieldSlot">{startAdornment}</div> : null}
      <CommandPrimitive.Input
        {...inputProps}
        ref={forwardedRef}
        value={searchValue}
        onValueChange={handleSearchChange}
        placeholder={placeholder ?? configContext.searchPlaceholder}
        className={classNames('rt-reset', 'rt-TextFieldInput', className)}
      />
      {endAdornment ? (
        <div className="rt-TextFieldSlot" data-side="right">
          {endAdornment}
        </div>
      ) : null}
    </div>
  );

  if (contentContext) {
    return <div className="rt-ComboboxSearch">{inputField}</div>;
  }

  return inputField;
});
ComboboxInput.displayName = 'Combobox.Input';

type ComboboxListElement = React.ElementRef<typeof CommandPrimitive.List>;
interface ComboboxListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}
/**
 * List wraps cmdk's Command.List to inherit base menu styles and provides ScrollArea for the items.
 * Also handles aria-activedescendant tracking via a single MutationObserver for all items.
 */
const ComboboxList = React.forwardRef<ComboboxListElement, ComboboxListProps>(({ className, ...listProps }, forwardedRef) => {
  // Use specific contexts - config for listboxId, navigation for active descendant
  const configContext = useComboboxConfigContext('Combobox.List');
  const navigationContext = useComboboxNavigationContext('Combobox.List');
  const listRef = React.useRef<HTMLDivElement | null>(null);

  // Combined ref handling
  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [forwardedRef],
  );

  // Destructure to get stable reference for effect dependency
  const { setActiveDescendantId } = navigationContext;

  /**
   * Single MutationObserver at List level to track aria-activedescendant.
   * This replaces per-item observers for better performance with large lists.
   * Uses requestAnimationFrame to batch rapid hover updates and prevent jank.
   */
  React.useEffect(() => {
    const listNode = listRef.current;
    if (!listNode) return;

    let rafId: number | null = null;
    let lastItemId: string | undefined;

    const updateActiveDescendant = () => {
      // Cancel any pending update
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      // Batch updates using rAF to prevent multiple state updates per frame
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const selectedItem = listNode.querySelector('[data-selected="true"], [aria-selected="true"]');
        const itemId = selectedItem?.id || undefined;
        
        // Only update if the ID actually changed
        if (itemId !== lastItemId) {
          lastItemId = itemId;
          setActiveDescendantId(itemId);
        }
      });
    };

    // Initial check
    updateActiveDescendant();

    // Watch for attribute changes on any descendant
    const observer = new MutationObserver(updateActiveDescendant);
    observer.observe(listNode, {
      attributes: true,
      attributeFilter: ['data-selected', 'aria-selected'],
      subtree: true,
    });

    return () => {
      observer.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [setActiveDescendantId]);

  return (
    <ScrollArea type="auto" className="rt-ComboboxScrollArea" scrollbars="vertical" size="1">
      <div className={classNames('rt-BaseMenuViewport', 'rt-ComboboxViewport')}>
        <CommandPrimitive.List
          {...listProps}
          ref={combinedRef}
          id={configContext.listboxId}
          role="listbox"
          aria-label="Options"
          className={classNames('rt-ComboboxList', className)}
        />
      </div>
    </ScrollArea>
  );
});
ComboboxList.displayName = 'Combobox.List';

type ComboboxEmptyElement = React.ElementRef<typeof CommandPrimitive.Empty>;
interface ComboboxEmptyProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}
/**
 * Empty renders when no options match the search query.
 */
const ComboboxEmpty = React.forwardRef<ComboboxEmptyElement, ComboboxEmptyProps>(({ className, ...emptyProps }, forwardedRef) => (
  <CommandPrimitive.Empty {...emptyProps} ref={forwardedRef} className={classNames('rt-ComboboxEmpty', className)} />
));
ComboboxEmpty.displayName = 'Combobox.Empty';

type ComboboxGroupElement = React.ElementRef<typeof CommandPrimitive.Group>;
interface ComboboxGroupProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}
/**
 * Group and Label mirror menu semantics for subheadings inside the list.
 */
const ComboboxGroup = React.forwardRef<ComboboxGroupElement, ComboboxGroupProps>(({ className, ...groupProps }, forwardedRef) => (
  <CommandPrimitive.Group {...groupProps} ref={forwardedRef} className={classNames('rt-BaseMenuGroup', 'rt-ComboboxGroup', className)} />
));
ComboboxGroup.displayName = 'Combobox.Group';

type ComboboxLabelElement = React.ElementRef<'div'>;
interface ComboboxLabelProps extends React.ComponentPropsWithoutRef<'div'> {}
const ComboboxLabel = React.forwardRef<ComboboxLabelElement, ComboboxLabelProps>(({ className, ...labelProps }, forwardedRef) => (
  <div {...labelProps} ref={forwardedRef} className={classNames('rt-BaseMenuLabel', 'rt-ComboboxLabel', className)} />
));
ComboboxLabel.displayName = 'Combobox.Label';

type ComboboxSeparatorElement = React.ElementRef<typeof CommandPrimitive.Separator>;
interface ComboboxSeparatorProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}
/**
 * Separator visually divides logical sections of the option list.
 */
const ComboboxSeparator = React.forwardRef<ComboboxSeparatorElement, ComboboxSeparatorProps>(({ className, ...separatorProps }, forwardedRef) => (
  <CommandPrimitive.Separator {...separatorProps} ref={forwardedRef} className={classNames('rt-BaseMenuSeparator', 'rt-ComboboxSeparator', className)} />
));
ComboboxSeparator.displayName = 'Combobox.Separator';

type ComboboxItemElement = React.ElementRef<typeof CommandPrimitive.Item>;
interface ComboboxItemProps extends Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>, 'keywords'> {
  /** Display label for the item. Also used for search unless keywords are provided. */
  label?: string;
  /** Additional keywords for search filtering (overrides automatic label-based search). */
  keywords?: string[];
}
/**
 * Item wires cmdk's selection handling with Kookie UI tokens and
 * ensures labels are registered for displaying the current value.
 */
/**
 * Extracts text content from React children recursively.
 * Used to derive searchable labels from JSX children.
 */
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (children == null || typeof children === 'boolean') return '';
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).filter(Boolean).join(' ');
  }
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props.children) {
      return extractTextFromChildren(props.children);
    }
  }
  return '';
}

/**
 * Internal item component - separated for React.memo optimization.
 * React.memo prevents re-renders when props haven't changed, even when parent re-renders.
 */
const ComboboxItemImpl = React.forwardRef<ComboboxItemElement, ComboboxItemProps>(({ className, children, label, value, disabled, onSelect, keywords, ...itemProps }, forwardedRef) => {
  // Use specific contexts - config for disabled, selection for value/registration
  // Items only re-render when selection or config changes, not on search/navigation/open
  const configContext = useComboboxConfigContext('Combobox.Item');
  const selectionContext = useComboboxSelectionContext('Combobox.Item');
  const contentContext = useComboboxContentContext();

  // Memoize label extraction to avoid recursive traversal on every render
  const extractedLabel = React.useMemo(() => extractTextFromChildren(children), [children]);
  const itemLabel = label ?? (extractedLabel || String(value));
  const isSelected = value != null && selectionContext.value === value;
  const sizeClass = contentContext?.size ? `rt-r-size-${contentContext.size}` : undefined;

  // Use provided keywords, or default to the item label for search
  // This allows searching by display text even when value is different (e.g., "usa" vs "United States")
  const searchKeywords = keywords ?? [itemLabel];

  // Generate stable ID for this item for aria-activedescendant
  const generatedId = React.useId();
  const itemId = `combobox-item-${generatedId}`;

  // Destructure stable references to avoid effect re-runs when unrelated context values change
  const { registerItemLabel, unregisterItemLabel, handleSelect: contextHandleSelect } = selectionContext;

  // Register/unregister label for display in trigger
  React.useEffect(() => {
    if (value) {
      registerItemLabel(value, itemLabel);
      return () => unregisterItemLabel(value);
    }
  }, [registerItemLabel, unregisterItemLabel, value, itemLabel]);

  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      contextHandleSelect(selectedValue);
      onSelect?.(selectedValue);
    },
    [contextHandleSelect, onSelect],
  );

  const isDisabled = disabled ?? configContext.disabled ?? false;

  /**
   * Performance notes:
   * - data-disabled workaround: Handled via CSS selectors in combobox.css
   *   rather than per-item MutationObservers.
   * - aria-activedescendant: Tracked by a single observer in ComboboxList
   *   rather than per-item observers.
   * - Highlighting (hover) is handled purely via CSS [data-selected] by cmdk,
   *   so no React re-renders occur during keyboard/mouse navigation.
   */

  return (
    <CommandPrimitive.Item
      {...itemProps}
      id={itemId}
      value={value}
      keywords={searchKeywords}
      role="option"
      aria-selected={isSelected}
      {...(isDisabled ? { disabled: true, 'aria-disabled': true } : {})}
      ref={forwardedRef}
      onSelect={handleSelect}
      className={classNames('rt-reset', 'rt-BaseMenuItem', 'rt-ComboboxItem', className)}
    >
      {isSelected ? (
        <span className={classNames('rt-BaseMenuItemIndicator', 'rt-ComboboxItemIndicator', sizeClass)}>
          <ThickCheckIcon className={classNames('rt-BaseMenuItemIndicatorIcon', 'rt-ComboboxItemIndicatorIcon', sizeClass)} />
        </span>
      ) : null}
      <Slottable>{children}</Slottable>
    </CommandPrimitive.Item>
  );
});
ComboboxItemImpl.displayName = 'Combobox.ItemImpl';

/**
 * Memoized Combobox.Item - prevents unnecessary re-renders when parent components update.
 * This is especially important in lists with many items where parent re-renders could cascade.
 */
const ComboboxItem = React.memo(ComboboxItemImpl) as typeof ComboboxItemImpl;
ComboboxItem.displayName = 'Combobox.Item';

export {
  ComboboxRoot as Root,
  ComboboxTrigger as Trigger,
  ComboboxValue as Value,
  ComboboxContent as Content,
  ComboboxInput as Input,
  ComboboxList as List,
  ComboboxEmpty as Empty,
  ComboboxGroup as Group,
  ComboboxLabel as Label,
  ComboboxSeparator as Separator,
  ComboboxItem as Item,
};
export type {
  ComboboxRootProps as RootProps,
  ComboboxTriggerProps as TriggerProps,
  ComboboxValueProps as ValueProps,
  ComboboxContentProps as ContentProps,
  ComboboxInputProps as InputProps,
  ComboboxListProps as ListProps,
  ComboboxEmptyProps as EmptyProps,
  ComboboxGroupProps as GroupProps,
  ComboboxLabelProps as LabelProps,
  ComboboxSeparatorProps as SeparatorProps,
  ComboboxItemProps as ItemProps,
};
