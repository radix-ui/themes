'use client';

/**
 * Combobox - Simplified architecture matching shadcn's approach for optimal performance.
 * Built on Popover + cmdk with minimal context overhead.
 * 
 * Key performance optimizations:
 * - Single context instead of 5 separate contexts
 * - No MutationObserver - cmdk handles aria internally
 * - disablePointerSelection - prevents React re-renders on hover
 * - CSS :hover handles visual feedback (no state updates)
 * - No label registration - use displayValue prop for trigger display
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
import { Slottable } from './slot.js';
import { textFieldRootPropDefs } from './text-field.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type TextFieldVariant = (typeof textFieldRootPropDefs.variant.values)[number];
type ComboboxValue = string | null;
type CommandFilter = (value: string, search: string, keywords?: string[]) => number;

/**
 * Single unified context - contains only essential shared state.
 * This replaces the previous 5 separate contexts for better performance.
 */
interface ComboboxContextValue {
  // Selection state
  value: ComboboxValue;
  onSelect: (value: string) => void;
  // Open state
  open: boolean;
  setOpen: (open: boolean) => void;
  // Config (static, rarely changes)
  size?: ComboboxRootOwnProps['size'];
  highContrast?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  color?: string;
  // Display
  displayValue?: string;
  // Accessibility
  listboxId: string;
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

const useComboboxContext = () => {
  const ctx = React.useContext(ComboboxContext);
  if (!ctx) {
    throw new Error('Combobox components must be used within Combobox.Root');
  }
  return ctx;
};

/**
 * Context for Content-specific values (variant, material).
 * Separate from main context as it's only needed inside Content.
 */
interface ComboboxContentContextValue {
  variant: 'solid' | 'soft';
  size: string;
  color?: string;
  material?: string;
  highContrast?: boolean;
  // cmdk config passed down
  loop?: boolean;
  shouldFilter?: boolean;
  filter?: CommandFilter;
}

const ComboboxContentContext = React.createContext<ComboboxContentContextValue | null>(null);

const useComboboxContentContext = () => React.useContext(ComboboxContentContext);

// ============================================================================
// Root
// ============================================================================

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
  resetSearchOnSelect?: boolean;
  color?: (typeof comboboxTriggerPropDefs.color.values)[number];
  /**
   * Display value for the trigger. Required for optimal performance.
   * Can be a string or function that receives the current value.
   * @example displayValue={(v) => items.find(i => i.value === v)?.label}
   */
  displayValue?: string | ((value: ComboboxValue) => string | undefined);
};

type PopoverRootProps = React.ComponentPropsWithoutRef<typeof Popover.Root>;
interface ComboboxRootProps extends PopoverRootProps, ComboboxRootOwnProps {}

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
    searchPlaceholder = 'Search...',
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

  // Generate stable ID for listbox accessibility linkage
  const listboxId = React.useId();

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

  // Resolve displayValue
  const resolvedDisplayValue = React.useMemo(() => {
    if (displayValueProp == null) return undefined;
    if (typeof displayValueProp === 'function') {
      return displayValueProp(value);
    }
    return displayValueProp;
  }, [displayValueProp, value]);

  // Handle selection - batches all state updates
  const onSelect = React.useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      setOpen(false);
      if (resetSearchOnSelect) {
        setSearchValue('');
      }
    },
    [setOpen, setSearchValue, setValue, resetSearchOnSelect],
  );

  // Single context value - memoized for performance
  const contextValue = React.useMemo<ComboboxContextValue>(
    () => ({
      value,
      onSelect,
      open,
      setOpen,
      size,
      highContrast,
      placeholder,
      searchPlaceholder,
      disabled,
      color,
      displayValue: resolvedDisplayValue,
      listboxId,
    }),
    [value, onSelect, open, setOpen, size, highContrast, placeholder, searchPlaceholder, disabled, color, resolvedDisplayValue, listboxId],
  );

  // Store cmdk config in a ref to avoid context updates
  const cmdkConfigRef = React.useRef({ filter, shouldFilter, loop, searchValue, setSearchValue });
  cmdkConfigRef.current = { filter, shouldFilter, loop, searchValue, setSearchValue };

  return (
    <ComboboxContext.Provider value={contextValue}>
      <CmdkConfigContext.Provider value={cmdkConfigRef}>
        <Popover.Root open={open} onOpenChange={setOpen} {...rootProps}>
          {children}
        </Popover.Root>
      </CmdkConfigContext.Provider>
    </ComboboxContext.Provider>
  );
};
ComboboxRoot.displayName = 'Combobox.Root';

