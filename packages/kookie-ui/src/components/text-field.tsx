'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { composeRefs } from 'radix-ui/internal';

import {
  textFieldRootPropDefs,
  textFieldSlotPropDefs,
  type TextFieldSlotScrubProps,
} from './text-field.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { NotInputTextualAttributes } from '../helpers/input-attributes.js';
import type { MarginProps } from '../props/margin.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type TextFieldRootElement = React.ElementRef<'input'>;
type TextFieldRootOwnProps = GetPropDefTypes<typeof textFieldRootPropDefs> & {
  defaultValue?: string | number;
  value?: string | number;
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
};
type TextFieldInputProps = ComponentPropsWithout<
  'input',
  NotInputTextualAttributes | 'color' | 'defaultValue' | 'size' | 'type' | 'value'
>;
interface TextFieldRootProps extends TextFieldInputProps, MarginProps, TextFieldRootOwnProps {}
const TextFieldRoot = React.forwardRef<TextFieldRootElement, TextFieldRootProps>(
  (props, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { children, className, color, radius, panelBackground, material, style, ...inputProps } =
      extractProps(props, textFieldRootPropDefs, marginPropDefs);
    const effectiveMaterial = material || panelBackground;

    // Generate unique IDs for accessibility
    const errorId = React.useId();

    // Determine invalid state
    const isInvalid = inputProps.error || inputProps.isInvalid;

    const { 'aria-describedby': ariaDescribedby, 'aria-labelledby': ariaLabelledby } = inputProps;

    // Build aria-describedby string
    const describedBy = React.useMemo(() => {
      const parts = [];
      if (inputProps.errorMessage) parts.push(errorId);
      if (ariaDescribedby) parts.push(ariaDescribedby);
      return parts.length > 0 ? parts.join(' ') : undefined;
    }, [inputProps.errorMessage, ariaDescribedby, errorId]);

    // Build aria attributes
    const ariaProps = React.useMemo(
      () => ({
        'aria-invalid': isInvalid,
        'aria-describedby': describedBy,
        'aria-labelledby': ariaLabelledby,
      }),
      [isInvalid, describedBy, ariaLabelledby],
    );

    // Filter out our custom props to avoid DOM warnings
    const {
      error,
      errorMessage,
      isInvalid: _isInvalid,
      required,
      'aria-describedby': _ariaDescribedby,
      'aria-labelledby': _ariaLabelledby,
      ...nativeInputProps
    } = inputProps;

    // Memoized pointer event handler
    const handlePointerDown = React.useCallback((event: React.PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('input, button, a')) return;

      const input = inputRef.current;
      if (!input) return;

      // Same selector as in the CSS to find the right slot
      const isRightSlot = target.closest(`
        .rt-TextFieldSlot[data-side='right'],
        .rt-TextFieldSlot:not([data-side='right']) ~ .rt-TextFieldSlot:not([data-side='left'])
      `);

      const cursorPosition = isRightSlot ? input.value.length : 0;

      requestAnimationFrame(() => {
        // Only some input types support this, browsers will throw an error if not supported
        // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange#:~:text=Note%20that%20according,not%20support%20selection%22.
        try {
          input.setSelectionRange(cursorPosition, cursorPosition);
        } catch {}
        input.focus();
      });
    }, []);

    return (
      <div
        data-accent-color={color}
        data-radius={radius}
        data-panel-background={effectiveMaterial}
        data-material={effectiveMaterial}
        style={style}
        className={classNames('rt-TextFieldRoot', className, {
          'rt-error': isInvalid,
        })}
        onPointerDown={handlePointerDown}
      >
        <input
          spellCheck="false"
          {...nativeInputProps}
          {...ariaProps}
          ref={composeRefs(inputRef, forwardedRef)}
          className="rt-reset rt-TextFieldInput"
        />
        {children}
        {inputProps.errorMessage && (
          <div id={errorId} className="rt-TextFieldErrorMessage" role="alert" aria-live="polite">
            {inputProps.errorMessage}
          </div>
        )}
      </div>
    );
  },
);
TextFieldRoot.displayName = 'TextField.Root';

