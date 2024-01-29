import * as React from 'react';
import classNames from 'classnames';

import type { PropsWithoutRefOrColor } from '../helpers';

type EmElement = React.ElementRef<'em'>;
interface EmProps extends PropsWithoutRefOrColor<'em'> {}
const Em = React.forwardRef<EmElement, EmProps>((props, forwardedRef) => (
  <em {...props} ref={forwardedRef} className={classNames('rt-Em', props.className)} />
));
Em.displayName = 'Em';

export { Em };
export type { EmProps };
