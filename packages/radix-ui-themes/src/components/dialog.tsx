'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from 'classnames';
import * as React from 'react';
import { Heading } from './heading';
import { Text } from './text';

interface DialogRootProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}
const DialogRoot = (props: DialogRootProps) => <DialogPrimitive.Root {...props} />;
DialogRoot.displayName = 'DialogRoot';

type DialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
interface DialogTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>, 'asChild'> {}
const DialogTrigger = React.forwardRef<DialogTriggerElement, DialogTriggerProps>(
  (props, forwardedRef) => <DialogPrimitive.Trigger {...props} ref={forwardedRef} asChild />
);
DialogTrigger.displayName = 'DialogTrigger';

type DialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
interface DialogContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'asChild'> {}
const DialogContent = React.forwardRef<DialogContentElement, DialogContentProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="rui-DialogOverlay">
        <DialogPrimitive.Content
          {...props}
          ref={forwardedRef}
          className={classNames('rui-DialogContent', props.className)}
        />
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  )
);
DialogContent.displayName = 'DialogContent';

type DialogTitleElement = React.ElementRef<typeof Heading>;
interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof Heading> {}
const DialogTitle = React.forwardRef<DialogTitleElement, DialogTitleProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Title asChild>
      <Heading size="4" trim="start" {...props} ref={forwardedRef} />
    </DialogPrimitive.Title>
  )
);
DialogTitle.displayName = 'DialogTitle';

type DialogDescriptionElement = React.ElementRef<typeof Text>;
interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {}
const DialogDescription = React.forwardRef<DialogDescriptionElement, DialogDescriptionProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Description asChild>
      <Text size="2" {...props} ref={forwardedRef} />
    </DialogPrimitive.Description>
  )
);
DialogDescription.displayName = 'DialogDescription';

type DialogCloseElement = React.ElementRef<typeof DialogPrimitive.Close>;
interface DialogCloseProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>, 'asChild'> {}
const DialogClose = React.forwardRef<DialogCloseElement, DialogCloseProps>(
  (props, forwardedRef) => <DialogPrimitive.Close {...props} ref={forwardedRef} asChild />
);
DialogClose.displayName = 'DialogClose';

const Dialog = Object.assign(
  {},
  {
    Root: DialogRoot,
    Trigger: DialogTrigger,
    Content: DialogContent,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
  }
);

export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
