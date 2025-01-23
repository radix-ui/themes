import * as React from 'react';
import classNames from 'classnames';

import { textAreaPropDefs } from './text-area.props';
import { extractProps } from '../helpers/extract-props';
import { marginPropDefs } from '../props/margin.props';

import type { MarginProps } from '../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props';
import type { GetPropDefTypes } from '../props/prop-def';

type TextAreaElement = React.ElementRef<'textarea'>;
type TextAreaOwnProps = GetPropDefTypes<typeof textAreaPropDefs> & {
  defaultValue?: string;
  value?: string;
};
interface TextAreaProps
  extends ComponentPropsWithout<'textarea', RemovedProps | 'size' | 'value'>,
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
    </div>
  );
});
TextArea.displayName = 'TextArea';

export { TextArea };
export type { TextAreaProps };
