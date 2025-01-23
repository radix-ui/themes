import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { extractProps } from '../helpers/extract-props';
import { marginPropDefs } from '../props/margin.props';
import { textPropDefs } from './text.props';

import type { MarginProps } from '../props/margin.props';
import type { GetPropDefTypes } from '../props/prop-def';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props';

type TextElement = React.ElementRef<'span'>;
type TextOwnProps = GetPropDefTypes<typeof textPropDefs>;
interface CommonTextProps extends MarginProps, TextOwnProps {}
type TextSpanProps = { as?: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type TextDivProps = { as: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type TextLabelProps = { as: 'label' } & ComponentPropsWithout<'label', RemovedProps>;
type TextPProps = { as: 'p' } & ComponentPropsWithout<'p', RemovedProps>;
type TextProps = CommonTextProps & (TextSpanProps | TextDivProps | TextLabelProps | TextPProps);

const Text = React.forwardRef<TextElement, TextProps>((props, forwardedRef) => {
  const {
    children,
    className,
    asChild,
    as: Tag = 'span',
    color,
    ...textProps
  } = extractProps(props, textPropDefs, marginPropDefs);
  return (
    <Slot.Root
      data-accent-color={color}
      {...textProps}
      ref={forwardedRef}
      className={classNames('rt-Text', className)}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});
Text.displayName = 'Text';

export { Text };
export type { TextProps };
