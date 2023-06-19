import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, ButtonRadius, Responsive } from '../helpers';

const baseButtonSizes = ['1', '2', '3'] as const;
type BaseButtonSize = (typeof baseButtonSizes)[number];
const defaultBaseButtonSize: BaseButtonSize = '2';

const baseButtonVariants = [
  'surface',
  'surface-mono',
  'solid',
  'solid-mono',
  'subtle',
  'subtle-mono',
  'outline',
  'outline-mono',
  'ghost',
  'ghost-mono',
] as const;
type BaseButtonVariant = (typeof baseButtonVariants)[number];
const defaultBaseButtonVariant: BaseButtonVariant = 'solid';

const defaultBaseButtonColor: Color | undefined = undefined;
const defaultBaseButtonRadius: ButtonRadius | undefined = undefined;

type BaseButtonElement = React.ElementRef<'button'>;
interface BaseButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>,
    MarginProps {
  size?: Responsive<BaseButtonSize>;
  variant?: BaseButtonVariant;
  color?: Color;
  radius?: ButtonRadius;
}
const BaseButton = React.forwardRef<BaseButtonElement, BaseButtonProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultBaseButtonSize,
    variant = defaultBaseButtonVariant,
    color = defaultBaseButtonColor,
    radius = defaultBaseButtonRadius,
    ...baseButtonProps
  } = marginRest;

  return (
    <button
      data-color-scale={color}
      data-button-radius={radius}
      {...baseButtonProps}
      ref={forwardedRef}
      className={classNames(
        'rui-reset-button',
        'rui-BaseButton',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMargin(marginProps),
        className
      )}
    />
  );
});
BaseButton.displayName = 'BaseButton';

export {
  baseButtonSizes,
  defaultBaseButtonSize,
  baseButtonVariants,
  defaultBaseButtonVariant,
  defaultBaseButtonColor,
  defaultBaseButtonRadius,
  BaseButton,
};
export type { BaseButtonSize, BaseButtonVariant };
