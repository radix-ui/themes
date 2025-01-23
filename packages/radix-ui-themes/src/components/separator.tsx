import * as React from 'react';
import classNames from 'classnames';

import { separatorPropDefs } from './separator.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type SeparatorElement = React.ElementRef<'span'>;
type SeparatorOwnProps = GetPropDefTypes<typeof separatorPropDefs>;
interface SeparatorProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    MarginProps,
    SeparatorOwnProps {}
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
