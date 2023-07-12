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
    radius = textAreaPropDefs.radius.default,
    ...textAreaProps
  } = marginRest;
  return (
    <textarea
      data-accent-scale={color}
      data-radius={radius}
      {...textAreaProps}
      ref={forwardedRef}
      className={classNames(
        'rt-TextArea',
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
