import * as React from 'react';
import classNames from 'classnames';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { dialogContentPropDefs } from './dialog.props.js';
import { Heading } from './heading.js';
import { Text } from './text.js';
import { Theme } from './theme.js';
import { extractProps } from '../helpers/extract-props.js';
import { requireReactElement } from '../helpers/require-react-element.js';

import type { DialogContentOwnProps } from './dialog.props.js';
import type {
  ComponentPropsWithout,
  RemovedProps,
  ComponentPropsAs,
} from '../helpers/component-props.js';

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
  ),
);
DialogTrigger.displayName = 'Dialog.Trigger';

type DialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
interface DialogContentProps
  extends ComponentPropsWithout<typeof DialogPrimitive.Content, RemovedProps>,
    DialogContentOwnProps {
  container?: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>['container'];
}
const DialogContent = React.forwardRef<DialogContentElement, DialogContentProps>(
  ({ align, ...props }, forwardedRef) => {
    const {
      align: alignPropDef,
      panelBackground: panelBackgroundPropDef,
      material: materialPropDef,
      ...propDefs
    } = dialogContentPropDefs;

    const { className: alignClassName } = extractProps({ align }, { align: alignPropDef });

    // Extract panelBackground and material from props
    const { panelBackground: extractedPanelBackground } = extractProps(
      { panelBackground: props.panelBackground },
      { panelBackground: panelBackgroundPropDef },
    );

    const { material: extractedMaterial } = extractProps(
      { material: props.material },
      { material: materialPropDef },
    );

    // Handle material prop with panelBackground fallback
    const materialValue = React.useMemo(() => {
      if (extractedMaterial !== undefined) {
        console.warn(
          'Warning: The `panelBackground` prop is deprecated and will be removed in a future version. Use `material` prop instead.',
        );
      }
      return extractedMaterial ?? extractedPanelBackground;
    }, [extractedMaterial, extractedPanelBackground]);

    const {
      className,
      forceMount,
      container,
      panelBackground: _,
      material: __,
      ...contentProps
    } = extractProps(props, propDefs);

    // Focus management
    const contentRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = React.useMemo(
      () => (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    // Focus trap effect
    React.useEffect(() => {
      // SSR safety - only run on client
      if (typeof window === 'undefined') return;

      const content = contentRef.current;
      if (!content) return;

      const focusableElements = content.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      content.addEventListener('keydown', handleKeyDown);

      // Focus first element when dialog opens
      firstElement.focus();

      return () => {
        content.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    return (
      <DialogPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <DialogPrimitive.Overlay className="rt-BaseDialogOverlay rt-DialogOverlay">
            <div className="rt-BaseDialogScroll rt-DialogScroll">
              <div
                className={`rt-BaseDialogScrollPadding rt-DialogScrollPadding ${alignClassName}`}
              >
                <DialogPrimitive.Content
                  {...contentProps}
                  ref={combinedRef}
                  className={classNames('rt-BaseDialogContent', 'rt-DialogContent', className)}
                  data-material={materialValue}
                  data-panel-background={materialValue}
                  tabIndex={-1}
                  role="dialog"
                  aria-modal="true"
                />
                {/* ARIA live region for screen reader announcements */}
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="rt-sr-only"
                  id="dialog-announcement"
                />
              </div>
            </div>
          </DialogPrimitive.Overlay>
        </Theme>
      </DialogPrimitive.Portal>
    );
  },
);
DialogContent.displayName = 'Dialog.Content';

type DialogTitleElement = React.ElementRef<typeof Heading>;
type DialogTitleProps = ComponentPropsWithout<typeof Heading, 'asChild'>;
const DialogTitle = React.forwardRef<DialogTitleElement, DialogTitleProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Title asChild>
      <Heading size="5" mb="3" trim="start" {...props} asChild={false} ref={forwardedRef} />
    </DialogPrimitive.Title>
  ),
);
DialogTitle.displayName = 'Dialog.Title';

type DialogDescriptionElement = HTMLParagraphElement;
type DialogDescriptionProps = ComponentPropsAs<typeof Text, 'p'>;
const DialogDescription = React.forwardRef<DialogDescriptionElement, DialogDescriptionProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Description asChild>
      <Text as="p" size="3" {...props} asChild={false} ref={forwardedRef} />
    </DialogPrimitive.Description>
  ),
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
  ),
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
