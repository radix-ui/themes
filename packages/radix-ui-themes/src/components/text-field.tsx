'use client';

import * as React from 'react';
import classNames from 'classnames';
import { composeEventHandlers } from '@radix-ui/primitive';
import { textFieldPropDefs, textFieldSlotPropDefs } from './text-field.props.js';
import { extractMarginProps, extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type TextFieldContextValue = GetPropDefTypes<typeof textFieldPropDefs>;
const TextFieldContext = React.createContext<TextFieldContextValue | undefined>(undefined);

type TextFieldRootElement = React.ElementRef<'div'>;
interface TextFieldRootProps
  extends ComponentPropsWithoutColor<'div'>,
    MarginProps,
    TextFieldContextValue {}
const TextFieldRoot = React.forwardRef<TextFieldRootElement, TextFieldRootProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      size = textFieldPropDefs.size.default,
      variant = textFieldPropDefs.variant.default,
      color = textFieldPropDefs.color.default,
      radius = textFieldPropDefs.radius.default,
      ...rootProps
    } = extractProps(props, marginPropDefs);
    return (
      <div
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
        <TextFieldContext.Provider value={{ size, variant, color, radius }}>
          {children}
        </TextFieldContext.Provider>
      </div>
    );
  }
);
TextFieldRoot.displayName = 'TextFieldRoot';

type TextFieldSlotElement = React.ElementRef<'div'>;
type TextFieldSlotOwnProps = GetPropDefTypes<typeof textFieldSlotPropDefs>;
interface TextFieldSlotProps extends ComponentPropsWithoutColor<'div'>, TextFieldSlotOwnProps {}
const TextFieldSlot = React.forwardRef<TextFieldSlotElement, TextFieldSlotProps>(
  (props, forwardedRef) => {
    const context = React.useContext(TextFieldContext);
    const { className, color, ...slotProps } = extractProps(
      // Pass size value from the context to generate styles
      { size: context?.size, ...props },
      // Pass size prop def to allow it to be extracted
      { size: textFieldPropDefs.size },
      textFieldSlotPropDefs
    );
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
  extends Omit<ComponentPropsWithoutColor<'input'>, 'size'>,
    MarginProps,
    TextFieldInputOwnProps {}
const TextFieldInput = React.forwardRef<TextFieldInputElement, TextFieldInputProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const context = React.useContext(TextFieldContext);
    const hasRoot = context !== undefined;
    const { className, color, radius, ...inputProps } = extractProps(
      { ...context, ...marginRest },
      textFieldPropDefs
    );

    const input = (
      <>
        <input
          data-accent-color={color}
          spellCheck="false"
          {...inputProps}
          ref={forwardedRef}
          className={classNames('rt-reset', 'rt-TextFieldInput', className)}
        />
        <div data-accent-color={color} data-radius={radius} className="rt-TextFieldChrome" />
      </>
    );

    if (hasRoot) {
      return input;
    }

    return (
      <TextFieldRoot
        {...marginProps}
        size={props.size}
        variant={props.variant}
        color={props.color}
        radius={props.radius}
      >
        {input}
      </TextFieldRoot>
    );
  }
);
TextFieldInput.displayName = 'TextFieldInput';

export { TextFieldRoot, TextFieldSlot, TextFieldInput };
export type { TextFieldRootProps, TextFieldSlotProps, TextFieldInputProps };
