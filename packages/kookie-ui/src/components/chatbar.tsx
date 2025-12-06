import * as React from 'react';
import classNames from 'classnames';

import { IconButton, type IconButtonProps } from './icon-button.js';
import { CloseIcon, FileTextIcon } from './icons.js';
import { Flex } from './flex.js';

import { ScrollArea } from './scroll-area.js';
import { Slot } from './slot.js';
import { Box } from './box.js';
import { Text } from './text.js';
import { useDropzone } from 'react-dropzone';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

// Avoid SSR warnings by using an isomorphic layout effect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

type ExpandOn = 'none' | 'focus' | 'overflow' | 'both';
type SendMode = 'always' | 'whenDirty' | 'never';

// Attachments
/** Status flag for attachment lifecycle. */
type AttachmentStatus = 'idle' | 'uploading' | 'error' | 'done';
/**
 * Attachment data model used by Chatbar.
 * - `file` exposes the original File object for uploads and processing.
 * - `url` is an object URL used for image previews and is revoked on removal.
 */
interface ChatbarAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  /** Original File object for uploads and processing */
  file: File;
  url?: string;
  status?: AttachmentStatus;
  progress?: number;
  meta?: Record<string, unknown>;
}

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

  // Submit returns both message and attachments
  onSubmit?: (payload: { value: string; attachments: ChatbarAttachment[] }) => void;

  rootRef: React.RefObject<HTMLDivElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;

  // Attachments state
  attachments: ChatbarAttachment[];
  setAttachments(next: ChatbarAttachment[]): void;
  isAttachmentsControlled: boolean;

  // Config
  accept?: string | string[];
  multiple: boolean;
  maxAttachments?: number;
  maxFileSize?: number;
  paste: boolean;
  pasteAccept?: string | string[];
  clearOnSubmit: boolean;

  // Dropzone
  dropzone: boolean;

  // Events
  onAttachmentReject?: (rejections: { file: File; reason: 'type' | 'size' | 'count' }[]) => void;

  // Helpers
  appendFiles(files: File[]): void;
  appendFilesFromPaste(files: File[]): void;

  // Guards
  fileDialogOpenRef: React.MutableRefObject<boolean>;
}

const ChatbarContext = React.createContext<ChatbarContextValue | null>(null);
const useChatbarContext = () => {
  const ctx = React.useContext(ChatbarContext);
  if (!ctx) throw new Error('Chatbar context not found. Wrap parts in <Chatbar.Root>.');
  return ctx;
};

/**
 * Chatbar container and state provider.
 *
 * Value & Open
 * - Supports controlled/uncontrolled `value` and `open`.
 *
 * Attachments
 * - Controlled/uncontrolled attachments with client-side filtering.
 * - Filters by `accept`/`pasteAccept`, `maxAttachments`, and `maxFileSize`.
 * - Rejections are reported via `onAttachmentReject`.
 *
 * Submit
 * - `onSubmit({ value, attachments })` emits both message and attachments.
 * - `clearOnSubmit` clears message and attachments by default.
 */
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

  /** Combined submit payload */
  onSubmit?: (payload: { value: string; attachments: ChatbarAttachment[] }) => void;

  size?: '1' | '2' | '3';
  variant?: 'surface' | 'outline' | 'classic' | 'ghost' | 'soft';
  /** Accent color for the control (matches TextArea) */
  color?: string;
  /** Optional radius override (matches TextArea) */
  radius?: string | number;
  /** Panel/material translucency flags (matches TextArea) */
  panelBackground?: 'solid' | 'translucent';
  material?: 'solid' | 'translucent';

  width?: React.CSSProperties['width'];
  maxWidth?: React.CSSProperties['maxWidth'];
  asChild?: boolean;

  // Attachments API
  attachments?: ChatbarAttachment[];
  defaultAttachments?: ChatbarAttachment[];
  onAttachmentsChange?: (attachments: ChatbarAttachment[]) => void;
  accept?: string | string[];
  multiple?: boolean;
  maxAttachments?: number;
  maxFileSize?: number;
  paste?: boolean;
  pasteAccept?: string | string[];
  clearOnSubmit?: boolean;
  onAttachmentReject?: (rejections: { file: File; reason: 'type' | 'size' | 'count' }[]) => void;

  /**
   * Enables drag-and-drop file uploads when true.
   *
   * When enabled:
   * - Files can be dropped anywhere on the chatbar
   * - Same validation rules apply (accept, maxFileSize, maxAttachments)
   * - Visual feedback shows during drag operations
   * - Rejected files trigger onAttachmentReject
   *
   * @default true
   */
  dropzone?: boolean;

  /**
   * Optional API ref to control Chatbar imperatively without relying on DOM refs.
   * Provides methods to focus the textarea and open the file picker.
   */
  apiRef?: React.Ref<ChatbarApi>;
}