type TextFieldSlotElement = React.ElementRef<'div'>;
type TextFieldSlotOwnProps = GetPropDefTypes<typeof textFieldSlotPropDefs> & TextFieldSlotScrubProps;
interface TextFieldSlotProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    TextFieldSlotOwnProps {}
const TextFieldSlot = React.forwardRef<TextFieldSlotElement, TextFieldSlotProps>(
  (props, forwardedRef) => {
    // Extract scrub props first (not part of PropDef system)
    const {
      scrub,
      scrubValue,
      scrubStep = 1,
      scrubSensitivity = 1,
      scrubMin,
      scrubMax,
      scrubShiftMultiplier = 10,
      scrubAltMultiplier = 0.1,
      onScrub,
      ...restProps
    } = props;

    // Then extract styling props
    const { className, color, side, ...slotProps } = extractProps(restProps, textFieldSlotPropDefs);

    const slotRef = React.useRef<HTMLDivElement>(null);
    const [isScrubbing, setIsScrubbing] = React.useState(false);
    // Virtual cursor position - X wraps around viewport, Y follows mouse
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });

    // Track accumulated sub-step movement for precision
    const accumulatedMovement = React.useRef(0);
    // Track current value for clamping (initialized to scrubValue when scrubbing starts)
    const currentValue = React.useRef(0);
    // Track virtual X position for wrap-around (separate from rendered position)
    const virtualX = React.useRef(0);

    // Store scrub config in refs so document handlers can access latest values
    const scrubConfigRef = React.useRef({
      scrubValue,
      scrubStep,
      scrubSensitivity,
      scrubMin,
      scrubMax,
      scrubShiftMultiplier,
      scrubAltMultiplier,
      onScrub,
    });
    scrubConfigRef.current = {
      scrubValue,
      scrubStep,
      scrubSensitivity,
      scrubMin,
      scrubMax,
      scrubShiftMultiplier,
      scrubAltMultiplier,
      onScrub,
    };

    const handlePointerDown = React.useCallback(
      (event: React.PointerEvent) => {
        if (!scrub) return;

        // Don't start scrubbing if clicking on interactive elements
        const target = event.target as HTMLElement;
        if (target.closest('input, button, a')) return;

        event.preventDefault();
        accumulatedMovement.current = 0;
        // Initialize to current value so min/max clamping works correctly
        currentValue.current = scrubValue ?? 0;

        // Initialize virtual cursor at actual mouse position
        virtualX.current = event.clientX;
        setCursorPosition({ x: event.clientX, y: event.clientY });

        // Request pointer lock for infinite movement (cursor won't hit screen edges)
        const slot = slotRef.current;
        if (slot) {
          slot.requestPointerLock();
        }
      },
      [scrub, scrubValue],
    );

    // Handle pointer lock state changes
    React.useEffect(() => {
      const handlePointerLockChange = () => {
        const isLocked = document.pointerLockElement === slotRef.current;
        setIsScrubbing(isLocked);
        if (!isLocked) {
          // Fire callback with isChanging = false when scrubbing ends
          scrubConfigRef.current.onScrub?.(0, false);
          accumulatedMovement.current = 0;
          currentValue.current = 0;
        }
      };

      document.addEventListener('pointerlockchange', handlePointerLockChange);
      return () => {
        document.removeEventListener('pointerlockchange', handlePointerLockChange);
      };
    }, []);

    // Attach document-level listeners when scrubbing starts
    React.useEffect(() => {
      if (!isScrubbing) return;

      const handleMouseMove = (event: MouseEvent) => {
        const config = scrubConfigRef.current;
        const movementX = event.movementX;
        const movementY = event.movementY;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Update virtual position with wrap-around at viewport edges
        virtualX.current += movementX;
        if (virtualX.current > viewportWidth) {
          virtualX.current = virtualX.current % viewportWidth;
        } else if (virtualX.current < 0) {
          virtualX.current = viewportWidth + (virtualX.current % viewportWidth);
        }

        // Also track Y with wrap-around
        setCursorPosition((prev) => {
          let newY = prev.y + movementY;
          if (newY > viewportHeight) {
            newY = newY % viewportHeight;
          } else if (newY < 0) {
            newY = viewportHeight + (newY % viewportHeight);
          }
          return { x: virtualX.current, y: newY };
        });

        // Accumulate movement for sensitivity calculation
        accumulatedMovement.current += movementX;

        // Calculate how many steps we've moved
        const stepsFromMovement = accumulatedMovement.current / config.scrubSensitivity;

        if (Math.abs(stepsFromMovement) >= 1) {
          // Determine modifier multiplier
          let multiplier = 1;
          if (event.shiftKey) {
            multiplier = config.scrubShiftMultiplier;
          } else if (event.altKey) {
            multiplier = config.scrubAltMultiplier;
          }

          // Calculate delta
          const wholeSteps = Math.trunc(stepsFromMovement);
          const delta = wholeSteps * config.scrubStep * multiplier;

          // Apply min/max clamping if bounds are set
          let clampedDelta = delta;
          if (config.scrubMin !== undefined || config.scrubMax !== undefined) {
            const newValue = currentValue.current + delta;
            const clampedValue = Math.max(
              config.scrubMin ?? -Infinity,
              Math.min(config.scrubMax ?? Infinity, newValue),
            );
            clampedDelta = clampedValue - currentValue.current;
            currentValue.current = clampedValue;
          } else {
            currentValue.current += delta;
          }

          // Fire callback with clamped delta (isChanging = true during drag)
          if (clampedDelta !== 0) {
            config.onScrub?.(clampedDelta, true);
          }

          // Keep the fractional remainder for smooth sub-pixel accumulation
          accumulatedMovement.current = (stepsFromMovement - wholeSteps) * config.scrubSensitivity;
        }
      };

      const handleMouseUp = () => {
        // Exit pointer lock to end scrubbing
        document.exitPointerLock();
      };

      // Use mousemove for pointer lock (pointermove doesn't work well with pointer lock)
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // Disable text selection during scrubbing
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }, [isScrubbing]);

    // Render virtual cursor via portal to body so it's not clipped
    // Using a data URI of ew-resize cursor for a native look
    const virtualCursor = isScrubbing
      ? ReactDOM.createPortal(
          <img
            className="rt-TextFieldSlotScrubCursor"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='black' stroke='white' stroke-width='1' d='M0 12 L5 7 L5 10 L19 10 L19 7 L24 12 L19 17 L19 14 L5 14 L5 17 Z'/%3E%3C/svg%3E"
            alt=""
            style={{
              position: 'fixed',
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 99999,
              width: 24,
              height: 24,
            }}
            aria-hidden="true"
          />,
          document.body,
        )
      : null;

    return (
      <div
        data-accent-color={color}
        data-side={side}
        data-scrub={scrub || undefined}
        data-scrubbing={isScrubbing || undefined}
        {...slotProps}
        ref={composeRefs(slotRef, forwardedRef)}
        className={classNames('rt-TextFieldSlot', className)}
        onPointerDown={scrub ? handlePointerDown : undefined}
      >
        {slotProps.children}
        {virtualCursor}
      </div>
    );
  },
);
TextFieldSlot.displayName = 'TextField.Slot';

export { TextFieldRoot as Root, TextFieldSlot as Slot };
export type { TextFieldRootProps as RootProps, TextFieldSlotProps as SlotProps };
