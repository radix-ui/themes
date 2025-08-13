import * as React from 'react';
import classNames from 'classnames';

import { IconButton, type IconButtonProps } from './icon-button.js';
import { Flex } from './flex.js';
import { Slot } from './slot.js';
import { Card } from './card.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

// Avoid SSR warnings by using an isomorphic layout effect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

type ExpandOn = 'none' | 'focus' | 'overflow' | 'both';
type SendMode = 'always' | 'whenDirty' | 'never';

interface ChatbarContextValue {
  open: boolean;
  setOpen(next: boolean): void;
  isOpenControlled: boolean;

  value: string;
  setValue(next: string): void;
  isValueControlled: boolean;

  size: '1' | '2' | '3';
  expandOn: ExpandOn;
  minLines: number;
  maxLines: number;
  sendMode: SendMode;
  disabled?: boolean;
  readOnly?: boolean;

  onSend?: (value: string) => void;

  rootRef: React.RefObject<HTMLDivElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const ChatbarContext = React.createContext<ChatbarContextValue | null>(null);
const useChatbarContext = () => {
  const ctx = React.useContext(ChatbarContext);
  if (!ctx) throw new Error('Chatbar context not found. Wrap parts in <Chatbar.Root>.');
  return ctx;
};

interface ChatbarRootBaseProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  expandOn?: ExpandOn;

  /** Minimum number of lines in compact state (default: 1) */
  minLines?: number;
  /** Maximum number of lines before scrolling (default: 6) */
  maxLines?: number;

  sendMode?: SendMode;

  disabled?: boolean;
  readOnly?: boolean;

  onSend?: (value: string) => void;

  size?: '1' | '2' | '3';
  variant?: 'surface' | 'outline' | 'classic' | 'ghost' | 'soft';

  width?: React.CSSProperties['width'];
  maxWidth?: React.CSSProperties['maxWidth'];
  asChild?: boolean;
}

type RootElement = React.ElementRef<'div'>;
/**
 * Chatbar container and state provider.
 *
 * Behavior
 * - Supports controlled and uncontrolled `value` and `open` states via props.
 * - Provides context to subcomponents like `Textarea`, `Row`, and `Send`.
 * - Exposes `data-state`, `data-disabled`, and `data-readonly` attributes for styling.
 * - Sets `aria-expanded` to reflect open/closed state for assistive technologies.
 *
 * Accessibility
 * - Consumers should label the `Textarea` via `aria-label`/`aria-labelledby`.
 * - `aria-expanded` on the root reflects the disclosure state of the input area.
 */
interface RootProps
  extends ComponentPropsWithout<'div', RemovedProps | 'onSubmit'>,
    ChatbarRootBaseProps {}

