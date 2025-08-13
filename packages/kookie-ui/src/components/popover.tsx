import * as React from 'react';
import classNames from 'classnames';
import { Popover as PopoverPrimitive } from 'radix-ui';

import { extractProps } from '../helpers/extract-props.js';
import { requireReactElement } from '../helpers/require-react-element.js';
import { popoverContentPropDefs } from './popover.props.js';
import { Theme } from './theme.js';
import { useThemeContext } from './theme.js';

import type { PopoverContentOwnProps } from './popover.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

// ---------------------------------------------
// Popover Content Context
// ---------------------------------------------
type PopoverContentContextValue = {
  /** Ref to the Popover.Content DOM node */
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  /** Update content's toolbar offset variable and presence flag */
  setToolbarOffset: (offsetPx: number) => void;
  /** Wire up aria-labelledby for toolbar title */
  setLabelId: (id: string | undefined) => void;
};

const PopoverContentContext = React.createContext<PopoverContentContextValue | null>(null);
const usePopoverContentContext = (caller: string) => {
  const ctx = React.useContext(PopoverContentContext);
  if (!ctx) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`${caller} must be used within Popover.Content`);
    }
  }
  return ctx;
};

interface PopoverRootProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {}
const PopoverRoot: React.FC<PopoverRootProps> = (props: PopoverRootProps) => (
  <PopoverPrimitive.Root {...props} />
);
PopoverRoot.displayName = 'Popover.Root';

type PopoverTriggerElement = React.ElementRef<typeof PopoverPrimitive.Trigger>;
interface PopoverTriggerProps
  extends ComponentPropsWithout<typeof PopoverPrimitive.Trigger, RemovedProps> {}
const PopoverTrigger = React.forwardRef<PopoverTriggerElement, PopoverTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Trigger {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </PopoverPrimitive.Trigger>
  ),
);
PopoverTrigger.displayName = 'Popover.Trigger';

type PopoverContentElement = React.ElementRef<typeof PopoverPrimitive.Content>;
interface PopoverContentProps
  extends ComponentPropsWithout<typeof PopoverPrimitive.Content, RemovedProps>,
    PopoverContentOwnProps {
  container?: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Portal>['container'];
}
const PopoverContent = React.forwardRef<PopoverContentElement, PopoverContentProps>(
  (props, forwardedRef) => {
    const themeContext = useThemeContext();
    const panelBackground = props.panelBackground ?? themeContext.panelBackground;
    const {
      className,
      forceMount,
      container,
      panelBackground: _,
      ...contentProps
    } = extractProps(props, popoverContentPropDefs);

    // Manage refs (we need the DOM node to apply CSS variables)
    const contentRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef],
    );

    const [labelId, setLabelId] = React.useState<string | undefined>(undefined);

    const setToolbarOffset = React.useCallback((offsetPx: number) => {
      const el = contentRef.current;
      if (!el) return;
      if (offsetPx > 0) {
        el.style.setProperty('--popover-toolbar-offset', `${offsetPx}px`);
        el.setAttribute('data-has-toolbar', 'true');
      } else {
        el.style.removeProperty('--popover-toolbar-offset');
        el.removeAttribute('data-has-toolbar');
      }
    }, []);

    return (
      <PopoverPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={8}
            collisionPadding={10}
            {...contentProps}
            ref={combinedRef}
            aria-labelledby={labelId}
            data-panel-background={panelBackground}
            className={classNames('rt-PopperContent', 'rt-PopoverContent', className)}
          >
            <PopoverContentContext.Provider value={{ contentRef, setToolbarOffset, setLabelId }}>
              {props.children}
            </PopoverContentContext.Provider>
          </PopoverPrimitive.Content>
        </Theme>
      </PopoverPrimitive.Portal>
    );
  },
);
PopoverContent.displayName = 'Popover.Content';

type PopoverCloseElement = React.ElementRef<typeof PopoverPrimitive.Close>;
interface PopoverCloseProps
  extends ComponentPropsWithout<typeof PopoverPrimitive.Close, RemovedProps> {}
const PopoverClose = React.forwardRef<PopoverCloseElement, PopoverCloseProps>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Close {...props} ref={forwardedRef} asChild>
      {requireReactElement(children)}
    </PopoverPrimitive.Close>
  ),
);
PopoverClose.displayName = 'Popover.Close';

