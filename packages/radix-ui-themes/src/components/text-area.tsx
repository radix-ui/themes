import * as React from 'react';
import classNames from 'classnames';
import { textAreaPropDefs } from './text-area.props.js';
import { extractProps, marginPropDefs } from '../helpers/index.js';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers/index.js';

type TextAreaElement = React.ElementRef<'textarea'>;
type TextAreaOwnProps = GetPropDefTypes<typeof textAreaPropDefs>;
interface TextAreaProps
  extends Omit<PropsWithoutRefOrColor<'textarea'>, 'size'>,
    MarginProps,
    TextAreaOwnProps {}
const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { className, color, radius, style, ...textAreaProps } = extractProps(
    props,
    textAreaPropDefs,
    marginPropDefs
  );
  return (
    <div
      data-accent-color={color}
      data-radius={radius}
      className={classNames('rt-TextAreaRoot', className)}
      style={style}
    >
      <textarea className="rt-reset rt-TextAreaInput" ref={forwardedRef} {...textAreaProps} />
      <div className="rt-TextAreaChrome" />
    </div>
  );
});
TextArea.displayName = 'TextArea';

export { TextArea };
export type { TextAreaProps };