type RootElement = React.ElementRef<'div'>;
/** Imperative API for Chatbar.Root */
export interface ChatbarApi {
  /** Focus the textarea input */
  focusTextarea: () => void;
  /** Open the file picker dialog (respects accept/multiple) */
  openFilePicker: () => void;
}
/**
 * Chatbar container and state provider.
 *
 * Behavior
 * - Supports controlled and uncontrolled `value` and `open` states via props.
 * - Provides context to subcomponents like `Textarea`, `Row`, and `Send`.
 * - Exposes `data-state`, `data-disabled`, and `data-readonly` attributes for styling.
 * - Sets `aria-expanded` to reflect open/closed state for assistive technologies.
 *
 * Attachments
 * - Controlled/uncontrolled attachments with client-side filtering.
 * - Filters by `accept`/`pasteAccept`, `maxAttachments`, and `maxFileSize`.
 * - Rejections are reported via `onAttachmentReject`.
 * - Paste-to-attach: when `paste` is enabled, pasting files adds attachments.
 *
 * Dropzone
 * - When `dropzone` is true, enables drag-and-drop file uploads.
 * - Files are validated using the same rules as paste and file picker.
 * - Visual feedback via `data-drop-active` attribute during drag operations.
 * - Rejected files trigger `onAttachmentReject` with appropriate reasons.
 *
 * Submit
 * - `onSubmit` receives both message text and attachments array.
 * - `clearOnSubmit` controls whether attachments are cleared after submission.
 *
 * Accessibility
 * - Consumers should label the `Textarea` via `aria-label`/`aria-labelledby`.
 * - `aria-expanded` on the root reflects the disclosure state of the input area.
 * - Dropzone provides proper ARIA attributes for drag and drop operations.
 */
