import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import {
  defaultTextAreaSize,
  defaultTextAreaVariant,
  defaultTextAreaColor,
  defaultTextAreaRadius,
} from './text-area.props';

import type { MarginProps, Color, Radius, Responsive } from '../helpers';
import type { TextAreaSize, TextAreaVariant } from './text-area.props';

type TextAreaElement = React.ElementRef<'textarea'>;
interface TextAreaProps
  extends Omit<React.ComponentPropsWithRef<'textarea'>, 'color' | 'size'>,
    MarginProps {
  size?: Responsive<TextAreaSize>;
  variant?: TextAreaVariant;
  color?: Color;
  radius?: Radius;
}
const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultTextAreaSize,
    variant = defaultTextAreaVariant,
    color = defaultTextAreaColor,
    radius = defaultTextAreaRadius,
    ...textAreaProps
  } = marginRest;
  return (
    <textarea
      data-accent-scale={color}
      data-radius={radius}
      {...textAreaProps}
      ref={forwardedRef}
      className={classNames(
        'rui-TextArea',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
TextArea.displayName = 'TextArea';

export { TextArea };
