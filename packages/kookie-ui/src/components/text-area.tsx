import * as React from 'react';
import classNames from 'classnames';

import { textAreaPropDefs } from './text-area.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

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
  const { className, color, radius, panelBackground, material, style, ...textAreaProps } =
    extractProps(props, textAreaPropDefs, marginPropDefs);
  const effectiveMaterial = material || panelBackground;

  // Generate unique IDs for accessibility
  const errorId = React.useId();

  // Determine invalid state
  const isInvalid = textAreaProps.error || textAreaProps.isInvalid;

  // Build aria-describedby string
  const describedBy = React.useMemo(() => {
    const parts = [];
    if (textAreaProps.errorMessage) parts.push(errorId);
    if (textAreaProps['aria-describedby']) parts.push(textAreaProps['aria-describedby']);
    return parts.length > 0 ? parts.join(' ') : undefined;
  }, [textAreaProps.errorMessage, textAreaProps['aria-describedby'], errorId]);

  // Build aria attributes
  const ariaProps = React.useMemo(
    () => ({
      'aria-invalid': isInvalid,
      'aria-describedby': describedBy,
      'aria-labelledby': textAreaProps['aria-labelledby'],
    }),
    [isInvalid, describedBy, textAreaProps['aria-labelledby']],
  );

  // Filter out our custom props to avoid DOM warnings
  const {
    error,
    errorMessage,
    isInvalid: _isInvalid,
    required,
    'aria-describedby': _ariaDescribedby,
    'aria-labelledby': _ariaLabelledby,
    ...nativeTextAreaProps
  } = textAreaProps;

  return (
    <div
      data-accent-color={color}
      data-radius={radius}
      data-panel-background={effectiveMaterial}
      data-material={effectiveMaterial}
      className={classNames('rt-TextAreaRoot', className, {
        'rt-error': isInvalid,
      })}
      style={style}
    >
      <textarea
        className="rt-reset rt-TextAreaInput"
        ref={forwardedRef}
        {...nativeTextAreaProps}
        {...ariaProps}
      />
      {textAreaProps.errorMessage && (
        <div id={errorId} className="rt-TextAreaErrorMessage" role="alert" aria-live="polite">
          {textAreaProps.errorMessage}
        </div>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export { TextArea };
export type { TextAreaProps };