interface RootProps extends ComponentPropsWithout<'div', RemovedProps | 'onSubmit'>, ChatbarRootBaseProps {}

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
    onSubmit,
    size = '2',
    variant,
    color,
    radius,
    panelBackground,
    material,
    width,
    maxWidth,
    asChild,
    attachments: attachmentsProp,
    defaultAttachments = [],
    onAttachmentsChange,
    accept,
    multiple = true,
    maxAttachments,
    maxFileSize,
    paste = true,
    pasteAccept,
    clearOnSubmit = true,
    onAttachmentReject,
    dropzone = true,
    apiRef,
    ...divProps
  } = props;
  const effectiveMaterial = material || panelBackground;

  const isValueControlled = valueProp != null;
  const [valueUncontrolled, setValueUncontrolled] = React.useState<string>(defaultValue);
  const value = isValueControlled ? (valueProp as string) : valueUncontrolled;

  const isOpenControlled = openProp != null;
  const [openUncontrolled, setOpenUncontrolled] = React.useState<boolean>(defaultOpen);
  const open = isOpenControlled ? (openProp as boolean) : openUncontrolled;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileDialogOpenRef = React.useRef<boolean>(false);

  // Attachments state
  // Treat `attachments` as controlled if the prop is provided, even if its value is `undefined`.
  // This avoids switching between controlled and uncontrolled when a consumer sets
  // `attachments={undefined}` to clear attachments. In that case we normalize to an empty array.
  const isAttachmentsControlled = 'attachments' in props;
  const [attachmentsUncontrolled, setAttachmentsUncontrolled] = React.useState<ChatbarAttachment[]>(defaultAttachments);
  const attachments = React.useMemo(
    () => (isAttachmentsControlled ? ((attachmentsProp ?? []) as ChatbarAttachment[]) : attachmentsUncontrolled),
    [isAttachmentsControlled, attachmentsProp, attachmentsUncontrolled],
  );

  // Track generated object URLs for cleanup
  const generatedUrlSetRef = React.useRef<Set<string>>(new Set());

  const toArray = (val: string | string[] | undefined) => (Array.isArray(val) ? val : typeof val === 'string' ? val.split(',').map((s) => s.trim()) : []);

  const accepts = toArray(accept);
  const pasteAccepts = toArray(pasteAccept).length > 0 ? toArray(pasteAccept) : accepts;

  const matchesAccept = (file: File, patterns: string[]) => {
    if (patterns.length === 0) return true;
    const mime = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    for (const patRaw of patterns) {
      const pat = patRaw.toLowerCase();
      if (pat.includes('/')) {
        // MIME pattern
        const [type, subtype] = pat.split('/');
        const [fmType, fmSubtype] = mime.split('/');
        if (type === '*' || (type === fmType && (subtype === '*' || subtype === fmSubtype))) return true;
      } else if (pat.startsWith('.')) {
        if (name.endsWith(pat)) return true;
      }
    }
    return false;
  };

  /**
   * Maps File objects to attachments with validation and preview URL generation.
   */
  const mapFilesToAttachments = (
    files: File[],
  ): {
    accepted: ChatbarAttachment[];
    rejected: { file: File; reason: 'type' | 'size' | 'count' }[];
  } => {
    const next: ChatbarAttachment[] = [];
    const rejected: { file: File; reason: 'type' | 'size' | 'count' }[] = [];

    const remainingSlots = typeof maxAttachments === 'number' ? Math.max(maxAttachments - attachments.length, 0) : Infinity;

    for (const file of files) {
      if (next.length >= remainingSlots) {
        rejected.push({ file, reason: 'count' });
        continue;
      }
      if (typeof maxFileSize === 'number' && file.size > maxFileSize) {
        rejected.push({ file, reason: 'size' });
        continue;
      }
      if (!matchesAccept(file, accepts)) {
        rejected.push({ file, reason: 'type' });
        continue;
      }
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const looksLikeImageByExt = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name);
      const isImageType = (file.type || '').toLowerCase().startsWith('image/');
      const url = isImageType || looksLikeImageByExt ? URL.createObjectURL(file) : undefined;
      if (url) generatedUrlSetRef.current.add(url);
      next.push({
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        url,
        status: 'idle',
      });
    }
    return { accepted: next, rejected };
  };

  const appendFiles = (files: File[]) => {
    const { accepted, rejected } = mapFilesToAttachments(files);
    if (accepted.length > 0) {
      const merged = attachments.concat(accepted);
      if (!isAttachmentsControlled) setAttachmentsUncontrolled(merged);
      onAttachmentsChange?.(merged);
      // Ensure chatbar expands when attachments are added
      if (!isOpenControlled) setOpenUncontrolled(true);
      onOpenChangeProp?.(true);
    }
    if (rejected.length > 0) onAttachmentReject?.(rejected);
  };

  const appendFilesFromPaste = (files: File[]) => {
    // Use pasteAccepts for type filtering
    const matches = (file: File) => {
      if (pasteAccepts.length === 0) return matchesAccept(file, accepts);
      return matchesAccept(file, pasteAccepts);
    };
    const acceptedFiles: File[] = [];
    const rejected: { file: File; reason: 'type' | 'size' | 'count' }[] = [];

    // Enforce maxAttachments and maxFileSize
    const remainingSlots = typeof maxAttachments === 'number' ? Math.max(maxAttachments - attachments.length, 0) : Infinity;
    for (const file of files) {
      if (acceptedFiles.length >= remainingSlots) {
        rejected.push({ file, reason: 'count' });
        continue;
      }
      if (typeof maxFileSize === 'number' && file.size > maxFileSize) {
        rejected.push({ file, reason: 'size' });
        continue;
      }
      if (!matches(file)) {
        rejected.push({ file, reason: 'type' });
        continue;
      }
      acceptedFiles.push(file);
    }
    if (acceptedFiles.length > 0) appendFiles(acceptedFiles);
    if (rejected.length > 0) onAttachmentReject?.(rejected);
  };

  // Revoke object URLs that are no longer referenced by current attachments
  React.useEffect(() => {
    const currentUrls = new Set(attachments.map((a) => a.url).filter(Boolean) as string[]);
    for (const url of Array.from(generatedUrlSetRef.current)) {
      if (!currentUrls.has(url)) {
        URL.revokeObjectURL(url);
        generatedUrlSetRef.current.delete(url);
      }
    }
  }, [attachments]);

  // Revoke any remaining generated URLs on unmount
  React.useEffect(() => {
    const urlSet = generatedUrlSetRef.current;
    return () => {
      for (const url of Array.from(urlSet)) {
        URL.revokeObjectURL(url);
      }
      urlSet.clear();
    };
  }, []);

  const Comp = asChild ? Slot : ('div' as any);

  const handleBlurCapture = React.useCallback(
    (event: React.FocusEvent) => {
      const nextTarget = event.relatedTarget as Node | null;
      const rootEl = rootRef.current;
      if (!rootEl) return;
      // If focus remains within root, ignore
      if (nextTarget && rootEl.contains(nextTarget)) return;
      // If native file dialog is open, avoid collapsing on blur
      if (fileDialogOpenRef.current) return;
      // Collapse when leaving the root if the value is empty
      // Only collapse when both message and attachments are empty
      if ((value?.trim?.() ?? '').length === 0 && attachments.length === 0) {
        if (!isOpenControlled) setOpenUncontrolled(false);
        onOpenChangeProp?.(false);
      }
    },
    [isOpenControlled, onOpenChangeProp, value, attachments],
  );

  // Dropzone functionality
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFileDialog,
  } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        appendFiles(acceptedFiles);
      }
      if (rejectedFiles.length > 0 && onAttachmentReject) {
        const rejections = rejectedFiles.map(({ file, errors }) => {
          const reason = errors[0]?.code === 'file-too-large' ? 'size' : errors[0]?.code === 'file-invalid-type' ? 'type' : 'count';
          return { file, reason: reason as 'type' | 'size' | 'count' };
        });
        onAttachmentReject(rejections);
      }
    },
    accept:
      accepts.length > 0
        ? accepts.reduce(
            (acc, pattern) => {
              if (pattern.includes('/')) {
                // MIME type pattern
                acc[pattern] = [];
              } else if (pattern.startsWith('.')) {
                // File extension pattern
                acc[pattern] = [];
              }
              return acc;
            },
            {} as Record<string, string[]>,
          )
        : undefined,
    multiple,
    maxSize: maxFileSize,
    noClick: true,
    noKeyboard: true,
    disabled: !dropzone || disabled,
  });

  // Expose imperative API via apiRef (non-breaking; forwardedRef still receives the DOM node)
  React.useImperativeHandle(
    apiRef,
    () => ({
      focusTextarea: () => textareaRef.current?.focus({ preventScroll: true }),
      openFilePicker: () => {
        // Guard against blur-collapse while native dialog is open
        fileDialogOpenRef.current = true;
        openFileDialog();
      },
    }),
    [openFileDialog],
  );

  // Click-to-focus: focus textarea when clicking non-interactive areas inside the container
  const isInteractiveTarget = React.useCallback((target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    const el = target as Element;
    if (el.closest('.rt-ChatbarDropOverlay')) return true;
    return !!el.closest('button, [role="button"], a[href], input, textarea, select, [contenteditable], [tabindex]:not([tabindex="-1"])');
  }, []);

  const handleContainerPointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      if (disabled) return;
      if (isInteractiveTarget(event.target)) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      event.preventDefault();
      textareaRef.current?.focus({ preventScroll: true });
    },
    [disabled, isInteractiveTarget, textareaRef],
  );

  // Clicking the label-wrapped Card will naturally focus the nested textarea.

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
        onSubmit,
        rootRef,
        textareaRef,
        attachments,
        setAttachments: (next) => {
          if (!isAttachmentsControlled) setAttachmentsUncontrolled(next);
          onAttachmentsChange?.(next);
        },
        isAttachmentsControlled,
        accept,
        multiple,
        maxAttachments,
        maxFileSize,
        paste,
        pasteAccept,
        clearOnSubmit,
        onAttachmentReject,
        dropzone,
        appendFiles,
        appendFilesFromPaste,
        fileDialogOpenRef,
      }}
    >
      <Comp
        {...divProps}
        ref={(node: HTMLDivElement) => {
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={classNames('rt-ChatbarRoot', `rt-r-size-${size}`, className)}
        style={{ position: 'relative', width, maxWidth, ...style }}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        data-readonly={readOnly ? '' : undefined}
        data-drop-active={dropzone && isDragActive ? '' : undefined}
        data-accent-color={color}
        data-radius={radius as any}
        data-panel-background={effectiveMaterial}
        data-material={effectiveMaterial}
        aria-expanded={open}
        onBlurCapture={handleBlurCapture}
      >
        {dropzone && <input {...getInputProps()} />}
        <div {...(dropzone ? getRootProps() : {})} style={{ width: '100%', height: '100%' }} onPointerDown={handleContainerPointerDown}>
          <Box
            className={classNames('rt-ChatbarBox', `rt-variant-${variant ?? 'surface'}`)}
            style={{ position: 'relative' }}
            data-accent-color={color}
            data-radius={radius as any}
            data-panel-background={effectiveMaterial}
            data-material={effectiveMaterial}
          >
            <div className="rt-ChatbarGrid">{children}</div>
            {dropzone && isDragActive && (
              <div className="rt-ChatbarDropOverlay">
                <div className="rt-ChatbarDropContent">
                  <Text color="gray" size={size} weight="medium">
                    Drop files here to attach
                  </Text>
                </div>
              </div>
            )}
          </Box>
        </div>
      </Comp>
    </ChatbarContext.Provider>
  );
});
Root.displayName = 'Chatbar.Root';

