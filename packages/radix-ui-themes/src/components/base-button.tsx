import * as React from 'react';
import classNames from 'classnames';
import { baseButtonPropDefs } from './base-button.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type BaseButtonElement = React.ElementRef<'button'>;
type BaseButtonOwnProps = GetPropDefTypes<typeof baseButtonPropDefs>;
interface BaseButtonProps
  extends PropsWithoutRefOrColor<'button'>,
    MarginProps,
    BaseButtonOwnProps {}
const BaseButton = React.forwardRef<BaseButtonElement, BaseButtonProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = baseButtonPropDefs.size.default,
    variant = baseButtonPropDefs.variant.default,
    color = baseButtonPropDefs.color.default,
    highContrast = baseButtonPropDefs.highContrast.default,
    radius = baseButtonPropDefs.radius.default,
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
        { 'high-contrast': highContrast },
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
BaseButton.displayName = 'BaseButton';

export { BaseButton };