type PopoverAnchorElement = React.ElementRef<typeof PopoverPrimitive.Anchor>;
interface PopoverAnchorProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor> {}
const PopoverAnchor = React.forwardRef<PopoverAnchorElement, PopoverAnchorProps>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Anchor {...props} ref={forwardedRef} />
  ),
);

PopoverAnchor.displayName = 'Popover.Anchor';

// ---------------------------------------------
// Toolbar (Popover-only)
// ---------------------------------------------

type PopoverToolbarElement = HTMLDivElement;
type PopoverToolbarProps = React.ComponentPropsWithoutRef<'div'>;

const PopoverToolbarBase = React.forwardRef<PopoverToolbarElement, PopoverToolbarProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const ctx = usePopoverContentContext('Popover.Toolbar');

    const localRef = React.useRef<HTMLDivElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef)
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [forwardedRef],
    );

    React.useEffect(() => {
      if (!ctx || !localRef.current) return;
      const el = localRef.current;
      const update = () => {
        const height = el.getBoundingClientRect().height;
        ctx.setToolbarOffset(height);
      };
      update();
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => {
        ro.disconnect();
        ctx.setToolbarOffset(0);
      };
    }, [ctx]);

    return (
      <div {...props} ref={setRefs} className={classNames('rt-PopoverToolbar', className)}>
        {children}
      </div>
    );
  },
);
(PopoverToolbarBase as any).displayName = 'Popover.Toolbar';

type SectionProps = React.ComponentPropsWithoutRef<'div'>;

const PopoverToolbarLeft = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={classNames('rt-PopoverToolbarSection', 'rt-PopoverToolbarLeft', className)}
    />
  ),
);
PopoverToolbarLeft.displayName = 'Popover.Toolbar.Left';

const PopoverToolbarCenter = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={classNames('rt-PopoverToolbarSection', 'rt-PopoverToolbarCenter', className)}
    />
  ),
);
PopoverToolbarCenter.displayName = 'Popover.Toolbar.Center';

const PopoverToolbarRight = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={classNames('rt-PopoverToolbarSection', 'rt-PopoverToolbarRight', className)}
    />
  ),
);
PopoverToolbarRight.displayName = 'Popover.Toolbar.Right';

type TitleProps = React.ComponentPropsWithoutRef<'span'>;
const PopoverToolbarTitle = React.forwardRef<HTMLSpanElement, TitleProps>(
  ({ className, id: idProp, ...props }, ref) => {
    const ctx = usePopoverContentContext('Popover.Toolbar.Title');
    const reactId = React.useId();
    const id = idProp ?? `rt-popover-toolbar-title-${reactId}`;
    React.useEffect(() => {
      ctx?.setLabelId(id);
      return () => ctx?.setLabelId(undefined);
    }, [ctx, id]);
    return (
      <span
        {...props}
        id={id}
        ref={ref}
        className={classNames('rt-PopoverToolbarTitle', className)}
      />
    );
  },
);
PopoverToolbarTitle.displayName = 'Popover.Toolbar.Title';

type PopoverToolbarComponent = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PopoverToolbarProps> & React.RefAttributes<HTMLDivElement>
> & {
  Left: typeof PopoverToolbarLeft;
  Center: typeof PopoverToolbarCenter;
  Right: typeof PopoverToolbarRight;
  Title: typeof PopoverToolbarTitle;
};

const PopoverToolbar = Object.assign(PopoverToolbarBase, {
  Left: PopoverToolbarLeft,
  Center: PopoverToolbarCenter,
  Right: PopoverToolbarRight,
  Title: PopoverToolbarTitle,
}) as PopoverToolbarComponent;

export {
  PopoverRoot as Root,
  PopoverContent as Content,
  PopoverTrigger as Trigger,
  PopoverClose as Close,
  PopoverAnchor as Anchor,
  PopoverToolbar as Toolbar,
};
export type {
  PopoverRootProps as RootProps,
  PopoverContentProps as ContentProps,
  PopoverTriggerProps as TriggerProps,
  PopoverCloseProps as CloseProps,
  PopoverAnchorProps as AnchorProps,
};
