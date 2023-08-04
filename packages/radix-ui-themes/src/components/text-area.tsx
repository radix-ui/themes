import * as React from 'react';
import classNames from 'classnames';
import { textAreaPropDefs } from './text-area.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type TextAreaElement = React.ElementRef<'textarea'>;
type TextAreaOwnProps = GetPropDefTypes<typeof textAreaPropDefs>;
interface TextAreaProps
  extends Omit<PropsWithoutRefOrColor<'textarea'>, 'size'>,
    MarginProps,
    TextAreaOwnProps {}
const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = textAreaPropDefs.size.default,
    variant = textAreaPropDefs.variant.default,
    color = textAreaPropDefs.color.default,
    ...textAreaProps
  } = marginRest;
  return (
    <textarea
      data-accent-color={color}
      {...textAreaProps}
      ref={forwardedRef}
      className={classNames(
        'rt-TextArea',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        withMarginProps(marginProps)
      )}
    />
  );
});
TextArea.displayName = 'TextArea';

export { TextArea };
