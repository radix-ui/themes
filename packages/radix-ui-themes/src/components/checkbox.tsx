import * as React from 'react';
import classNames from 'classnames';
import { BaseCheckbox } from './base-checkbox';

type CheckboxElement = React.ElementRef<typeof BaseCheckbox>;
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof BaseCheckbox> {}
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => (
  <BaseCheckbox
    {...props}
    ref={forwardedRef}
    className={classNames('rt-Checkbox', props.className)}
  />
));
Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };
