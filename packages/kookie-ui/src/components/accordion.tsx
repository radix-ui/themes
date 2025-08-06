import * as React from 'react';
import classNames from 'classnames';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import {
  accordionRootPropDefs,
  accordionItemPropDefs,
  accordionHeaderPropDefs,
  accordionTriggerPropDefs,
  accordionContentPropDefs,
} from './accordion.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { requireReactElement } from '../helpers/require-react-element.js';

import type {
  AccordionRootOwnProps,
  AccordionItemOwnProps,
  AccordionHeaderOwnProps,
  AccordionTriggerOwnProps,
  AccordionContentOwnProps,
} from './accordion.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

// Root component
type AccordionRootElement = React.ElementRef<typeof AccordionPrimitive.Root>;
interface AccordionRootProps
  extends ComponentPropsWithout<typeof AccordionPrimitive.Root, RemovedProps>,
    AccordionRootOwnProps {}

const AccordionRoot = React.forwardRef<AccordionRootElement, AccordionRootProps>(
  (props, forwardedRef) => {
    const { className, panelBackground, material, flush, radius, color, ...extractedRadixProps } =
      extractProps(props, accordionRootPropDefs);

    const radixProps = extractedRadixProps as React.ComponentPropsWithoutRef<
      typeof AccordionPrimitive.Root
    >;

    // Show deprecation warning for panelBackground when used
    React.useEffect(() => {
      if (props.panelBackground !== undefined) {
        console.warn(
          'Warning: The `panelBackground` prop is deprecated and will be removed in a future version. Use `material` prop instead.',
        );
      }
    }, [props.panelBackground]);

    // Material takes precedence over panelBackground
    const effectiveMaterial = material ?? panelBackground;

    // Ensure single accordions can collapse by default unless explicitly set
    if (radixProps.type === 'single' && radixProps.collapsible === undefined) {
      radixProps.collapsible = true;
    }

    // Handle Home/End key navigation for multi-item accordions
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (radixProps.type === 'multiple') {
          const items = event.currentTarget.querySelectorAll('[data-radix-accordion-item]');

          if (event.key === 'Home') {
            event.preventDefault();
            const firstTrigger = items[0]?.querySelector(
              '[data-radix-accordion-trigger]',
            ) as HTMLElement;
            firstTrigger?.focus();
          } else if (event.key === 'End') {
            event.preventDefault();
            const lastTrigger = items[items.length - 1]?.querySelector(
              '[data-radix-accordion-trigger]',
            ) as HTMLElement;
            lastTrigger?.focus();
          }
        }
      },
      [radixProps.type],
    );

    return (
      <AccordionPrimitive.Root
        {...radixProps}
        ref={forwardedRef}
        className={classNames('rt-AccordionRoot', className)}
        data-accent-color={color}
        data-panel-background={effectiveMaterial}
        data-material={effectiveMaterial}
        data-flush={flush || undefined}
        data-radius={radius}
        onKeyDown={handleKeyDown}
      />
    );
  },
);
AccordionRoot.displayName = 'Accordion.Root';

// Item component
type AccordionItemElement = React.ElementRef<typeof AccordionPrimitive.Item>;
interface AccordionItemProps
  extends ComponentPropsWithout<typeof AccordionPrimitive.Item, RemovedProps>,
    AccordionItemOwnProps {}

const AccordionItem = React.forwardRef<AccordionItemElement, AccordionItemProps>(
  (props, forwardedRef) => {
    const { className, ...itemProps } = extractProps(props, accordionItemPropDefs);

    return (
      <AccordionPrimitive.Item
        {...itemProps}
        ref={forwardedRef}
        className={classNames('rt-AccordionItem', className)}
      />
    );
  },
);
AccordionItem.displayName = 'Accordion.Item';

// Header component
type AccordionHeaderElement = React.ElementRef<typeof AccordionPrimitive.Header>;
interface AccordionHeaderProps
  extends ComponentPropsWithout<typeof AccordionPrimitive.Header, RemovedProps>,
    AccordionHeaderOwnProps {}

const AccordionHeader = React.forwardRef<AccordionHeaderElement, AccordionHeaderProps>(
  (props, forwardedRef) => {
    const { className, ...headerProps } = extractProps(props, accordionHeaderPropDefs);

    return (
      <AccordionPrimitive.Header
        {...headerProps}
        ref={forwardedRef}
        className={classNames('rt-AccordionHeader', className)}
      />
    );
  },
);
AccordionHeader.displayName = 'Accordion.Header';

// Trigger component
type AccordionTriggerElement = React.ElementRef<typeof AccordionPrimitive.Trigger>;
interface AccordionTriggerProps
  extends ComponentPropsWithout<typeof AccordionPrimitive.Trigger, RemovedProps>,
    AccordionTriggerOwnProps {}

const AccordionTrigger = React.forwardRef<AccordionTriggerElement, AccordionTriggerProps>(
  ({ children, ...props }, forwardedRef) => {
    const { className, ...triggerProps } = extractProps(props, accordionTriggerPropDefs);

    // Radix UI handles focus management automatically
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    return (
      <AccordionPrimitive.Trigger
        {...triggerProps}
        ref={(node) => {
          triggerRef.current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={classNames('rt-AccordionTrigger', className)}
      >
        {children}
      </AccordionPrimitive.Trigger>
    );
  },
);
AccordionTrigger.displayName = 'Accordion.Trigger';

// Content component
type AccordionContentElement = React.ElementRef<typeof AccordionPrimitive.Content>;
interface AccordionContentProps
  extends ComponentPropsWithout<typeof AccordionPrimitive.Content, RemovedProps>,
    AccordionContentOwnProps {}

const AccordionContent = React.forwardRef<AccordionContentElement, AccordionContentProps>(
  (props, forwardedRef) => {
    const { className, children, ...contentProps } = extractProps(props, accordionContentPropDefs);

    return (
      <AccordionPrimitive.Content
        {...contentProps}
        ref={forwardedRef}
        className={classNames('rt-AccordionContent', className)}
        aria-live="polite"
      >
        <div className="rt-AccordionContentInner">{children}</div>
      </AccordionPrimitive.Content>
    );
  },
);
AccordionContent.displayName = 'Accordion.Content';

export {
  AccordionRoot as Root,
  AccordionItem as Item,
  AccordionHeader as Header,
  AccordionTrigger as Trigger,
  AccordionContent as Content,
};

export type {
  AccordionRootProps as RootProps,
  AccordionItemProps as ItemProps,
  AccordionHeaderProps as HeaderProps,
  AccordionTriggerProps as TriggerProps,
  AccordionContentProps as ContentProps,
};
