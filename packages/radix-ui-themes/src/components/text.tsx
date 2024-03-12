import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { textPropDefs } from './text.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, NiceIntersection, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type TextElement = React.ElementRef<'span'>;
type TextOwnProps = GetPropDefTypes<typeof textPropDefs>;
type CommonTextProps = NiceIntersection<MarginProps, TextOwnProps>;
type TextAsChildProps = { asChild: true; as?: never } & ComponentPropsWithout<RemovedProps, 'span'>;
type TextSpanProps = { as?: 'span'; asChild?: false } & ComponentPropsWithout<RemovedProps, 'span'>;
type TextDivProps = { as: 'div'; asChild?: false } & ComponentPropsWithout<RemovedProps, 'div'>;
type TextLabelProps = { as: 'label'; asChild?: false } & ComponentPropsWithout<
  RemovedProps,
  'label'
>;
type TextPProps = { as: 'p'; asChild?: false } & ComponentPropsWithout<RemovedProps, 'p'>;
type TextProps = CommonTextProps &
  (TextAsChildProps | TextSpanProps | TextDivProps | TextLabelProps | TextPProps);

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
    <Slot
      data-accent-color={color || undefined}
      {...textProps}
      ref={forwardedRef}
      className={classNames('rt-Text', className)}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});
Text.displayName = 'Text';

export { Text };
export type { TextProps };