/**
 * Multi-line text input for Chatbar.
 * - Uses onChange to control value and avoid duplicate updates.
 * - Auto-resizes between minLines and maxLines.
 * - Expands on focus/overflow per `expandOn`.
 * - Paste-to-attach: when `paste` is enabled on Root, pasting files adds attachments.
 * - Provide `aria-label` or `aria-labelledby` for an accessible name.
 */
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
  const { className, style, asChild, onFocus, onInput, onChange, onPaste, onKeyDown, submitOnEnter = false, rows, ...textareaProps } = props;
  const ctx = useChatbarContext();
  const { open, minLines, maxLines, expandOn, disabled, readOnly, setOpen, setValue, textareaRef, value, isValueControlled, sendMode, paste, appendFilesFromPaste, size } = ctx;

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

  // Auto-open on external value changes when content overflows one line
  useIsomorphicLayoutEffect(() => {
    if (!(expandOn === 'overflow' || expandOn === 'both')) return;
    if (open) return;
    const el = textareaRef.current;
    if (!el) return;
    // Measure overflow against compact (1-line) height
    el.style.height = 'auto';
    if (compactHeightRef.current === 0) {
      recomputeMetrics();
    }
    const shouldExpand = el.scrollHeight > compactHeightRef.current + 1;
    if (shouldExpand) {
      setOpen(true);
      // Immediately size for open state
      updateHeight(true);
      requestAnimationFrame(() => updateHeight(true));
    }
  }, [value, expandOn, open, setOpen, textareaRef, recomputeMetrics, updateHeight]);

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
    const hasLabel = textareaProps['aria-label'] != null || textareaProps['aria-labelledby'] != null;
    if (!hasLabel) {
      console.warn('[Chatbar.Textarea] Provide aria-label or aria-labelledby to ensure the control has an accessible name.');
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
    [expandOn, open, setOpen, setValue, onChange, updateHeight, recomputeMetrics],
  );

  const handlePaste = React.useCallback<React.ClipboardEventHandler<HTMLTextAreaElement>>(
    (event) => {
      // Attach files from clipboard if enabled
      if (paste) {
        const items = Array.from(event.clipboardData?.items ?? []);
        const files = items
          .filter((i) => i.kind === 'file')
          .map((i) => i.getAsFile())
          .filter((f): f is File => !!f);
        if (files.length > 0) {
          // Prevent pasting the file name or any text representation when files are present
          event.preventDefault();
          appendFilesFromPaste(files);
        }
      }
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
    [paste, open, updateHeight, onPaste, appendFilesFromPaste],
  );

  const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLTextAreaElement>>(
    (event) => {
      if (!submitOnEnter) {
        onKeyDown?.(event);
        return;
      }
      if (event.key === 'Enter' && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey && !event.nativeEvent.isComposing) {
        if (disabled || readOnly) {
          onKeyDown?.(event);
          return;
        }
        if (sendMode === 'never') {
          onKeyDown?.(event);
          return;
        }
        const trimmed = value.trim();
        const hasContent = trimmed.length > 0 || ctx.attachments.length > 0;
        if (sendMode === 'whenDirty' && !hasContent) {
          onKeyDown?.(event);
          return;
        }
        event.preventDefault();
        ctx.onSubmit?.({ value, attachments: ctx.attachments });
        if (ctx.clearOnSubmit) {
          if (!isValueControlled) setValue('');
          ctx.setAttachments([]);
        }
      }
      onKeyDown?.(event);
    },
    [submitOnEnter, disabled, readOnly, sendMode, value, isValueControlled, setValue, ctx, onKeyDown],
  );

  const Comp = asChild ? Slot : ('textarea' as any);
  return (
    <div className={classNames('rt-ChatbarField', 'rt-ChatbarTextarea', className)}>
      <Comp
        {...textareaProps}
        ref={(node: HTMLTextAreaElement) => {
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
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
    <Comp {...divProps} ref={forwardedRef} className={classNames('rt-ChatbarInlineStart', className)} style={style}>
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
    <Comp {...divProps} ref={forwardedRef} className={classNames('rt-ChatbarInlineEnd', className)} style={style}>
      {children}
    </Comp>
  );
});
InlineEnd.displayName = 'Chatbar.InlineEnd';

/**
 * Renders a horizontally scrollable list of attachments above the inline row.
 * Hidden when empty unless `forceMount`. Override per-item with `renderAttachment`.
 */
interface AttachmentsRowProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  asChild?: boolean;
  forceMount?: boolean;
  /** If provided, custom-render a tile; otherwise default tile is used */
  renderAttachment?: (attachment: ChatbarAttachment) => React.ReactNode;
}

