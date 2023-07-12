'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { selectRootPropDefs, selectTriggerPropDefs, selectContentPropDefs } from './select.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import { Theme, useThemeContext } from '../theme';
import { CheckIcon, ChevronDownIcon } from '../icons';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type SelectRootOwnProps = GetPropDefTypes<typeof selectRootPropDefs>;

type SelectContextValue = SelectRootOwnProps;
const SelectContext = React.createContext<SelectContextValue>({});

interface SelectRootProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    SelectContextValue {}
const SelectRoot: React.FC<SelectRootProps> = (props) => {
  const {
    children,
    size = selectRootPropDefs.size.default,
    radius = selectRootPropDefs.radius.default,
    ...rootProps
  } = props;
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
type SelectTriggerOwnProps = GetPropDefTypes<typeof selectTriggerPropDefs>;
interface SelectTriggerProps
  extends Omit<PropsWithoutRefOrColor<typeof SelectPrimitive.Trigger>, 'asChild'>,
    MarginProps,
    SelectTriggerOwnProps {}
const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const {
      className,
      variant = selectTriggerPropDefs.variant.default,
      highContrast = selectTriggerPropDefs.highContrast.default,
      color = selectTriggerPropDefs.color.default,
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
            { 'high-contrast': highContrast },
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
type SelectContentOwnProps = GetPropDefTypes<typeof selectContentPropDefs>;
interface SelectContentProps
  extends PropsWithoutRefOrColor<typeof SelectPrimitive.Content>,
    SelectContentOwnProps {
  container?: React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
}
const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      variant = selectContentPropDefs.variant.default,
      highContrast = selectContentPropDefs.highContrast.default,
      color = selectContentPropDefs.color.default,
      container,
      ...contentProps
    } = props;
    const { size, radius } = React.useContext(SelectContext);
    const themeContext = useThemeContext();
    const resolvedColor = color ?? themeContext.accentScale;
    const resolvedRadius = radius ?? themeContext.radius;
    return (
      <SelectPrimitive.Portal container={container}>
        <Theme asChild>
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
              { 'high-contrast': highContrast }
            )}
          >
            <ScrollAreaPrimitive.Root type="auto" className="rui-ScrollAreaRoot">
              <SelectPrimitive.Viewport asChild className="rui-SelectViewport">
                <ScrollAreaPrimitive.Viewport
                  className="rui-ScrollAreaViewport"
                  style={{ overflowY: undefined }}
                >
                  {children}
                </ScrollAreaPrimitive.Viewport>
              </SelectPrimitive.Viewport>
              <ScrollAreaPrimitive.Scrollbar
                className="rui-ScrollAreaScrollbar size-1"
                orientation="vertical"
              >
                <ScrollAreaPrimitive.Thumb className="rui-ScrollAreaThumb" />
              </ScrollAreaPrimitive.Scrollbar>
            </ScrollAreaPrimitive.Root>
          </SelectPrimitive.Content>
        </Theme>
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
