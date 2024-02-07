'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { dialogContentPropDefs } from './dialog.props.js';
import { extractProps, requireReactElement } from '../helpers/index.js';
import { Heading } from './heading.js';
import { Text } from './text.js';
import { Theme } from './theme.js';

import type { ComponentPropsAs, ComponentPropsWithoutColor } from '../helpers/index.js';
import type { GetPropDefTypes } from '../props/index.js';

interface DialogRootProps
  extends Omit<ComponentPropsWithoutColor<typeof DialogPrimitive.Root>, 'modal'> {}
const DialogRoot: React.FC<DialogRootProps> = (props) => <DialogPrimitive.Root {...props} modal />;
DialogRoot.displayName = 'DialogRoot';

type DialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
interface DialogTriggerProps
  extends Omit<ComponentPropsWithoutColor<typeof DialogPrimitive.Trigger>, 'asChild'> {}
const DialogTrigger = React.forwardRef<DialogTriggerElement, DialogTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </DialogPrimitive.Trigger>
  )
);
DialogTrigger.displayName = 'DialogTrigger';

type DialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogContentOwnProps = GetPropDefTypes<typeof dialogContentPropDefs>;
interface DialogContentProps
  extends ComponentPropsWithoutColor<typeof DialogPrimitive.Content>,
    DialogContentOwnProps {
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>['container'];
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
DialogContent.displayName = 'DialogContent';

type DialogTitleElement = React.ElementRef<typeof Heading>;
type DialogTitleProps = Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'asChild'>;
const DialogTitle = React.forwardRef<DialogTitleElement, DialogTitleProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Title asChild>
      <Heading size="5" mb="3" trim="start" {...props} asChild={false} ref={forwardedRef} />
    </DialogPrimitive.Title>
  )
);
DialogTitle.displayName = 'DialogTitle';

type DialogDescriptionElement = HTMLParagraphElement;
type DialogDescriptionProps = ComponentPropsAs<typeof Text, 'p'>;
const DialogDescription = React.forwardRef<DialogDescriptionElement, DialogDescriptionProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Description asChild>
      <Text as="p" size="3" {...props} asChild={false} ref={forwardedRef} />
    </DialogPrimitive.Description>
  )
);
DialogDescription.displayName = 'DialogDescription';

type DialogCloseElement = React.ElementRef<typeof DialogPrimitive.Close>;
interface DialogCloseProps
  extends Omit<ComponentPropsWithoutColor<typeof DialogPrimitive.Close>, 'asChild'> {}
const DialogClose = React.forwardRef<DialogCloseElement, DialogCloseProps>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Close {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </DialogPrimitive.Close>
  )
);
DialogClose.displayName = 'DialogClose';

export { DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose };

export type {
  DialogRootProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
};