const AttachmentsRow = React.forwardRef<HTMLDivElement, AttachmentsRowProps>((props, forwardedRef) => {
  const { asChild, forceMount, renderAttachment, className, style, ...divProps } = props;
  const ctx = useChatbarContext();
  const hasItems = ctx.attachments.length > 0;
  if (!hasItems && !forceMount) return null;
  const Comp = asChild ? Slot : ('div' as any);
  return (
    <Comp {...divProps} ref={forwardedRef} className={classNames('rt-ChatbarAttachmentsRow', className)} style={style} role="list" aria-label={divProps['aria-label'] ?? 'Attachments'}>
      <ScrollArea className="rt-ChatbarScrollArea" scrollbars="horizontal" size="1">
        <Flex align="center" gap="2" style={{ minWidth: 'fit-content' }}>
          {ctx.attachments.map((att) => (
            <Attachment key={att.id} attachment={att} asChild={!!renderAttachment}>
              {renderAttachment?.(att)}
            </Attachment>
          ))}
        </Flex>
      </ScrollArea>
    </Comp>
  );
});
AttachmentsRow.displayName = 'Chatbar.AttachmentsRow';

/** Default tile renderer for a single attachment. */
interface AttachmentProps extends React.ComponentPropsWithoutRef<'div'> {
  attachment: ChatbarAttachment;
  asChild?: boolean;
}

