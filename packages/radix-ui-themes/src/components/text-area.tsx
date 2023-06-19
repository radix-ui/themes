import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, ButtonRadius, Responsive } from '../helpers';

const textAreaSizes = ['1', '2', '3'] as const;
type TextAreaSize = (typeof textAreaSizes)[number];
const defaultTextAreaSize: TextAreaSize = '2';

const textAreaVariants = ['surface', 'surface-mono', 'subtle-mono'] as const;
type TextAreaVariant = (typeof textAreaVariants)[number];
const defaultTextAreaVariant: TextAreaVariant = 'surface';

const defaultTextAreaRadius: ButtonRadius | undefined = undefined;

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
  const {
    className,
    size = defaultTextAreaSize,
    variant = defaultTextAreaVariant,
    radius = defaultTextAreaRadius,
    ...textAreaProps
  } = marginRest;
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

export { textAreaSizes, defaultTextAreaSize, textAreaVariants, defaultTextAreaVariant, TextArea };
export type { TextAreaSize, TextAreaVariant };