const Root = React.forwardRef<RootElement, RootProps>((props, forwardedRef) => {
  const {
    className,
    style,
    children,
    value: valueProp,
    defaultValue = '',
    onValueChange: onValueChangeProp,
    open: openProp,
    defaultOpen = false,
    onOpenChange: onOpenChangeProp,
    expandOn = 'both',
    minLines = 1,
    maxLines = 6,
    sendMode = 'whenDirty',
    disabled,
    readOnly,
    onSend,
    size = '2',
    variant,
    width,
    maxWidth,
    asChild,
    ...divProps
  } = props;

  const isValueControlled = valueProp != null;
  const [valueUncontrolled, setValueUncontrolled] = React.useState<string>(defaultValue);
  const value = isValueControlled ? (valueProp as string) : valueUncontrolled;

  const isOpenControlled = openProp != null;
  const [openUncontrolled, setOpenUncontrolled] = React.useState<boolean>(defaultOpen);
  const open = isOpenControlled ? (openProp as boolean) : openUncontrolled;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const Comp = asChild ? Slot : ('div' as any);

  const handleBlurCapture = React.useCallback(
    (event: React.FocusEvent) => {
      const nextTarget = event.relatedTarget as Node | null;
      const rootEl = rootRef.current;
      if (!rootEl) return;
      // If focus remains within root, ignore
      if (nextTarget && rootEl.contains(nextTarget)) return;
      // Collapse when leaving the root if the value is empty
      if ((value?.trim?.() ?? '').length === 0) {
        if (!isOpenControlled) setOpenUncontrolled(false);
        onOpenChangeProp?.(false);
      }
    },
    [isOpenControlled, onOpenChangeProp, value],
  );

  return (
    <ChatbarContext.Provider
      value={{
        open,
        setOpen: (next) => {
          if (!isOpenControlled) setOpenUncontrolled(next);
          onOpenChangeProp?.(next);
        },
        isOpenControlled,
        value,
        setValue: (next) => {
          if (!isValueControlled) setValueUncontrolled(next);
          onValueChangeProp?.(next);
        },
        isValueControlled,
        size,
        expandOn,
        minLines,
        maxLines,
        sendMode,
        disabled,
        readOnly,
        onSend,
        rootRef,
        textareaRef,
      }}
    >
      <Comp
        {...divProps}
        ref={(node: HTMLDivElement) => {
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={classNames('rt-ChatbarRoot', `rt-r-size-${size}`, className)}
        style={{ position: 'relative', width, maxWidth, ...style }}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        data-readonly={readOnly ? '' : undefined}
        aria-expanded={open}
        onBlurCapture={handleBlurCapture}
      >
        <Card className="rt-ChatbarCard" size={size as any} variant={variant as any}>
          <div className="rt-ChatbarGrid">{children}</div>
        </Card>
      </Comp>
    </ChatbarContext.Provider>
  );
});
Root.displayName = 'Chatbar.Root';

interface TextareaProps extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'size'> {
  asChild?: boolean;
  /**
   * Handler for paste events. This is forwarded to the underlying <textarea>.
   */
  onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;
  /**
   * When true, pressing Enter submits via onSend (Shift+Enter inserts newline).
   * Defaults to false.
   */
  submitOnEnter?: boolean;
}

/**
 * Chatbar multi-line text input.
 *
 * Behavior
 * - Controls the Chatbar value via React onChange. We intentionally do not
 *   update state in onInput to avoid duplicate updates per keystroke.
 * - Auto-resizes between minLines and maxLines using layout measurements.
 * - When expandOn is `overflow` or `both`, the Chatbar opens as soon as the
 *   content exceeds the compact height.
 * - Height recalculations occur on change, paste, and whenever `value` or `open`
 *   changes via an isomorphic layout effect to avoid SSR warnings.
 *
 * Accessibility
 * - Consumers should provide labeling via aria-label or aria-labelledby
 *   on this component, as no implicit label is rendered.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, forwardedRef) => {
  const {
    className,
    style,
    asChild,
    onFocus,
    onInput,
    onChange,
    onPaste,
    onKeyDown,
    submitOnEnter = false,
    rows,
    ...textareaProps
  } = props;
  const ctx = useChatbarContext();
  const {
    open,
    minLines,
    maxLines,
    expandOn,
    disabled,
    readOnly,
    setOpen,
    setValue,
    textareaRef,
    value,
    isValueControlled,
    sendMode,
    size,
  } = ctx;

  // Cached metrics to avoid repeated getComputedStyle calls
  const lineHeightRef = React.useRef<number>(0);
  const paddingRef = React.useRef<number>(0);
  const compactHeightRef = React.useRef<number>(0);

  const recomputeMetrics = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const computedStyle = window.getComputedStyle(el);
    const lineHeight = parseFloat(computedStyle.lineHeight) || 20;
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
    lineHeightRef.current = lineHeight;
    paddingRef.current = paddingTop + paddingBottom;
    compactHeightRef.current = Math.ceil(1 * lineHeight) + paddingTop + paddingBottom;
  }, [textareaRef]);

  // Auto-resize logic - optimized for fixed widths
  const updateHeight = React.useCallback(
    (forceOpen?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.style.height = 'auto';

      if (lineHeightRef.current === 0) {
        recomputeMetrics();
      }
      const lineHeight = lineHeightRef.current;
      const padding = paddingRef.current;

      const isOpen = forceOpen ?? open;
      const effectiveMinLines = isOpen ? minLines : 1;
      const effectiveMaxLines = isOpen ? maxLines : 1;

      const minHeight = Math.ceil(effectiveMinLines * lineHeight) + padding;
      const maxHeight = Math.ceil(effectiveMaxLines * lineHeight) + padding;

      const contentHeight = Math.max(textarea.scrollHeight, minHeight);
      const finalHeight = Math.min(contentHeight, maxHeight);

      textarea.style.height = `${finalHeight}px`;

      if (contentHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
        textarea.style.maxHeight = `${maxHeight}px`;
      } else {
        textarea.style.overflowY = 'hidden';
        textarea.style.maxHeight = 'none';
      }
    },
    [open, minLines, maxLines, textareaRef, recomputeMetrics],
  );

  // Update height when value or open state changes
  useIsomorphicLayoutEffect(() => {
    updateHeight();
  }, [updateHeight, value, open]);

  // Recompute metrics on mount and when size changes may affect typography
  useIsomorphicLayoutEffect(() => {
    recomputeMetrics();
    updateHeight();
  }, [recomputeMetrics, updateHeight, size]);

  // Observe responsive changes that alter line-height
  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    let prevLineHeight = lineHeightRef.current;
    const ro = new ResizeObserver(() => {
      const computedStyle = window.getComputedStyle(el);
      const lh = parseFloat(computedStyle.lineHeight) || 20;
      if (lh !== prevLineHeight) {
        prevLineHeight = lh;
        recomputeMetrics();
        requestAnimationFrame(() => updateHeight());
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [textareaRef, recomputeMetrics, updateHeight]);

  // Dev-only warning if no accessible name is provided
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const hasLabel =
      textareaProps['aria-label'] != null || textareaProps['aria-labelledby'] != null;
    if (!hasLabel) {
      // eslint-disable-next-line no-console
      console.warn(
        '[Chatbar.Textarea] Provide aria-label or aria-labelledby to ensure the control has an accessible name.',
      );
    }
    // warn only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Note: No MutationObserver is used because <textarea> value changes are not
  // reflected in DOM text nodes. Height updates are handled by effects and events.

  const handleFocus = React.useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
    (event) => {
      if (disabled || readOnly) return;
      if ((expandOn === 'focus' || expandOn === 'both') && !open) setOpen(true);
      onFocus?.(event);
    },
    [disabled, readOnly, expandOn, open, setOpen, onFocus],
  );

  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      const el = event.currentTarget;
      const nextValue = el.value;
      setValue(nextValue);

      if ((expandOn === 'overflow' || expandOn === 'both') && !open) {
        el.style.height = 'auto';

        if (compactHeightRef.current === 0) {
          recomputeMetrics();
        }
        const shouldExpand = el.scrollHeight > compactHeightRef.current + 1;
        if (shouldExpand) {
          setOpen(true);
          // Immediately size for open state to avoid 1-line + scrollbar flash
          updateHeight(true);
          requestAnimationFrame(() => updateHeight(true));
        }
      }

      // Always recalc after any input
      requestAnimationFrame(() => updateHeight());
      onChange?.(event);
    },
    [expandOn, open, setOpen, setValue, onChange, updateHeight],
  );

  const handlePaste = React.useCallback<React.ClipboardEventHandler<HTMLTextAreaElement>>(
    (event) => {
      setTimeout(() => {
        // If pasting in compact mode, force sizing as open if content overflowed
        if (!open) {
          updateHeight(true);
        } else {
          updateHeight();
        }
      }, 0);
      onPaste?.(event);
    },
    [open, updateHeight, onPaste],
  );

  const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLTextAreaElement>>(
    (event) => {
      if (!submitOnEnter) {
        onKeyDown?.(event);
        return;
      }
      if (
        event.key === 'Enter' &&
        !event.shiftKey &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.nativeEvent.isComposing
      ) {
        if (disabled || readOnly) {
          onKeyDown?.(event);
          return;
        }
        if (sendMode === 'never') {
          onKeyDown?.(event);
          return;
        }
        const trimmed = value.trim();
        if (sendMode === 'whenDirty' && trimmed.length === 0) {
          onKeyDown?.(event);
          return;
        }
        event.preventDefault();
        ctx.onSend?.(value);
        if (!isValueControlled) setValue('');
      }
      onKeyDown?.(event);
    },
    [
      submitOnEnter,
      disabled,
      readOnly,
      sendMode,
      value,
      isValueControlled,
      setValue,
      ctx,
      onKeyDown,
    ],
  );

  const Comp = asChild ? Slot : ('textarea' as any);
  return (
    <div className={classNames('rt-ChatbarField', 'rt-ChatbarTextarea', className)}>
      <Comp
        {...textareaProps}
        ref={(node: HTMLTextAreaElement) => {
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
          (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }}
        className="rt-ChatbarInput"
        value={value}
        onInput={onInput}
        onChange={handleChange}
        onFocus={handleFocus}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        readOnly={readOnly}
        rows={open ? minLines : 1}
        spellCheck={textareaProps.spellCheck ?? true}
        autoCorrect={textareaProps.autoCorrect ?? 'on'}
        style={style}
      />
    </div>
  );
});
Textarea.displayName = 'Chatbar.Textarea';

interface InlineSlotProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const InlineStart = React.forwardRef<HTMLDivElement, InlineSlotProps>((props, forwardedRef) => {
  const { children, asChild, style, className, ...divProps } = props;
  const ctx = useChatbarContext();
  if (ctx.open) return null;
  const Comp = asChild ? Slot : ('div' as any);
  return (
    <Comp
      {...divProps}
      ref={forwardedRef}
      className={classNames('rt-ChatbarInlineStart', className)}
      style={style}
    >
      {children}
    </Comp>
  );
});
InlineStart.displayName = 'Chatbar.InlineStart';

const InlineEnd = React.forwardRef<HTMLDivElement, InlineSlotProps>((props, forwardedRef) => {
  const { children, asChild, style, className, ...divProps } = props;
  const ctx = useChatbarContext();
  if (ctx.open) return null;
  const Comp = asChild ? Slot : ('div' as any);
  return (
    <Comp
      {...divProps}
      ref={forwardedRef}
      className={classNames('rt-ChatbarInlineEnd', className)}
      style={style}
    >
      {children}
    </Comp>
  );
});
InlineEnd.displayName = 'Chatbar.InlineEnd';

interface RowProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, forwardedRef) => {
  const { asChild, children, className, style, ...divProps } = props;
  const ctx = useChatbarContext();
  if (!ctx.open) return null;
  const Comp = asChild ? Slot : ('div' as any);
  return (
    <Comp
      {...divProps}
      ref={forwardedRef}
      className={classNames('rt-ChatbarRow', className)}
      style={style}
    >
      <Flex align="center" justify="between" width="100%">
        {children}
      </Flex>
    </Comp>
  );
});
Row.displayName = 'Chatbar.Row';

const RowStart = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const { className, style, ...divProps } = props;
    return (
      <div
        {...divProps}
        ref={forwardedRef}
        className={classNames('rt-ChatbarRowStart', className)}
        style={style}
      />
    );
  },
);
RowStart.displayName = 'Chatbar.RowStart';

const RowEnd = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const { className, style, ...divProps } = props;
    return (
      <div
        {...divProps}
        ref={forwardedRef}
        className={classNames('rt-ChatbarRowEnd', className)}
        style={style}
      />
    );
  },
);
RowEnd.displayName = 'Chatbar.RowEnd';

interface SendProps extends Omit<IconButtonProps, 'size'> {
  asChild?: boolean;
  clearOnSend?: boolean;
}

const Send = React.forwardRef<HTMLButtonElement, SendProps>((props, forwardedRef) => {
  const {
    asChild,
    clearOnSend = true,
    disabled,
    children,
    className,
    style,
    ...buttonProps
  } = props;
  const ctx = useChatbarContext();

  const trimmed = ctx.value.trim();
  const visible = ctx.sendMode === 'always' || (ctx.sendMode === 'whenDirty' && trimmed.length > 0);
  if (ctx.sendMode === 'never') return null;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (ctx.disabled || ctx.readOnly) return;
    ctx.onSend?.(ctx.value);
    if (clearOnSend && !ctx.isValueControlled) ctx.setValue('');
    buttonProps.onClick?.(event);
  };

  return (
    <IconButton
      {...(buttonProps as any)}
      ref={forwardedRef as any}
      size={ctx.size}
      variant={ctx.open ? 'solid' : 'ghost'}
      disabled={disabled || ctx.disabled || ctx.readOnly}
      className={classNames('rt-ChatbarSend', className)}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        ...style,
      }}
      asChild={asChild}
      onClick={handleClick}
      aria-label={buttonProps['aria-label'] ?? 'Send'}
    >
      {children ?? 'Send'}
    </IconButton>
  );
});
Send.displayName = 'Chatbar.Send';

export { Root, Textarea, InlineStart, InlineEnd, Row, RowStart, RowEnd, Send };
export type {
  RootProps as ChatbarRootProps,
  TextareaProps as ChatbarTextareaProps,
  RowProps as ChatbarRowProps,
  SendProps as ChatbarSendProps,
};