const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>((props, forwardedRef) => {
  const { attachment, asChild, className, style, children, ...divProps } = props;
  const ctx = useChatbarContext();
  const Comp = asChild ? Slot : ('div' as any);
  const isImage = !!attachment.url && attachment.type.startsWith('image/');
  return (
    <Comp {...divProps} ref={forwardedRef} className={classNames('rt-ChatbarAttachment', className)} style={style} role="listitem" data-kind={isImage ? 'image' : 'file'} title={attachment.name}>
      {children ?? (
        // <Card size={ctx.size} variant="surface">
        <Flex align="center" gap="2" pr={!isImage ? '6' : undefined}>
          <div className="rt-ChatbarAttachmentPreview" aria-hidden>
            {isImage ? <img className="rt-ChatbarAttachmentImage" src={attachment.url} alt="" /> : <FileTextIcon />}
          </div>
          {!isImage && (
            <Flex direction="column" gap="0" style={{ minWidth: 0 }}>
              <Text size={ctx.size} weight="medium" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {attachment.name}
              </Text>
              <Text size="1" color="gray">
                {Math.ceil(attachment.size / 1024)} KB
              </Text>
            </Flex>
          )}
          <IconButton
            className="rt-ChatbarAttachmentRemove"
            aria-label={`Remove ${attachment.name}`}
            size="1"
            //   size={ctx.size}
            variant="classic"
            highContrast
            color="gray"
            onClick={() => ctx.setAttachments(ctx.attachments.filter((a) => a.id !== attachment.id))}
          >
            <CloseIcon />
          </IconButton>
        </Flex>
        // </Card>
      )}
    </Comp>
  );
});
Attachment.displayName = 'Chatbar.Attachment';

