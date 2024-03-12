import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { baseButtonPropDefs } from './base-button.props.js';
import { extractProps, mapButtonSizeToSpinnerSize, mapResponsiveProp } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import { Flex } from './flex.js';
import { Spinner } from './spinner.js';
import { VisuallyHidden } from './visually-hidden.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type BaseButtonElement = React.ElementRef<'button'>;
type BaseButtonOwnProps = GetPropDefTypes<typeof baseButtonPropDefs>;
interface BaseButtonProps
  extends ComponentPropsWithout<'button', RemovedProps>,
    MarginProps,
    BaseButtonOwnProps {}
const BaseButton = React.forwardRef<BaseButtonElement, BaseButtonProps>((props, forwardedRef) => {
  const { size = baseButtonPropDefs.size.default } = props;
  const {
    className,
    children,
    asChild,
    color,
    radius,
    disabled = props.loading,
    ...baseButtonProps
  } = extractProps(props, baseButtonPropDefs, marginPropDefs);
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      // The `data-disabled` attribute enables correct styles when doing `<Button asChild disabled>`
      data-disabled={disabled || undefined}
      data-accent-color={color}
      data-radius={radius}
      {...baseButtonProps}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-BaseButton', className)}
      disabled={disabled}
    >
      {props.loading ? (
        <>
          {/**
           * We need a wrapper to set `visibility: hidden` to hide the button content whilst we show the `Spinner`.
           * The button is a flex container with a `gap`, so we use `display: contents` to ensure the correct flex layout.
           *
           * However, `display: contents` removes the content from the accessibility tree in some browsers,
           * so we force remove it with `aria-hidden` and re-add it in the tree with `VisuallyHidden`
           */}
          <span style={{ display: 'contents', visibility: 'hidden' }} aria-hidden>
            {children}
          </span>
          <VisuallyHidden>{children}</VisuallyHidden>

          <Flex asChild align="center" justify="center" position="absolute" inset="0">
            <span>
              <Spinner size={mapResponsiveProp(size, mapButtonSizeToSpinnerSize)} />
            </span>
          </Flex>
        </>
      ) : (
        children
      )}
    </Comp>
  );
});
BaseButton.displayName = 'BaseButton';

export { BaseButton };
export type { BaseButtonProps };
