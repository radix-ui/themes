'use client';

import * as React from 'react';
import classNames from 'classnames';
import { composeEventHandlers } from '@radix-ui/primitive';
import { textFieldPropDefs, textFieldSlotPropDefs } from './text-field.props';
import {
  extractMarginProps,
  withMarginProps,
  extractPaddingProps,
  withPaddingProps,
  withBreakpoints,
} from '../helpers';

import type {
  PropsWithoutRefOrColor,
  MarginProps,
  PaddingProps,
  GetPropDefTypes,
} from '../helpers';

const TextFieldContext = React.createContext<boolean>(false);

type TextFieldRootElement = React.ElementRef<'div'>;
interface TextFieldRootProps extends PropsWithoutRefOrColor<'div'>, MarginProps {}
const TextFieldRoot = React.forwardRef<TextFieldRootElement, TextFieldRootProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const { children, className, ...rootProps } = marginRest;
    return (
      <div
        {...rootProps}
        ref={forwardedRef}
        className={classNames('rt-TextFieldRoot', withMarginProps(marginProps), className)}
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
            input.setSelectionRange(cursorPosition, cursorPosition);
            input.focus();
          });
        })}
      >
        <TextFieldContext.Provider value={true}>{children}</TextFieldContext.Provider>
      </div>
    );
  }
);
TextFieldRoot.displayName = 'TextFieldRoot';

type TextFieldSlotElement = React.ElementRef<'div'>;
type TextFieldSlotOwnProps = GetPropDefTypes<typeof textFieldSlotPropDefs>;
interface TextFieldSlotProps
  extends React.ComponentPropsWithRef<'div'>,
    PaddingProps,
    TextFieldSlotOwnProps {}
const TextFieldSlot = React.forwardRef<TextFieldSlotElement, TextFieldSlotProps>(
  (props, forwardedRef) => {
    const { rest: paddingRest, ...paddingProps } = extractPaddingProps(props);
    const { className, gap = '1', ...slotProps } = paddingRest;
    return (
      <div
        {...slotProps}
        ref={forwardedRef}
        className={classNames(
          'rt-TextFieldSlot',
          withBreakpoints(gap, 'rt-gap'),
          withPaddingProps(paddingProps),
          className
        )}
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
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const hasRoot = React.useContext(TextFieldContext);
    const {
      className,
      size = textFieldPropDefs.size.default,
      variant = textFieldPropDefs.variant.default,
      color = textFieldPropDefs.color.default,
      radius = textFieldPropDefs.radius.default,
      ...textFieldProps
    } = marginRest;

    const input = (
      <>
        <input
          data-accent-scale={color}
          spellCheck="false"
          {...textFieldProps}
          ref={forwardedRef}
          className={classNames(
            'rt-TextFieldInput',
            withBreakpoints(size, 'size'),
            `variant-${variant}`,
            { 'no-slots': !hasRoot },
            className
          )}
        />
        <div data-accent-scale={color} data-radius={radius} className="rt-TextFieldChrome" />
      </>
    );

    return hasRoot ? input : <TextFieldRoot {...marginProps}>{input}</TextFieldRoot>;
  }
);
TextFieldInput.displayName = 'TextFieldInput';

const TextField = Object.assign(
  {},
  {
    Root: TextFieldRoot,
    Slot: TextFieldSlot,
    Input: TextFieldInput,
  }
);

export { TextField, TextFieldRoot, TextFieldSlot, TextFieldInput };