interface AttachTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  accept?: string | string[];
  multiple?: boolean;
}

const AttachTrigger = React.forwardRef<HTMLButtonElement, AttachTriggerProps>((props, forwardedRef) => {
  const { asChild, accept, multiple, className, style, ...buttonProps } = props;
  const ctx = useChatbarContext();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const Comp = asChild ? Slot : ('button' as any);
  // Prefer Chatbar.Root's accept when a local accept is not provided
  const mergedAccept = accept ?? ctx.accept;
  const actualAccept = (Array.isArray(mergedAccept) ? mergedAccept : (mergedAccept?.split(',') ?? [])).join(',');
  React.useEffect(() => {
    const handleWindowFocus = () => {
      // Reset guard when window regains focus after file dialog closes
      ctx.fileDialogOpenRef.current = false;
    };
    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, [ctx.fileDialogOpenRef]);
  return (
    <>
      <Comp
        {...(buttonProps as any)}
        ref={forwardedRef as any}
        className={classNames('rt-ChatbarAttachTrigger', className)}
        style={style}
        type={buttonProps.type ?? 'button'}
        aria-label={buttonProps['aria-label'] ?? 'Add attachments'}
        onPointerDown={(e: any) => {
          // Set guard before blur occurs (Safari fires blur before click)
          ctx.fileDialogOpenRef.current = true;
          buttonProps.onPointerDown?.(e);
        }}
        onMouseDown={(e: any) => {
          // Fallback for environments without Pointer Events
          ctx.fileDialogOpenRef.current = true;
          buttonProps.onMouseDown?.(e);
        }}
        onClick={(e: any) => {
          // Ensure file input opens reliably by clicking it first
          ctx.fileDialogOpenRef.current = true;
          if (inputRef.current) {
            inputRef.current.click();
          }
          // Then call user's onClick if provided
          buttonProps.onClick?.(e);
        }}
      />
      <input
        ref={inputRef}
        type="file"
        accept={actualAccept}
        multiple={multiple ?? ctx.multiple}
        tabIndex={-1}
        style={{ display: 'none' }}
        onChange={(e) => {
          const files = Array.from(e.currentTarget.files ?? []);
          if (files.length > 0) {
            ctx.appendFiles(files);
          }
          // File dialog closed; allow normal blur handling
          ctx.fileDialogOpenRef.current = false;
          // Reset input value to allow selecting the same file again
          e.currentTarget.value = '';
        }}
      />
    </>
  );
});
AttachTrigger.displayName = 'Chatbar.AttachTrigger';
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
    <Comp {...divProps} ref={forwardedRef} className={classNames('rt-ChatbarRow', className)} style={style}>
      <Flex align="center" justify="between" width="100%">
        {children}
      </Flex>
    </Comp>
  );
});
Row.displayName = 'Chatbar.Row';

