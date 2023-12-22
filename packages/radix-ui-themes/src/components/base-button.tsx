import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { baseButtonPropDefs } from './base-button.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import { Flex } from './flex';
import { Spinner } from './spinner';
import { VisuallyHidden } from './visually-hidden';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type BaseButtonElement = React.ElementRef<'button'>;
type BaseButtonOwnProps = GetPropDefTypes<typeof baseButtonPropDefs>;
interface BaseButtonProps
  extends PropsWithoutRefOrColor<'button'>,
    MarginProps,
    BaseButtonOwnProps {
  asChild?: boolean;
}
const BaseButton = React.forwardRef<BaseButtonElement, BaseButtonProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    children,
    asChild = false,
    size = baseButtonPropDefs.size.default,
    variant = baseButtonPropDefs.variant.default,
    color = baseButtonPropDefs.color.default,
    highContrast = baseButtonPropDefs.highContrast.default,
    radius = baseButtonPropDefs.radius.default,
    loading = baseButtonPropDefs.loading.default,
    disabled = loading,
    ...baseButtonProps
  } = marginRest;
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      // The `data-disabled` attribute enables correct styles when doing `<Button asChild disabled>`
      data-disabled={disabled || undefined}
      data-accent-color={color}
      data-radius={radius}
      {...baseButtonProps}
      ref={forwardedRef}
      className={classNames(
        'rt-reset',
        'rt-BaseButton',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        {
          'rt-high-contrast': highContrast,
          'rt-loading': loading,
        },
        withMarginProps(marginProps)
      )}
      disabled={disabled}
    >
      {loading ? (
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
              <Spinner />
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
