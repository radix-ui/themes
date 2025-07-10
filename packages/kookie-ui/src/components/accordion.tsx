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
    const { className, panelBackground, flush, radius, ...extractedRadixProps } = extractProps(
      props,
      accordionRootPropDefs,
    );

    const radixProps = extractedRadixProps as React.ComponentPropsWithoutRef<
      typeof AccordionPrimitive.Root
    >;

    // Ensure single accordions can collapse by default unless explicitly set
    if (radixProps.type === 'single' && radixProps.collapsible === undefined) {
      radixProps.collapsible = true;
    }

    return (
      <AccordionPrimitive.Root
        {...radixProps}
        ref={forwardedRef}
        className={classNames('rt-AccordionRoot', className)}
        data-panel-background={panelBackground}
        data-flush={flush || undefined}
        data-radius={radius}
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

    return (
      <AccordionPrimitive.Trigger
        {...triggerProps}
        ref={forwardedRef}
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