const RowStart = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, forwardedRef) => {
  const { className, style, ...divProps } = props;
  return <div {...divProps} ref={forwardedRef} className={classNames('rt-ChatbarRowStart', className)} style={style} />;
});
RowStart.displayName = 'Chatbar.RowStart';

const RowEnd = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, forwardedRef) => {
  const { className, style, ...divProps } = props;
  return <div {...divProps} ref={forwardedRef} className={classNames('rt-ChatbarRowEnd', className)} style={style} />;
});
RowEnd.displayName = 'Chatbar.RowEnd';

interface SendProps extends IconButtonProps {
  asChild?: boolean;
  clearOnSend?: boolean;
}

const Send = React.forwardRef<HTMLButtonElement, SendProps>((props, forwardedRef) => {
  const { asChild, clearOnSend = true, disabled, children, className, style, size: sizeProp, variant: variantProp, ...buttonProps } = props;
  const ctx = useChatbarContext();

  const trimmed = ctx.value.trim();
  const hasContent = trimmed.length > 0 || ctx.attachments.length > 0;
  const visible = ctx.sendMode === 'always' || (ctx.sendMode === 'whenDirty' && hasContent);
  if (ctx.sendMode === 'never') return null;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (ctx.disabled || ctx.readOnly) return;
    ctx.onSubmit?.({ value: ctx.value, attachments: ctx.attachments });
    if (clearOnSend) {
      if (!ctx.isValueControlled) ctx.setValue('');
      if (ctx.clearOnSubmit) ctx.setAttachments([]);
    }
    buttonProps.onClick?.(event);
  };

  return (
    <IconButton
      {...(buttonProps as any)}
      ref={forwardedRef as any}
      size={sizeProp ?? ctx.size}
      variant={variantProp ?? (ctx.open ? 'solid' : 'ghost')}
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
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right-icon lucide-arrow-right"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      )}
    </IconButton>
  );
});
Send.displayName = 'Chatbar.Send';

export { Root, Textarea, InlineStart, InlineEnd, AttachmentsRow, Attachment, AttachTrigger, Row, RowStart, RowEnd, Send };
export type { RootProps as ChatbarRootProps, TextareaProps as ChatbarTextareaProps, RowProps as ChatbarRowProps, SendProps as ChatbarSendProps, ChatbarAttachment };