// Separate ref context for cmdk config to avoid re-renders
const CmdkConfigContext = React.createContext<React.MutableRefObject<{
  filter?: CommandFilter;
  shouldFilter: boolean;
  loop: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
}> | null>(null);

// ============================================================================
// Trigger
// ============================================================================

type ComboboxTriggerElement = HTMLButtonElement;
type ComboboxTriggerOwnProps = GetPropDefTypes<typeof comboboxTriggerPropDefs>;
type NativeTriggerProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>;
interface ComboboxTriggerProps extends NativeTriggerProps, MarginProps, ComboboxTriggerOwnProps {}

const ComboboxTrigger = React.forwardRef<ComboboxTriggerElement, ComboboxTriggerProps>((props, forwardedRef) => {
  const ctx = useComboboxContext();

  const { children, className, placeholder, disabled, readOnly, error, loading, color, radius, ...triggerProps } = extractProps(
    { size: ctx.size, highContrast: ctx.highContrast, ...props },
    { size: comboboxRootPropDefs.size, highContrast: comboboxRootPropDefs.highContrast },
    comboboxTriggerPropDefs,
    marginPropDefs,
  );

  const { material, panelBackground } = props;
  const isDisabled = disabled ?? ctx.disabled;
  const resolvedColor = color ?? ctx.color;

  const defaultContent = (
    <>
      <span className="rt-SelectTriggerInner">
        <span className="rt-ComboboxValue">
          {ctx.displayValue ?? ctx.value ?? placeholder ?? ctx.placeholder}
        </span>
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

  return (
    <Popover.Trigger disabled={isDisabled}>
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
        role="combobox"
        aria-controls={ctx.listboxId}
        aria-expanded={ctx.open}
        aria-haspopup="listbox"
        type={buttonType ?? 'button'}
        disabled={isDisabled}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-SelectTrigger', 'rt-ComboboxTrigger', className)}
      >
        {children ? requireReactElement(children) : defaultContent}
      </button>
    </Popover.Trigger>
  );
});
ComboboxTrigger.displayName = 'Combobox.Trigger';

// ============================================================================
// Value (standalone, for custom trigger layouts)
// ============================================================================

type ComboboxValueElement = HTMLSpanElement;
interface ComboboxValueProps extends React.ComponentPropsWithoutRef<'span'> {
  placeholder?: string;
}

const ComboboxValue = React.forwardRef<ComboboxValueElement, ComboboxValueProps>(
  ({ placeholder, children, className, ...valueProps }, forwardedRef) => {
    const ctx = useComboboxContext();
    const display = ctx.displayValue ?? ctx.value ?? undefined;
    return (
      <span {...valueProps} ref={forwardedRef} className={classNames('rt-ComboboxValue', className)}>
        {display ?? children ?? placeholder ?? ctx.placeholder}
      </span>
    );
  },
);
ComboboxValue.displayName = 'Combobox.Value';

// ============================================================================
// Content
// ============================================================================

type ComboboxContentElement = React.ElementRef<typeof Popover.Content>;
type ComboboxContentOwnProps = GetPropDefTypes<typeof comboboxContentPropDefs> & {
  container?: React.ComponentPropsWithoutRef<typeof Popover.Content>['container'];
};
interface ComboboxContentProps extends Omit<ComponentPropsWithout<typeof Popover.Content, RemovedProps>, 'size'>, ComboboxContentOwnProps {}

const ComboboxContent = React.forwardRef<ComboboxContentElement, ComboboxContentProps>((props, forwardedRef) => {
  const ctx = useComboboxContext();
  const cmdkConfigRef = React.useContext(CmdkConfigContext);
  const themeContext = useThemeContext();
  const effectiveMaterial = themeContext.panelBackground;

  const sizeProp = props.size ?? ctx.size ?? comboboxContentPropDefs.size.default;
  const variantProp = props.variant ?? comboboxContentPropDefs.variant.default;
  const highContrastProp = props.highContrast ?? ctx.highContrast ?? comboboxContentPropDefs.highContrast.default;

  const { className, children, color, forceMount, container, ...contentProps } = extractProps(
    { ...props, size: sizeProp, variant: variantProp, highContrast: highContrastProp },
    comboboxContentPropDefs,
  );
  const resolvedColor = color || ctx.color || themeContext.accentColor;

  const contentContextValue = React.useMemo<ComboboxContentContextValue>(
    () => ({
      variant: variantProp,
      size: String(sizeProp),
      color: resolvedColor,
      material: effectiveMaterial,
      highContrast: highContrastProp,
      loop: cmdkConfigRef?.current.loop,
      shouldFilter: cmdkConfigRef?.current.shouldFilter,
      filter: cmdkConfigRef?.current.filter,
    }),
    [variantProp, sizeProp, resolvedColor, effectiveMaterial, highContrastProp, cmdkConfigRef],
  );

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
      forceMount={forceMount === true ? true : undefined}
      container={container}
      ref={forwardedRef}
      className={classNames('rt-PopperContent', 'rt-BaseMenuContent', 'rt-ComboboxContent', className)}
    >
      <Theme asChild>
        <ComboboxContentContext.Provider value={contentContextValue}>
          <CommandPrimitive
            loop={cmdkConfigRef?.current.loop}
            shouldFilter={cmdkConfigRef?.current.shouldFilter}
            filter={cmdkConfigRef?.current.filter}
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

// ============================================================================
// Input
// ============================================================================

type ComboboxInputElement = React.ElementRef<typeof CommandPrimitive.Input>;
interface ComboboxInputProps extends Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>, 'value' | 'onValueChange'> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: TextFieldVariant;
  value?: string;
  onValueChange?: (value: string) => void;
}

const ComboboxInput = React.forwardRef<ComboboxInputElement, ComboboxInputProps>(
  ({ className, startAdornment, endAdornment, placeholder, variant: inputVariant, value, onValueChange, ...inputProps }, forwardedRef) => {
    const ctx = useComboboxContext();
    const contentContext = useComboboxContentContext();
    const cmdkConfigRef = React.useContext(CmdkConfigContext);

    const contentVariant = contentContext?.variant ?? 'solid';
    const textFieldVariant = inputVariant ?? (contentVariant === 'solid' ? 'surface' : 'soft');

    // Use controlled search value from ref (avoids context re-renders)
    const searchValue = value ?? cmdkConfigRef?.current.searchValue ?? '';
    const handleSearchChange = onValueChange ?? cmdkConfigRef?.current.setSearchValue;

    // Use size from contentContext (already resolved to string) or fallback
    const sizeClass = contentContext?.size ? `rt-r-size-${contentContext.size}` : undefined;

    const inputField = (
      <div
        className={classNames('rt-TextFieldRoot', 'rt-ComboboxInputRoot', sizeClass, `rt-variant-${textFieldVariant}`)}
        data-accent-color={contentContext?.color}
        data-material={contentContext?.material}
        data-panel-background={contentContext?.material}
      >
        {startAdornment ? <div className="rt-TextFieldSlot">{startAdornment}</div> : null}
        <CommandPrimitive.Input
          {...inputProps}
          ref={forwardedRef}
          value={searchValue}
          onValueChange={handleSearchChange}
          placeholder={placeholder ?? ctx.searchPlaceholder}
          className={classNames('rt-reset', 'rt-TextFieldInput', className)}
        />
        {endAdornment ? (
          <div className="rt-TextFieldSlot" data-side="right">
            {endAdornment}
          </div>
        ) : null}
      </div>
    );

    return contentContext ? <div className="rt-ComboboxSearch">{inputField}</div> : inputField;
  },
);
ComboboxInput.displayName = 'Combobox.Input';

// ============================================================================
// List (simplified - no MutationObserver, no ScrollArea wrapper)
// ============================================================================

type ComboboxListElement = React.ElementRef<typeof CommandPrimitive.List>;
interface ComboboxListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

const ComboboxList = React.forwardRef<ComboboxListElement, ComboboxListProps>(({ className, children, ...listProps }, forwardedRef) => {
  const ctx = useComboboxContext();
  return (
    <div className="rt-ComboboxScrollArea">
      <div className={classNames('rt-BaseMenuViewport', 'rt-ComboboxViewport')}>
        <CommandPrimitive.List
          {...listProps}
          id={ctx.listboxId}
          ref={forwardedRef}
          role="listbox"
          aria-label="Options"
          className={classNames('rt-ComboboxList', className)}
        >
          {children}
        </CommandPrimitive.List>
      </div>
    </div>
  );
});
ComboboxList.displayName = 'Combobox.List';

// ============================================================================
// Empty
// ============================================================================

type ComboboxEmptyElement = React.ElementRef<typeof CommandPrimitive.Empty>;
interface ComboboxEmptyProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

const ComboboxEmpty = React.forwardRef<ComboboxEmptyElement, ComboboxEmptyProps>(({ className, ...emptyProps }, forwardedRef) => (
  <CommandPrimitive.Empty {...emptyProps} ref={forwardedRef} className={classNames('rt-ComboboxEmpty', className)} />
));
ComboboxEmpty.displayName = 'Combobox.Empty';

// ============================================================================
// Group
// ============================================================================

type ComboboxGroupElement = React.ElementRef<typeof CommandPrimitive.Group>;
interface ComboboxGroupProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}

const ComboboxGroup = React.forwardRef<ComboboxGroupElement, ComboboxGroupProps>(({ className, ...groupProps }, forwardedRef) => (
  <CommandPrimitive.Group {...groupProps} ref={forwardedRef} className={classNames('rt-BaseMenuGroup', 'rt-ComboboxGroup', className)} />
));
ComboboxGroup.displayName = 'Combobox.Group';

// ============================================================================
// Label
// ============================================================================

type ComboboxLabelElement = React.ElementRef<'div'>;
interface ComboboxLabelProps extends React.ComponentPropsWithoutRef<'div'> {}

const ComboboxLabel = React.forwardRef<ComboboxLabelElement, ComboboxLabelProps>(({ className, ...labelProps }, forwardedRef) => (
  <div {...labelProps} ref={forwardedRef} className={classNames('rt-BaseMenuLabel', 'rt-ComboboxLabel', className)} />
));
ComboboxLabel.displayName = 'Combobox.Label';

// ============================================================================
// Separator
// ============================================================================

type ComboboxSeparatorElement = React.ElementRef<typeof CommandPrimitive.Separator>;
interface ComboboxSeparatorProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

const ComboboxSeparator = React.forwardRef<ComboboxSeparatorElement, ComboboxSeparatorProps>(({ className, ...separatorProps }, forwardedRef) => (
  <CommandPrimitive.Separator {...separatorProps} ref={forwardedRef} className={classNames('rt-BaseMenuSeparator', 'rt-ComboboxSeparator', className)} />
));
ComboboxSeparator.displayName = 'Combobox.Separator';

// ============================================================================
// Item (simplified - minimal context usage)
// ============================================================================

type ComboboxItemElement = React.ElementRef<typeof CommandPrimitive.Item>;
interface ComboboxItemProps extends Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>, 'keywords' | 'onSelect'> {
  /** Display label for search. Falls back to children text content. */
  label?: string;
  /** Additional keywords for search filtering. */
  keywords?: string[];
  /** Called when item is selected. */
  onSelect?: (value: string) => void;
}

const ComboboxItem = React.forwardRef<ComboboxItemElement, ComboboxItemProps>(
  ({ className, children, label, value, disabled, onSelect, keywords, ...itemProps }, forwardedRef) => {
    const ctx = useComboboxContext();
    const contentContext = useComboboxContentContext();

    const isSelected = value != null && ctx.value === value;
    const isDisabled = disabled ?? ctx.disabled ?? false;
    const sizeClass = contentContext?.size ? `rt-r-size-${contentContext.size}` : undefined;

    // Extract stable onSelect to avoid depending on entire ctx object
    const onSelectFromContext = ctx.onSelect;

    // Handle selection
    const handleSelect = React.useCallback(() => {
      if (value != null) {
        onSelectFromContext(value);
        onSelect?.(value);
      }
    }, [onSelectFromContext, value, onSelect]);

    // Use provided keywords or label for search
    const searchKeywords = keywords ?? (label ? [label] : undefined);

    return (
      <CommandPrimitive.Item
        {...itemProps}
        value={value}
        keywords={searchKeywords}
        role="option"
        aria-selected={isSelected}
        disabled={isDisabled || undefined}
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
  },
);
ComboboxItem.displayName = 'Combobox.Item';

// ============================================================================
// Exports
// ============================================================================

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
