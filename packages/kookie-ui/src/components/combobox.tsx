'use client';

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

type TextFieldVariant = (typeof textFieldRootPropDefs.variant.values)[number];
type ComboboxValue = string | null;
type CommandFilter = (value: string, search: string, keywords?: string[]) => number;

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
};

interface ComboboxContextValue extends ComboboxRootOwnProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: ComboboxValue;
  setValue: (value: ComboboxValue) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedLabel?: string;
  registerItemLabel: (value: string, label: string) => void;
  handleSelect: (value: string) => void;
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);
const useComboboxContext = (caller: string) => {
  const ctx = React.useContext(ComboboxContext);
  if (!ctx) {
    throw new Error(`${caller} must be used within Combobox.Root`);
  }
  return ctx;
};

const ComboboxContentContext = React.createContext<{ variant: 'solid' | 'soft'; size?: string; color?: string; material?: string; highContrast?: boolean } | null>(null);
const useComboboxContentContext = () => {
  const ctx = React.useContext(ComboboxContentContext);
  return ctx; // Optional - Input might not always be in Content
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
    searchPlaceholder = 'Search options...',
    searchValue: searchValueProp,
    defaultSearchValue = '',
    onSearchValueChange,
    filter,
    shouldFilter = true,
    loop = true,
    disabled,
    ...rootProps
  } = props;

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const [value, setValue] = useControllableState<ComboboxValue>({
    prop: valueProp ?? null,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [searchValue, setSearchValue] = useControllableState<string>({
    prop: searchValueProp,
    defaultProp: defaultSearchValue,
    onChange: onSearchValueChange,
  });

  const labelMapRef = React.useRef(new Map<string, string>());
  const registerItemLabel = React.useCallback((itemValue: string, label: string) => {
    labelMapRef.current.set(itemValue, label);
  }, []);

  const selectedLabel = value != null ? labelMapRef.current.get(value) : undefined;

  const handleSelect = React.useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      setOpen(false);
      setSearchValue('');
    },
    [setOpen, setSearchValue, setValue],
  );

  const contextValue = React.useMemo<ComboboxContextValue>(
    () => ({
      size,
      highContrast,
      placeholder,
      searchPlaceholder,
      filter,
      shouldFilter,
      loop,
      disabled,
      open,
      setOpen,
      value,
      setValue,
      searchValue,
      setSearchValue,
      selectedLabel,
      registerItemLabel,
      handleSelect,
    }),
    [
      size,
      highContrast,
      placeholder,
      searchPlaceholder,
      filter,
      shouldFilter,
      loop,
      disabled,
      open,
      setOpen,
      value,
      setValue,
      searchValue,
      setSearchValue,
      selectedLabel,
      registerItemLabel,
      handleSelect,
    ],
  );

  return (
    <ComboboxContext.Provider value={contextValue}>
      <Popover.Root open={open} onOpenChange={setOpen} {...rootProps}>
        {children}
      </Popover.Root>
    </ComboboxContext.Provider>
  );
};
ComboboxRoot.displayName = 'Combobox.Root';

