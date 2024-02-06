'use client';

import * as React from 'react';
import classNames from 'classnames';
import { separatorPropDefs } from './separator.props.js';
import { extractProps, marginPropDefs } from '../helpers/index.js';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers/index.js';

type SeparatorElement = React.ElementRef<'span'>;
type SeparatorOwnProps = GetPropDefTypes<typeof separatorPropDefs>;
interface SeparatorProps extends PropsWithoutRefOrColor<'span'>, MarginProps, SeparatorOwnProps {}
const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, forwardedRef) => {
  const { className, color, decorative, ...separatorProps } = extractProps(
    props,
    separatorPropDefs,
    marginPropDefs
  );
  return (
    <span
      data-accent-color={color}
      role={decorative ? undefined : 'separator'}
      {...separatorProps}
      ref={forwardedRef}
      className={classNames('rt-Separator', className)}
    />
  );
});
Separator.displayName = 'Separator';

export { Separator };
export type { SeparatorProps };
