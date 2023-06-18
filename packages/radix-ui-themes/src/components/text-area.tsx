import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, ButtonRadius, Responsive } from '../helpers';

const textAreaSizes = ['1', '2', '3'] as const;
type TextAreaSize = (typeof textAreaSizes)[number];

const textAreaVariants = ['surface', 'surface-mono', 'subtle-mono'] as const;
type TextAreaVariant = (typeof textAreaVariants)[number];

type TextAreaElement = React.ElementRef<'textarea'>;
interface TextAreaProps
  extends Omit<React.ComponentPropsWithRef<'textarea'>, 'color' | 'size'>,
    MarginProps {
  size?: Responsive<TextAreaSize>;
  variant?: TextAreaVariant;
  radius?: ButtonRadius;
}
const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, size = '2', variant = 'surface', radius, ...textAreaProps } = marginRest;

  return (
    <textarea
      data-button-radius={radius}
      {...textAreaProps}
      ref={forwardedRef}
      className={classNames(
        'rui-TextArea',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMargin(marginProps),
        className
      )}
    />
  );
});
TextArea.displayName = 'TextArea';

export { textAreaSizes, textAreaVariants, TextArea };
export type { TextAreaSize, TextAreaVariant };
