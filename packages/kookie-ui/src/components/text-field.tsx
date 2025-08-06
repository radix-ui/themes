'use client';

import * as React from 'react';
import classNames from 'classnames';
import { composeRefs } from 'radix-ui/internal';

import { textFieldRootPropDefs, textFieldSlotPropDefs } from './text-field.props.js';
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

    // Build aria-describedby string
    const describedBy = React.useMemo(() => {
      const parts = [];
      if (inputProps.errorMessage) parts.push(errorId);
      if (inputProps['aria-describedby']) parts.push(inputProps['aria-describedby']);
      return parts.length > 0 ? parts.join(' ') : undefined;
    }, [inputProps.errorMessage, inputProps['aria-describedby'], errorId]);

    // Build aria attributes
    const ariaProps = React.useMemo(
      () => ({
        'aria-invalid': isInvalid,
        'aria-describedby': describedBy,
        'aria-labelledby': inputProps['aria-labelledby'],
      }),
      [isInvalid, describedBy, inputProps['aria-labelledby']],
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
type TextFieldSlotOwnProps = GetPropDefTypes<typeof textFieldSlotPropDefs>;
interface TextFieldSlotProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    TextFieldSlotOwnProps {}
const TextFieldSlot = React.forwardRef<TextFieldSlotElement, TextFieldSlotProps>(
  (props, forwardedRef) => {
    const { className, color, side, ...slotProps } = extractProps(props, textFieldSlotPropDefs);
    return (
      <div
        data-accent-color={color}
        data-side={side}
        {...slotProps}
        ref={forwardedRef}
        className={classNames('rt-TextFieldSlot', className)}
      />
    );
  },
);
TextFieldSlot.displayName = 'TextField.Slot';

export { TextFieldRoot as Root, TextFieldSlot as Slot };
export type { TextFieldRootProps as RootProps, TextFieldSlotProps as SlotProps };
