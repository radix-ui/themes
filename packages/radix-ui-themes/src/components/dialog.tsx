'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { dialogContentPropDefs } from './dialog.props.js';
import { extractProps, requireReactElement } from '../helpers/index.js';
import { Heading } from './heading.js';
import { Text } from './text.js';
import { Theme } from './theme.js';

import type { ComponentPropsAs, ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { DialogContentOwnProps } from '../props/index.js';

interface DialogRootProps extends ComponentPropsWithout<typeof DialogPrimitive.Root, 'modal'> {}
const DialogRoot: React.FC<DialogRootProps> = (props) => <DialogPrimitive.Root {...props} modal />;
DialogRoot.displayName = 'Dialog.Root';

type DialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
interface DialogTriggerProps
  extends ComponentPropsWithout<typeof DialogPrimitive.Trigger, RemovedProps> {}
const DialogTrigger = React.forwardRef<DialogTriggerElement, DialogTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </DialogPrimitive.Trigger>
  )
);
DialogTrigger.displayName = 'Dialog.Trigger';

type DialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
interface DialogContentProps
  extends ComponentPropsWithout<typeof DialogPrimitive.Content, RemovedProps>,
    DialogContentOwnProps {
  container?: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>['container'];
}
const DialogContent = React.forwardRef<DialogContentElement, DialogContentProps>(
  (props, forwardedRef) => {
    const { className, forceMount, container, ...contentProps } = extractProps(
      props,
      dialogContentPropDefs
    );
    return (
      <DialogPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <DialogPrimitive.Overlay className="rt-BaseDialogOverlay rt-DialogOverlay">
            <div className="rt-BaseDialogScroll rt-DialogScroll">
              <div className="rt-BaseDialogScrollPadding rt-DialogScrollPadding">
                <DialogPrimitive.Content
                  {...contentProps}
                  ref={forwardedRef}
                  className={classNames('rt-BaseDialogContent', 'rt-DialogContent', className)}
                />
              </div>
            </div>
          </DialogPrimitive.Overlay>
        </Theme>
      </DialogPrimitive.Portal>
    );
  }
);
DialogContent.displayName = 'Dialog.Content';

type DialogTitleElement = React.ElementRef<typeof Heading>;
type DialogTitleProps = ComponentPropsWithout<typeof Heading, 'asChild'>;
const DialogTitle = React.forwardRef<DialogTitleElement, DialogTitleProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Title asChild>
      <Heading size="5" mb="3" trim="start" {...props} asChild={false} ref={forwardedRef} />
    </DialogPrimitive.Title>
  )
);
DialogTitle.displayName = 'Dialog.Title';

type DialogDescriptionElement = HTMLParagraphElement;
type DialogDescriptionProps = ComponentPropsAs<typeof Text, 'p'>;
const DialogDescription = React.forwardRef<DialogDescriptionElement, DialogDescriptionProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Description asChild>
      <Text as="p" size="3" {...props} asChild={false} ref={forwardedRef} />
    </DialogPrimitive.Description>
  )
);
DialogDescription.displayName = 'Dialog.Description';

type DialogCloseElement = React.ElementRef<typeof DialogPrimitive.Close>;
interface DialogCloseProps
  extends ComponentPropsWithout<typeof DialogPrimitive.Close, RemovedProps> {}
const DialogClose = React.forwardRef<DialogCloseElement, DialogCloseProps>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Close {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </DialogPrimitive.Close>
  )
);
DialogClose.displayName = 'Dialog.Close';

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogContent as Content,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogClose as Close,
};

export type {
  DialogRootProps as RootProps,
  DialogTriggerProps as TriggerProps,
  DialogContentProps as ContentProps,
  DialogTitleProps as TitleProps,
  DialogDescriptionProps as DescriptionProps,
  DialogCloseProps as CloseProps,
};