type ComboboxTriggerElement = HTMLButtonElement;
type ComboboxTriggerOwnProps = GetPropDefTypes<typeof comboboxTriggerPropDefs>;
type NativeTriggerProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>;
interface ComboboxTriggerProps extends NativeTriggerProps, MarginProps, ComboboxTriggerOwnProps {}
const ComboboxTrigger = React.forwardRef<ComboboxTriggerElement, ComboboxTriggerProps>((props, forwardedRef) => {
  const context = useComboboxContext('Combobox.Trigger');
  const { children, className, placeholder, disabled, readOnly, error, loading, color, radius, ...triggerProps } = extractProps(
    { size: context.size, highContrast: context.highContrast, ...props },
    { size: comboboxRootPropDefs.size, highContrast: comboboxRootPropDefs.highContrast },
    comboboxTriggerPropDefs,
    marginPropDefs,
  );

  // Extract material and panelBackground separately since they need to be passed as data attributes
  const { material, panelBackground } = props;

  const isDisabled = disabled ?? context.disabled;
  const ariaProps = React.useMemo(
    () => ({
      'aria-expanded': context.open,
      'aria-disabled': isDisabled || undefined,
      'aria-haspopup': 'listbox' as const,
    }),
    [context.open, isDisabled],
  );

  const defaultContent = (
    <>
      <span className="rt-SelectTriggerInner">
        <ComboboxValue placeholder={placeholder ?? context.placeholder} />
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

  const triggerChild = (
    <button
      data-accent-color={color}
      data-radius={radius}
      data-panel-background={panelBackground}
      data-material={material}
      data-error={error}
      data-loading={loading}
      data-disabled={isDisabled || undefined}
      data-read-only={readOnly || undefined}
      {...triggerProps}
      {...ariaProps}
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
const ComboboxValue = React.forwardRef<ComboboxValueElement, ComboboxValueProps>(({ placeholder, children, className, ...valueProps }, forwardedRef) => {
  const context = useComboboxContext('Combobox.Value');
  const displayValue = context.selectedLabel ?? context.value ?? undefined;
  const fallback = placeholder ?? context.placeholder;
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
const ComboboxContent = React.forwardRef<ComboboxContentElement, ComboboxContentProps>((props, forwardedRef) => {
  const context = useComboboxContext('Combobox.Content');
  const themeContext = useThemeContext();
  const effectiveMaterial = themeContext.panelBackground;

  const sizeProp = props.size ?? context.size ?? comboboxContentPropDefs.size.default;
  const variantProp = props.variant ?? comboboxContentPropDefs.variant.default;
  const highContrastProp = props.highContrast ?? context.highContrast ?? comboboxContentPropDefs.highContrast.default;

  const { className, children, color, forceMount, container, ...contentProps } = extractProps(
    { ...props, size: sizeProp, variant: variantProp, highContrast: highContrastProp },
    comboboxContentPropDefs,
  );
  const resolvedColor = color || themeContext.accentColor;
  let sanitizedClassName = className;
  if (typeof sizeProp === 'string') {
    sanitizedClassName =
      className
        ?.split(/\s+/)
        .filter(Boolean)
        .filter((token) => !/^rt-r-size-\d$/.test(token))
        .join(' ') || undefined;
  }

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
      forceMount={forceMount}
      container={container}
      ref={forwardedRef}
      className={classNames('rt-PopperContent', 'rt-BaseMenuContent', 'rt-ComboboxContent', sanitizedClassName)}
    >
      <Theme asChild>
        <ScrollArea type="auto">
          <div className={classNames('rt-BaseMenuViewport', 'rt-ComboboxViewport')}>
            <ComboboxContentContext.Provider value={{ variant: variantProp, size: String(sizeProp), color: resolvedColor, material: effectiveMaterial, highContrast: highContrastProp }}>
              <CommandPrimitive
                loop={context.loop}
                value={context.searchValue}
                onValueChange={context.setSearchValue}
                shouldFilter={context.shouldFilter}
                filter={context.filter}
                className="rt-ComboboxCommand"
              >
                {children}
              </CommandPrimitive>
            </ComboboxContentContext.Provider>
          </div>
        </ScrollArea>
      </Theme>
    </Popover.Content>
  );
});
ComboboxContent.displayName = 'Combobox.Content';

type ComboboxInputElement = React.ElementRef<typeof CommandPrimitive.Input>;
interface ComboboxInputProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: TextFieldVariant;
}
const ComboboxInput = React.forwardRef<ComboboxInputElement, ComboboxInputProps>(({ className, startAdornment, endAdornment, placeholder, variant: inputVariant, ...inputProps }, forwardedRef) => {
  const context = useComboboxContext('Combobox.Input');
  const contentContext = useComboboxContentContext();
  const contentVariant = contentContext?.variant ?? 'solid';
  const color = contentContext?.color;
  const material = contentContext?.material;

  // Map combobox variant to textfield variant: solid -> surface, soft -> soft unless overridden
  const textFieldVariant = inputVariant ?? (contentVariant === 'solid' ? 'surface' : 'soft');

  return (
    <div
      className={classNames('rt-TextFieldRoot', 'rt-ComboboxInputRoot', `rt-r-size-${context.size}`, `rt-variant-${textFieldVariant}`)}
      data-accent-color={color}
      data-material={material}
      data-panel-background={material}
    >
      {startAdornment ? <div className="rt-TextFieldSlot">{startAdornment}</div> : null}
      <CommandPrimitive.Input {...inputProps} ref={forwardedRef} placeholder={placeholder ?? context.searchPlaceholder} className={classNames('rt-reset', 'rt-TextFieldInput', className)} />
      {endAdornment ? (
        <div className="rt-TextFieldSlot" data-side="right">
          {endAdornment}
        </div>
      ) : null}
    </div>
  );
});
ComboboxInput.displayName = 'Combobox.Input';

type ComboboxListElement = React.ElementRef<typeof CommandPrimitive.List>;
interface ComboboxListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}
const ComboboxList = React.forwardRef<ComboboxListElement, ComboboxListProps>(({ className, ...listProps }, forwardedRef) => (
  <CommandPrimitive.List {...listProps} ref={forwardedRef} className={classNames('rt-ComboboxList', className)} />
));
ComboboxList.displayName = 'Combobox.List';

type ComboboxEmptyElement = React.ElementRef<typeof CommandPrimitive.Empty>;
interface ComboboxEmptyProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}
const ComboboxEmpty = React.forwardRef<ComboboxEmptyElement, ComboboxEmptyProps>(({ className, ...emptyProps }, forwardedRef) => (
  <CommandPrimitive.Empty {...emptyProps} ref={forwardedRef} className={classNames('rt-ComboboxEmpty', className)} />
));
ComboboxEmpty.displayName = 'Combobox.Empty';

type ComboboxGroupElement = React.ElementRef<typeof CommandPrimitive.Group>;
interface ComboboxGroupProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}
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
const ComboboxSeparator = React.forwardRef<ComboboxSeparatorElement, ComboboxSeparatorProps>(({ className, ...separatorProps }, forwardedRef) => (
  <CommandPrimitive.Separator {...separatorProps} ref={forwardedRef} className={classNames('rt-BaseMenuSeparator', 'rt-ComboboxSeparator', className)} />
));
ComboboxSeparator.displayName = 'Combobox.Separator';

type ComboboxItemElement = React.ElementRef<typeof CommandPrimitive.Item>;
interface ComboboxItemProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  label?: string;
}
const ComboboxItem = React.forwardRef<ComboboxItemElement, ComboboxItemProps>(({ className, children, label, value, disabled, onSelect, ...itemProps }, forwardedRef) => {
  const context = useComboboxContext('Combobox.Item');
  const contentContext = useComboboxContentContext();
  const itemLabel = label ?? (typeof children === 'string' ? children : String(value));
  const isSelected = value != null && context.value === value;
  const sizeClass = contentContext?.size ? `rt-r-size-${contentContext.size}` : undefined;

  React.useEffect(() => {
    if (value) {
      context.registerItemLabel(value, itemLabel);
    }
  }, [context, value, itemLabel]);

  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      context.handleSelect(selectedValue);
      onSelect?.(selectedValue);
    },
    [context, onSelect],
  );

  const isDisabled = disabled ?? context.disabled ?? false;

  // Internal ref to clean up data-disabled attribute
  const internalRef = React.useRef<ComboboxItemElement | null>(null);

  // Ref callback to handle both forwarded ref and internal ref
  const itemRef = React.useCallback(
    (node: ComboboxItemElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<ComboboxItemElement | null>).current = node;
      }
    },
    [forwardedRef],
  );

  // Remove data-disabled attribute if cmdk sets it incorrectly
  React.useEffect(() => {
    if (!isDisabled && internalRef.current) {
      const node = internalRef.current;
      // Check and remove immediately
      if (node.getAttribute('data-disabled') === 'false' || node.getAttribute('data-disabled') === '') {
        node.removeAttribute('data-disabled');
      }
      // Also watch for changes
      const observer = new MutationObserver(() => {
        if (node.getAttribute('data-disabled') === 'false' || node.getAttribute('data-disabled') === '') {
          node.removeAttribute('data-disabled');
        }
      });
      observer.observe(node, { attributes: true, attributeFilter: ['data-disabled'] });
      return () => observer.disconnect();
    }
  }, [isDisabled]);

  return (
    <CommandPrimitive.Item
      {...itemProps}
      value={value}
      {...(isDisabled ? { disabled: true } : {})}
      ref={itemRef}
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
  ComboboxContentProps as ContentProps,
  ComboboxInputProps as InputProps,
  ComboboxListProps as ListProps,
  ComboboxEmptyProps as EmptyProps,
  ComboboxGroupProps as GroupProps,
  ComboboxLabelProps as LabelProps,
  ComboboxSeparatorProps as SeparatorProps,
  ComboboxItemProps as ItemProps,
};
