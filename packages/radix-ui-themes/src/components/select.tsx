'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import {
  selectSizeDefault,
  selectTriggerVariantDefault,
  selectTriggerColorDefault,
  selectTriggerHighContrastDefault,
  selectContentModeDefault,
  selectContentVariantDefault,
  selectContentColorDefault,
  selectContentHighContrastDefault,
  selectRadiusDefault,
} from './select.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import { ThemeConfig, useThemeConfigContext } from '../theme-config';

import type { SelectSize, SelectTriggerVariant, SelectContentVariant } from './select.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeMode, ThemeAccentScale, ThemeRadius } from '../theme';

type SelectContextValue = { size?: Responsive<SelectSize>; radius?: ThemeRadius };
const SelectContext = React.createContext<SelectContextValue>({});

interface SelectRootProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    SelectContextValue {}
const SelectRoot: React.FC<SelectRootProps> = (props) => {
  const { children, size = selectSizeDefault, radius = selectRadiusDefault, ...rootProps } = props;
  return (
    <SelectPrimitive.Root {...rootProps}>
      <SelectContext.Provider value={React.useMemo(() => ({ size, radius }), [size, radius])}>
        {children}
      </SelectContext.Provider>
    </SelectPrimitive.Root>
  );
};
SelectRoot.displayName = 'SelectRoot';

type SelectTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
interface SelectTriggerProps
  extends Omit<PropsWithoutRefOrColor<typeof SelectPrimitive.Trigger>, 'asChild'>,
    MarginProps {
  variant?: SelectTriggerVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
}
const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const {
      className,
      variant = selectTriggerVariantDefault,
      highContrast = selectTriggerHighContrastDefault,
      color = selectTriggerColorDefault,
      placeholder,
      ...triggerProps
    } = marginRest;
    const { size, radius } = React.useContext(SelectContext);
    return (
      <SelectPrimitive.Trigger asChild>
        <button
          data-accent-scale={color}
          data-radius={radius}
          {...triggerProps}
          ref={forwardedRef}
          className={classNames(
            'rui-reset-button',
            'rui-BaseButton',
            'rui-Button',
            'rui-SelectTrigger',
            withBreakpoints(size, 'size'),
            `variant-${variant}`,
            { highContrast },
            withMarginProps(marginProps),
            className
          )}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="rui-SelectIcon" />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

type SelectContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
interface SelectContentProps extends PropsWithoutRefOrColor<typeof SelectPrimitive.Content> {
  mode?: ThemeMode;
  size?: Responsive<SelectSize>;
  variant?: SelectContentVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
  container?: React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
}
const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      mode = selectContentModeDefault,
      variant = selectContentVariantDefault,
      highContrast = selectContentHighContrastDefault,
      color = selectContentColorDefault,
      container,
      ...contentProps
    } = props;
    const { size, radius } = React.useContext(SelectContext);
    const themeConfigContext = useThemeConfigContext();
    const resolvedColor = color ?? themeConfigContext.accentScale;
    const resolvedRadius = radius ?? themeConfigContext.radius;
    return (
      <SelectPrimitive.Portal container={container}>
        <ThemeConfig asChild mode={mode}>
          <SelectPrimitive.Content
            data-accent-scale={resolvedColor}
            data-radius={resolvedRadius}
            sideOffset={4}
            align="center"
            {...contentProps}
            ref={forwardedRef}
            className={classNames(
              { 'rui-PopperContent': contentProps.position === 'popper' },
              'rui-SelectContent',
              withBreakpoints(size, 'size'),
              `variant-${variant}`,
              { highContrast }
            )}
          >
            <SelectPrimitive.Viewport className="rui-SelectViewport">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </ThemeConfig>
      </SelectPrimitive.Portal>
    );
  }
);
SelectContent.displayName = 'SelectContent';

type SelectItemElement = React.ElementRef<typeof SelectPrimitive.Item>;
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}
const SelectItem = React.forwardRef<SelectItemElement, SelectItemProps>((props, forwardedRef) => {
  const { className, children, ...itemProps } = props;
  return (
    <SelectPrimitive.Item
      {...itemProps}
      ref={forwardedRef}
      className={classNames('rui-SelectItem', className)}
    >
      <SelectPrimitive.ItemIndicator className="rui-SelectItemIndicator">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = 'SelectItem';

type SelectGroupElement = React.ElementRef<typeof SelectPrimitive.Group>;
interface SelectGroupProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {}
const SelectGroup = React.forwardRef<SelectGroupElement, SelectGroupProps>(
  (props, forwardedRef) => (
    <SelectPrimitive.Group
      {...props}
      ref={forwardedRef}
      className={classNames('rui-SelectGroup', props.className)}
    />
  )
);
SelectGroup.displayName = 'SelectGroup';

type SelectLabelElement = React.ElementRef<typeof SelectPrimitive.Label>;
interface SelectLabelProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}
const SelectLabel = React.forwardRef<SelectLabelElement, SelectLabelProps>(
  (props, forwardedRef) => (
    <SelectPrimitive.Label
      {...props}
      ref={forwardedRef}
      className={classNames('rui-SelectLabel', props.className)}
    />
  )
);
SelectLabel.displayName = 'SelectLabel';

type SelectSeparatorElement = React.ElementRef<typeof SelectPrimitive.Separator>;
interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}
const SelectSeparator = React.forwardRef<SelectSeparatorElement, SelectSeparatorProps>(
  (props, forwardedRef) => (
    <SelectPrimitive.Separator
      {...props}
      ref={forwardedRef}
      className={classNames('rui-SelectSeparator', props.className)}
    />
  )
);
SelectSeparator.displayName = 'SelectSeparator';

function extractRootProps<T extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>>(
  props: T
) {
  const {
    defaultValue,
    value,
    onValueChange,
    defaultOpen,
    open,
    onOpenChange,
    dir,
    name,
    disabled,
    required,
    ...rest
  } = props;
  return {
    defaultValue,
    value,
    onValueChange,
    defaultOpen,
    open,
    onOpenChange,
    dir,
    name,
    disabled,
    required,
    rest,
  };
}

const Select = Object.assign(
  {},
  {
    Root: SelectRoot,
    Trigger: SelectTrigger,
    Content: SelectContent,
    Item: SelectItem,
    Group: SelectGroup,
    Label: SelectLabel,
    Separator: SelectSeparator,
  }
);

export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
};
