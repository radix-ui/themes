'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { alertDialogContentPropDefs } from './alert-dialog.props';
import { withBreakpoints } from '../helpers';
import { Heading } from './heading';
import { Text } from './text';
import { Theme } from '../theme';

import type { ExtractPropsForTag, GetPropDefTypes } from '../helpers';

interface AlertDialogRootProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root> {}
const AlertDialogRoot: React.FC<AlertDialogRootProps> = (props) => (
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
type AlertDialogContentOwnProps = GetPropDefTypes<typeof alertDialogContentPropDefs>;
interface AlertDialogContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>, 'asChild'>,
    AlertDialogContentOwnProps {
  container?: React.ComponentProps<typeof AlertDialogPrimitive.Portal>['container'];
}
const AlertDialogContent = React.forwardRef<AlertDialogContentElement, AlertDialogContentProps>(
  (props, forwardedRef) => {
    const {
      className,
      forceMount,
      container,
      size = alertDialogContentPropDefs.size.default,
      ...contentProps
    } = props;
    return (
      <AlertDialogPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <AlertDialogPrimitive.Overlay className="rt-DialogOverlay rt-AlertDialogOverlay">
            <AlertDialogPrimitive.Content
              {...contentProps}
              ref={forwardedRef}
              className={classNames(
                'rt-DialogContent',
                'rt-AlertDialogContent',
                className,
                withBreakpoints(size, 'rt-r-size')
              )}
            />
          </AlertDialogPrimitive.Overlay>
        </Theme>
      </AlertDialogPrimitive.Portal>
    );
  }
);
AlertDialogContent.displayName = 'AlertDialogContent';

type AlertDialogTitleElement = React.ElementRef<typeof Heading>;
type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof Heading>;
const AlertDialogTitle = React.forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(
  (props, forwardedRef) => (
    <AlertDialogPrimitive.Title asChild>
      <Heading size="5" mb="3" trim="start" {...props} ref={forwardedRef} />
    </AlertDialogPrimitive.Title>
  )
);
AlertDialogTitle.displayName = 'AlertDialogTitle';

type AlertDialogDescriptionElement = HTMLParagraphElement;
type AlertDialogDescriptionProps = ExtractPropsForTag<typeof Text, 'p'>;
const AlertDialogDescription = React.forwardRef<
  AlertDialogDescriptionElement,
  AlertDialogDescriptionProps
>((props, forwardedRef) => (
  <AlertDialogPrimitive.Description asChild>
    <Text as="p" size="3" {...props} ref={forwardedRef} />
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

const AlertDialog = Object.assign(
  {},
  {
    Root: AlertDialogRoot,
    Trigger: AlertDialogTrigger,
    Content: AlertDialogContent,
    Title: AlertDialogTitle,
    Description: AlertDialogDescription,
    Action: AlertDialogAction,
    Cancel: AlertDialogCancel,
  }
);

export {
  AlertDialog,
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
