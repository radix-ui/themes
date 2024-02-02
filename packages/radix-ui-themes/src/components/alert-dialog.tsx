'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { alertDialogContentPropDefs } from './alert-dialog.props';
import { extractProps, requireReactElement } from '../helpers';
import { Heading } from './heading';
import { Text } from './text';
import { Theme } from '../theme';

import type { ComponentPropsAs, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

interface AlertDialogRootProps extends PropsWithoutRefOrColor<typeof AlertDialogPrimitive.Root> {}
const AlertDialogRoot: React.FC<AlertDialogRootProps> = (props) => (
  <AlertDialogPrimitive.Root {...props} />
);
AlertDialogRoot.displayName = 'AlertDialogRoot';

type AlertDialogTriggerElement = React.ElementRef<typeof AlertDialogPrimitive.Trigger>;
interface AlertDialogTriggerProps
  extends Omit<PropsWithoutRefOrColor<typeof AlertDialogPrimitive.Trigger>, 'asChild'> {}
const AlertDialogTrigger = React.forwardRef<AlertDialogTriggerElement, AlertDialogTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <AlertDialogPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </AlertDialogPrimitive.Trigger>
  )
);
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

type AlertDialogContentElement = React.ElementRef<typeof AlertDialogPrimitive.Content>;
type AlertDialogContentOwnProps = GetPropDefTypes<typeof alertDialogContentPropDefs>;
interface AlertDialogContentProps
  extends PropsWithoutRefOrColor<typeof AlertDialogPrimitive.Content>,
    AlertDialogContentOwnProps {
  container?: React.ComponentProps<typeof AlertDialogPrimitive.Portal>['container'];
}
const AlertDialogContent = React.forwardRef<AlertDialogContentElement, AlertDialogContentProps>(
  (props, forwardedRef) => {
    const { className, forceMount, container, ...contentProps } = extractProps(
      props,
      alertDialogContentPropDefs
    );
    return (
      <AlertDialogPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <AlertDialogPrimitive.Overlay className="rt-BaseDialogOverlay rt-AlertDialogOverlay">
            <div className="rt-BaseDialogScroll rt-AlertDialogScroll">
              <div className="rt-BaseDialogScrollPadding rt-AlertDialogScrollPadding">
                <AlertDialogPrimitive.Content
                  {...contentProps}
                  ref={forwardedRef}
                  className={classNames('rt-BaseDialogContent', 'rt-AlertDialogContent', className)}
                />
              </div>
            </div>
          </AlertDialogPrimitive.Overlay>
        </Theme>
      </AlertDialogPrimitive.Portal>
    );
  }
);
AlertDialogContent.displayName = 'AlertDialogContent';

type AlertDialogTitleElement = React.ElementRef<typeof Heading>;
type AlertDialogTitleProps = Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'asChild'>;
const AlertDialogTitle = React.forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(
  (props, forwardedRef) => (
    <AlertDialogPrimitive.Title asChild>
      <Heading size="5" mb="3" trim="start" {...props} asChild={false} ref={forwardedRef} />
    </AlertDialogPrimitive.Title>
  )
);
AlertDialogTitle.displayName = 'AlertDialogTitle';

type AlertDialogDescriptionElement = HTMLParagraphElement;
type AlertDialogDescriptionProps = ComponentPropsAs<typeof Text, 'p'>;
const AlertDialogDescription = React.forwardRef<
  AlertDialogDescriptionElement,
  AlertDialogDescriptionProps
>((props, forwardedRef) => (
  <AlertDialogPrimitive.Description asChild>
    <Text as="p" size="3" {...props} asChild={false} ref={forwardedRef} />
  </AlertDialogPrimitive.Description>
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

type AlertDialogActionElement = React.ElementRef<typeof AlertDialogPrimitive.Action>;
interface AlertDialogActionProps
  extends Omit<PropsWithoutRefOrColor<typeof AlertDialogPrimitive.Action>, 'asChild'> {}
const AlertDialogAction = React.forwardRef<AlertDialogActionElement, AlertDialogActionProps>(
  ({ children, ...props }, forwardedRef) => (
    <AlertDialogPrimitive.Action {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </AlertDialogPrimitive.Action>
  )
);
AlertDialogAction.displayName = 'AlertDialogAction';

type AlertDialogCancelElement = React.ElementRef<typeof AlertDialogPrimitive.Cancel>;
interface AlertDialogCancelProps
  extends Omit<PropsWithoutRefOrColor<typeof AlertDialogPrimitive.Cancel>, 'asChild'> {}
const AlertDialogCancel = React.forwardRef<AlertDialogCancelElement, AlertDialogCancelProps>(
  ({ children, ...props }, forwardedRef) => (
    <AlertDialogPrimitive.Cancel {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </AlertDialogPrimitive.Cancel>
  )
);
AlertDialogCancel.displayName = 'AlertDialogCancel';

export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

export type {
  AlertDialogRootProps,
  AlertDialogTriggerProps,
  AlertDialogContentProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
};
