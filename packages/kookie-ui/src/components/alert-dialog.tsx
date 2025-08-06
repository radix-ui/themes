import * as React from 'react';
import classNames from 'classnames';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import { alertDialogContentPropDefs } from './alert-dialog.props.js';
import { Heading } from './heading.js';
import { Text } from './text.js';
import { Theme } from './theme.js';
import { extractProps } from '../helpers/extract-props.js';
import { requireReactElement } from '../helpers/require-react-element.js';

import type { AlertDialogContentOwnProps } from './alert-dialog.props.js';
import type {
  ComponentPropsWithout,
  RemovedProps,
  ComponentPropsAs,
} from '../helpers/component-props.js';

interface AlertDialogRootProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root> {}
const AlertDialogRoot: React.FC<AlertDialogRootProps> = (props) => (
  <AlertDialogPrimitive.Root {...props} />
);
AlertDialogRoot.displayName = 'AlertDialog.Root';

type AlertDialogTriggerElement = React.ElementRef<typeof AlertDialogPrimitive.Trigger>;
interface AlertDialogTriggerProps
  extends ComponentPropsWithout<typeof AlertDialogPrimitive.Trigger, RemovedProps> {}
const AlertDialogTrigger = React.forwardRef<AlertDialogTriggerElement, AlertDialogTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <AlertDialogPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </AlertDialogPrimitive.Trigger>
  ),
);
AlertDialogTrigger.displayName = 'AlertDialog.Trigger';

type AlertDialogContentElement = React.ElementRef<typeof AlertDialogPrimitive.Content>;
interface AlertDialogContentProps
  extends ComponentPropsWithout<typeof AlertDialogPrimitive.Content, RemovedProps>,
    AlertDialogContentOwnProps {
  container?: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Portal>['container'];
}
const AlertDialogContent = React.forwardRef<AlertDialogContentElement, AlertDialogContentProps>(
  ({ align, ...props }, forwardedRef) => {
    const {
      align: alignPropDef,
      panelBackground: panelBackgroundPropDef,
      material: materialPropDef,
      ...propDefs
    } = alertDialogContentPropDefs;

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
      <AlertDialogPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <AlertDialogPrimitive.Overlay className="rt-BaseDialogOverlay rt-AlertDialogOverlay">
            <div className="rt-BaseDialogScroll rt-AlertDialogScroll">
              <div
                className={`rt-BaseDialogScrollPadding rt-AlertDialogScrollPadding ${alignClassName}`}
              >
                <AlertDialogPrimitive.Content
                  {...contentProps}
                  ref={combinedRef}
                  className={classNames('rt-BaseDialogContent', 'rt-AlertDialogContent', className)}
                  data-material={materialValue}
                  data-panel-background={materialValue}
                  tabIndex={-1}
                  role="alertdialog"
                  aria-modal="true"
                  aria-describedby="alert-dialog-description"
                />
                {/* ARIA live region for screen reader announcements */}
                <div
                  aria-live="assertive"
                  aria-atomic="true"
                  className="rt-sr-only"
                  id="alert-dialog-announcement"
                />
              </div>
            </div>
          </AlertDialogPrimitive.Overlay>
        </Theme>
      </AlertDialogPrimitive.Portal>
    );
  },
);
AlertDialogContent.displayName = 'AlertDialog.Content';

type AlertDialogTitleElement = React.ElementRef<typeof Heading>;
type AlertDialogTitleProps = ComponentPropsWithout<typeof Heading, 'asChild'>;
const AlertDialogTitle = React.forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(
  (props, forwardedRef) => (
    <AlertDialogPrimitive.Title asChild>
      <Heading size="5" mb="3" trim="start" {...props} asChild={false} ref={forwardedRef} />
    </AlertDialogPrimitive.Title>
  ),
);
AlertDialogTitle.displayName = 'AlertDialog.Title';

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
AlertDialogDescription.displayName = 'AlertDialog.Description';

type AlertDialogActionElement = React.ElementRef<typeof AlertDialogPrimitive.Action>;
interface AlertDialogActionProps
  extends ComponentPropsWithout<typeof AlertDialogPrimitive.Action, RemovedProps> {}
const AlertDialogAction = React.forwardRef<AlertDialogActionElement, AlertDialogActionProps>(
  ({ children, ...props }, forwardedRef) => (
    <AlertDialogPrimitive.Action {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </AlertDialogPrimitive.Action>
  ),
);
AlertDialogAction.displayName = 'AlertDialog.Action';

type AlertDialogCancelElement = React.ElementRef<typeof AlertDialogPrimitive.Cancel>;
interface AlertDialogCancelProps
  extends ComponentPropsWithout<typeof AlertDialogPrimitive.Cancel, RemovedProps> {}
const AlertDialogCancel = React.forwardRef<AlertDialogCancelElement, AlertDialogCancelProps>(
  ({ children, ...props }, forwardedRef) => (
    <AlertDialogPrimitive.Cancel {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </AlertDialogPrimitive.Cancel>
  ),
);
AlertDialogCancel.displayName = 'AlertDialog.Cancel';

export {
  AlertDialogRoot as Root,
  AlertDialogTrigger as Trigger,
  AlertDialogContent as Content,
  AlertDialogTitle as Title,
  AlertDialogDescription as Description,
  AlertDialogAction as Action,
  AlertDialogCancel as Cancel,
};

export type {
  AlertDialogRootProps as RootProps,
  AlertDialogTriggerProps as TriggerProps,
  AlertDialogContentProps as ContentProps,
  AlertDialogTitleProps as TitleProps,
  AlertDialogDescriptionProps as DescriptionProps,
  AlertDialogActionProps as ActionProps,
  AlertDialogCancelProps as CancelProps,
};
