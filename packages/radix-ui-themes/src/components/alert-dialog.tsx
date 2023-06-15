'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import { Heading } from './heading';
import { Text } from './text';

interface AlertDialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root> {}
const AlertDialogRoot: React.FC<AlertDialogProps> = (props) => (
  <AlertDialogPrimitive.Root {...props} />
);
AlertDialogRoot.displayName = 'AlertDialogRoot';

type AlertDialogTriggerElement = React.ElementRef<typeof AlertDialogPrimitive.Trigger>;
interface AlertDialogTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>, 'asChild'> {}
const AlertDialogTrigger = React.forwardRef<AlertDialogTriggerElement, AlertDialogTriggerProps>(
  (props, forwardedRef) => <AlertDialogPrimitive.Trigger {...props} ref={forwardedRef} asChild />
);
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

type AlertDialogContentElement = React.ElementRef<typeof AlertDialogPrimitive.Content>;
interface AlertDialogContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>, 'asChild'> {}
const AlertDialogContent = React.forwardRef<AlertDialogContentElement, AlertDialogContentProps>(
  (props, forwardedRef) => (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="rui-DialogOverlay rui-AlertDialogOverlay">
        <AlertDialogPrimitive.Content
          {...props}
          ref={forwardedRef}
          className={classNames('rui-DialogContent rui-AlertDialogContent', props.className)}
        />
      </AlertDialogPrimitive.Overlay>
    </AlertDialogPrimitive.Portal>
  )
);
AlertDialogContent.displayName = 'AlertDialogContent';

type AlertDialogTitleElement = React.ElementRef<typeof Heading>;
interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof Heading> {}
const AlertDialogTitle = React.forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(
  (props, forwardedRef) => (
    <AlertDialogPrimitive.Title asChild>
      <Heading size="4" trim="start" {...props} ref={forwardedRef} />
    </AlertDialogPrimitive.Title>
  )
);
AlertDialogTitle.displayName = 'AlertDialogTitle';

type AlertDialogDescriptionElement = React.ElementRef<typeof Text>;
interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {}
const AlertDialogDescription = React.forwardRef<
  AlertDialogDescriptionElement,
  AlertDialogDescriptionProps
>((props, forwardedRef) => (
  <AlertDialogPrimitive.Description asChild>
    <Text size="2" {...props} ref={forwardedRef} />
  </AlertDialogPrimitive.Description>
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

type AlertDialogActionElement = React.ElementRef<typeof AlertDialogPrimitive.Action>;
interface AlertDialogActionProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>, 'asChild'> {}
const AlertDialogAction = React.forwardRef<AlertDialogActionElement, AlertDialogActionProps>(
  (props, forwardedRef) => <AlertDialogPrimitive.Action {...props} ref={forwardedRef} asChild />
);
AlertDialogAction.displayName = 'AlertDialogAction';

type AlertDialogCancelElement = React.ElementRef<typeof AlertDialogPrimitive.Cancel>;
interface AlertDialogCancelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>, 'asChild'> {}
const AlertDialogCancel = React.forwardRef<AlertDialogCancelElement, AlertDialogCancelProps>(
  (props, forwardedRef) => <AlertDialogPrimitive.Cancel {...props} ref={forwardedRef} asChild />
);
AlertDialogCancel.displayName = 'AlertDialogCancel';

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
};
