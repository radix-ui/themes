'use client';

import * as React from 'react';
import classNames from 'classnames';
import { composeEventHandlers } from '@radix-ui/primitive';
import { textFieldPropDefs, textFieldSlotPropDefs } from './text-field.props.js';
import { extractMarginProps, extractProps, marginPropDefs } from '../helpers/index.js';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers/index.js';

type TextFieldRootOwnProps = GetPropDefTypes<typeof textFieldPropDefs>;
const TextFieldContext = React.createContext<true | undefined>(undefined);

type TextFieldRootElement = React.ElementRef<'div'>;
interface TextFieldRootProps
  extends PropsWithoutRefOrColor<'div'>,
    MarginProps,
    TextFieldRootOwnProps {}
const TextFieldRoot = React.forwardRef<TextFieldRootElement, TextFieldRootProps>(
  (props, forwardedRef) => {
    const { children, className, color, radius, ...rootProps } = extractProps(
      props,
      textFieldPropDefs,
      marginPropDefs
    );
    return (
      <div
        data-accent-color={color}
        data-radius={radius}
        {...rootProps}
        ref={forwardedRef}
        className={classNames('rt-TextFieldRoot', className)}
        onPointerDown={composeEventHandlers(rootProps.onPointerDown, (event) => {
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          const input = event.currentTarget.querySelector(
            '.rt-TextFieldInput'
          ) as HTMLInputElement | null;
          if (!input) return;

          const position = input.compareDocumentPosition(target);
          const targetIsBeforeInput = (position & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
          const cursorPosition = targetIsBeforeInput ? 0 : input.value.length;

          requestAnimationFrame(() => {
            // Only some input types support this, browsers will throw an error if not supported
            // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange#:~:text=Note%20that%20according,not%20support%20selection%22.
            try {
              input.setSelectionRange(cursorPosition, cursorPosition);
            } catch (e) {}
            input.focus();
          });
        })}
      >
        <TextFieldContext.Provider value>{children}</TextFieldContext.Provider>
      </div>
    );
  }
);
TextFieldRoot.displayName = 'TextFieldRoot';

type TextFieldSlotElement = React.ElementRef<'div'>;
type TextFieldSlotOwnProps = GetPropDefTypes<typeof textFieldSlotPropDefs>;
interface TextFieldSlotProps extends PropsWithoutRefOrColor<'div'>, TextFieldSlotOwnProps {}
const TextFieldSlot = React.forwardRef<TextFieldSlotElement, TextFieldSlotProps>(
  (props, forwardedRef) => {
    const { className, color, ...slotProps } = extractProps(props, textFieldSlotPropDefs);
    return (
      <div
        data-accent-color={color}
        {...slotProps}
        ref={forwardedRef}
        className={classNames('rt-TextFieldSlot', className)}
      />
    );
  }
);
TextFieldSlot.displayName = 'TextFieldSlot';

type TextFieldInputElement = React.ElementRef<'input'>;
type TextFieldInputOwnProps = GetPropDefTypes<typeof textFieldPropDefs>;
interface TextFieldInputProps
  extends Omit<PropsWithoutRefOrColor<'input'>, 'size'>,
    MarginProps,
    TextFieldInputOwnProps {}
const TextFieldInput = React.forwardRef<TextFieldInputElement, TextFieldInputProps>(
  ({ className, color, radius, size, variant, ...props }, forwardedRef) => {
    const { rest: inputProps, ...marginProps } = extractMarginProps(props);
    const context = React.useContext(TextFieldContext);
    const hasRoot = context !== undefined;

    const input = (
      <input
        spellCheck="false"
        {...inputProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-TextFieldInput', className)}
      />
    );

    if (hasRoot) {
      return input;
    }

    return (
      <TextFieldRoot {...marginProps} size={size} variant={variant} color={color} radius={radius}>
        {input}
      </TextFieldRoot>
    );
  }
);
TextFieldInput.displayName = 'TextFieldInput';

export { TextFieldRoot, TextFieldSlot, TextFieldInput };
export type { TextFieldRootProps, TextFieldSlotProps, TextFieldInputProps };
