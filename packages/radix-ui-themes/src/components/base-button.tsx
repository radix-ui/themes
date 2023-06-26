import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import {
  defaultBaseButtonSize,
  defaultBaseButtonVariant,
  defaultBaseButtonColor,
  defaultBaseRadius,
} from './base-button.props';

import type { MarginProps, Color, Radius, Responsive } from '../helpers';
import type { BaseButtonSize, BaseButtonVariant } from './base-button.props';

type BaseButtonElement = React.ElementRef<'button'>;
interface BaseButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>,
    MarginProps {
  size?: Responsive<BaseButtonSize>;
  variant?: BaseButtonVariant;
  color?: Color;
  radius?: Radius;
}
const BaseButton = React.forwardRef<BaseButtonElement, BaseButtonProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultBaseButtonSize,
    variant = defaultBaseButtonVariant,
    color = defaultBaseButtonColor,
    radius = defaultBaseRadius,
    ...baseButtonProps
  } = marginRest;
  return (
    <button
      data-accent-scale={color}
      data-radius={radius}
      {...baseButtonProps}
      ref={forwardedRef}
      className={classNames(
        'rui-reset-button',
        'rui-BaseButton',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
BaseButton.displayName = 'BaseButton';

export { BaseButton };
