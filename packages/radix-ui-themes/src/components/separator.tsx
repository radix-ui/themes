'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { separatorPropDefs } from './separator.props.js';
import { extractProps, marginPropDefs } from '../helpers/index.js';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers/index.js';

type SeparatorElement = React.ElementRef<typeof SeparatorPrimitive.Root>;
type SeparatorOwnProps = GetPropDefTypes<typeof separatorPropDefs>;
interface SeparatorProps
  extends PropsWithoutRefOrColor<typeof SeparatorPrimitive.Root>,
    MarginProps,
    SeparatorOwnProps {}
const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, forwardedRef) => {
  const { className, color, ...separatorProps } = extractProps(
    props,
    separatorPropDefs,
    marginPropDefs
  );
  return (
    <SeparatorPrimitive.Root
      data-accent-color={color}
      {...separatorProps}
      ref={forwardedRef}
      className={classNames('rt-Separator', className)}
    />
  );
});
Separator.displayName = 'Separator';

export { Separator };
export type { SeparatorProps };
