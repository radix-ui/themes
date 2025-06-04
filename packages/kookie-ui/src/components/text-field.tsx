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
    const { children, className, color, radius, style, ...inputProps } = extractProps(
      props,
      textFieldRootPropDefs,
      marginPropDefs
    );
    return (
      <div
        data-accent-color={color}
        data-radius={radius}
        style={style}
        className={classNames('rt-TextFieldRoot', className)}
        onPointerDown={(event) => {
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
        }}
      >
        <input
          spellCheck="false"
          {...inputProps}
          ref={composeRefs(inputRef, forwardedRef)}
          className="rt-reset rt-TextFieldInput"
        />
        {children}
      </div>
    );
  }
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
  }
);
TextFieldSlot.displayName = 'TextField.Slot';

export { TextFieldRoot as Root, TextFieldSlot as Slot };
export type { TextFieldRootProps as RootProps, TextFieldSlotProps as SlotProps };
